import { Prismaclient } from "prisma/client";
import OpenAI from "openai";

// Type definitions (matching Prisma schema enums)
type IncidentSeverity = "CRITICAL" | "MAJOR" | "MINOR" | "WARNING";
type TimelineEventType = "STARTED" | "DEGRADED" | "DOWN" | "RECOVERING" | "RESOLVED" | "ANALYSIS_ADDED" | "USER_NOTE" | "NOTIFICATION_SENT";

// Initialize OpenAI (you can also use Anthropic Claude if preferred)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "your-api-key-here",
});

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
   * Analyze an incident using AI
   */
  static async analyzeIncident(incidentId: string, input: AnalysisInput): Promise<any> {
    try {
      // Prepare context for AI
      const context = this.prepareContext(input);
      
      // Get AI analysis
      const analysis = await this.getAIAnalysis(context);
      
      // Store analysis in database
      const savedAnalysis = await Prismaclient.incidentAnalysis.create({
        data: {
          incidentId,
          rootCause: analysis.rootCause,
          impactSummary: analysis.impactSummary,
          affectedUsers: analysis.affectedUsers,
          recommendations: analysis.recommendations,
          preventionTips: analysis.preventionTips,
          similarIncidents: analysis.similarIncidents,
          pattern: analysis.pattern,
          avgResponseTime: input.responseTime,
          aiModel: "gpt-4",
          confidence: analysis.confidence,
        },
      });

      // Add timeline event for analysis completion
      await Prismaclient.incidentTimeline.create({
        data: {
          incidentId,
          eventType: "ANALYSIS_ADDED",
          description: "AI analysis completed",
          metadata: { analysisId: savedAnalysis.id },
        },
      });

      return savedAnalysis;
    } catch (error) {
      console.error("Failed to analyze incident:", error);
      // Return a fallback analysis if AI fails
      return this.getFallbackAnalysis(incidentId, input);
    }
  }

  /**
   * Prepare context for AI analysis
   */
  private static prepareContext(input: AnalysisInput) {
    const recentErrors = input.recentStatuses
      .filter((s: any) => s.statusCheck === "DOWN")
      .slice(0, 10);

    return `
      Website: ${input.url}
      Error Type: ${input.errorType || "Unknown"}
      Error Message: ${input.errorMessage || "No error message"}
      Response Time: ${input.responseTime}ms
      Affected Regions: ${input.affectedRegions.join(", ")}
      
      Recent Error Pattern (last 10 errors):
      ${recentErrors.map((e: any) => `- ${new Date(e.timestamp).toISOString()}: ${e.responseTime}ms`).join("\n")}
      
      Historical Context:
      - Total past incidents: ${input.historicalIncidents?.length || 0}
      - Recent incident patterns: ${this.identifyPatterns(input.historicalIncidents || [])}
    `;
  }

  /**
   * Get AI analysis from OpenAI
   */
  private static async getAIAnalysis(context: string) {
    const prompt = `
      You are an expert site reliability engineer. Analyze this website incident and provide a detailed analysis.
      
      ${context}
      
      Provide your analysis in JSON format with these fields:
      {
        "rootCause": "Brief explanation of the most likely root cause",
        "impactSummary": "Summary of the impact on users and services",
        "affectedUsers": estimated number of affected users (integer),
        "recommendations": ["action 1", "action 2", "action 3"],
        "preventionTips": ["tip 1", "tip 2"],
        "similarIncidents": ["reference to any patterns you notice"],
        "pattern": "Type of failure pattern (sudden, gradual, intermittent, cascading)",
        "confidence": confidence score between 0-1
      }
    `;

    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are an expert SRE who analyzes website incidents and provides actionable insights.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.3,
        response_format: { type: "json_object" },
      });

      const result = completion.choices[0].message.content;
      return JSON.parse(result || "{}");
    } catch (error) {
      console.error("OpenAI API error:", error);
      throw error;
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

    return await Prismaclient.incidentAnalysis.create({
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
        avgResponseTime: input.responseTime,
        aiModel: "fallback",
        confidence: 0.5,
      },
    });
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
      return "CRITICAL" as IncidentSeverity;
    }

    // Significant issues
    if (responseTime && responseTime > 10000) {
      return "MAJOR" as IncidentSeverity;
    }

    // DNS or SSL issues
    if (errorType?.includes("DNS") || errorType?.includes("SSL")) {
      return "MAJOR" as IncidentSeverity;
    }

    // Default to minor
    return "MINOR" as IncidentSeverity;
  }
}