import { Prismaclient } from "prisma/client";

// Type definitions (matching Prisma schema enums)
type IncidentSeverity = "CRITICAL" | "MAJOR" | "MINOR" | "WARNING";

interface AnalysisInput {
  url: string;
  errorType?: string;
  errorMessage?: string;
  responseTime?: number;
  affectedRegions: string[];
  recentStatuses: any[];
  historicalIncidents?: any[];
}

export class IncidentAnalysisService {
  /**
   * Analyze an incident using AI (simplified version without OpenAI for now)
   */
  static async analyzeIncident(incidentId: string, input: AnalysisInput): Promise<any> {
    try {
      // For now, use fallback analysis since OpenAI needs to be configured
      return this.getFallbackAnalysis(incidentId, input);
    } catch (error) {
      console.error("Failed to analyze incident:", error);
      return this.getFallbackAnalysis(incidentId, input);
    }
  }

  /**
   * Fallback analysis when AI is unavailable
   */
  private static async getFallbackAnalysis(incidentId: string, input: AnalysisInput) {
    const isTimeout = input.errorType?.includes("timeout");
    const isDNS = input.errorType?.includes("DNS");
    const isSSL = input.errorType?.includes("SSL");
    const is5xx = input.errorType?.includes("5");

    let rootCause = "Unable to determine exact cause";
    let recommendations = ["Check server logs", "Monitor system resources"];

    if (isTimeout) {
      rootCause = "Connection timeout indicates server may be overloaded or unresponsive";
      recommendations = [
        "Check server CPU and memory usage",
        "Review recent traffic patterns",
        "Verify network connectivity",
        "Check for DDoS attacks",
      ];
    } else if (isDNS) {
      rootCause = "DNS resolution failure";
      recommendations = [
        "Check DNS provider status",
        "Verify DNS records",
        "Test with alternative DNS servers",
        "Check domain registration status",
      ];
    } else if (isSSL) {
      rootCause = "SSL/TLS certificate issue";
      recommendations = [
        "Check certificate expiration",
        "Verify certificate chain",
        "Review SSL configuration",
        "Test with SSL checker tools",
      ];
    } else if (is5xx) {
      rootCause = "Server error (5xx response)";
      recommendations = [
        "Check application logs",
        "Review recent deployments",
        "Check database connectivity",
        "Monitor server resources",
      ];
    }

    const analysis = await Prismaclient.incidentAnalysis.create({
      data: {
        incidentId,
        rootCause,
        impactSummary: `Website ${input.url} is experiencing issues affecting users in ${input.affectedRegions.length} regions`,
        affectedUsers: input.affectedRegions.length * 50, // Rough estimate
        recommendations,
        preventionTips: [
          "Implement better monitoring",
          "Set up alerting thresholds",
          "Create runbooks for common issues",
        ],
        pattern: input.responseTime && input.responseTime > 10000 ? "gradual" : "sudden",
        avgResponseTime: input.responseTime ? Math.round(input.responseTime) : null,
        aiModel: "fallback",
        confidence: 0.5,
      },
    });

    // Add timeline event for analysis completion
    await Prismaclient.incidentTimeline.create({
      data: {
        incidentId,
        eventType: "ANALYSIS_ADDED",
        description: "Incident analysis completed",
        metadata: { analysisId: analysis.id },
      },
    });

    return analysis;
  }

  /**
   * Identify patterns in historical incidents
   */
  private static identifyPatterns(incidents: any[]): string {
    if (incidents.length === 0) return "No historical data";

    const recentIncidents = incidents.filter((i: any) => {
      const daysSince = (Date.now() - new Date(i.startedAt).getTime()) / (1000 * 60 * 60 * 24);
      return daysSince <= 30;
    });

    if (recentIncidents.length > 10) {
      return "Frequent incidents detected (>10 in last 30 days)";
    } else if (recentIncidents.length > 5) {
      return "Moderate incident frequency (5-10 in last 30 days)";
    } else {
      return "Low incident frequency (<5 in last 30 days)";
    }
  }

  /**
   * Determine incident severity based on various factors
   */
  static determineSeverity(
    errorType?: string,
    responseTime?: number,
    affectedRegions?: number
  ): IncidentSeverity {
    // Complete outage
    if (errorType === "timeout" && (affectedRegions || 0) > 2) {
      return "CRITICAL";
    }

    // Significant issues
    if (responseTime && responseTime > 10000) {
      return "MAJOR";
    }

    // DNS or SSL issues
    if (errorType?.includes("DNS") || errorType?.includes("SSL")) {
      return "MAJOR";
    }

    // Default to minor
    return "MINOR";
  }
}