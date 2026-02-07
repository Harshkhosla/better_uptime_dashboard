import { useState, useEffect } from "react";
import { 
  AlertCircle, 
  Clock, 
  Brain, 
  CheckCircle, 
  XCircle, 
  ChevronDown,
  ChevronRight,
  Activity,
  AlertTriangle,
  Shield,
  TrendingUp,
  Users,
  Zap,
  RefreshCw
} from "lucide-react";
import axios from "axios";
import { format } from "date-fns";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api/v1";

interface Incident {
  id: string;
  incidentNumber: number;
  startedAt: Date;
  resolvedAt?: Date;
  duration?: number;
  severity: "CRITICAL" | "MAJOR" | "MINOR" | "WARNING";
  status: "ACTIVE" | "RESOLVED" | "MONITORING" | "CLOSED";
  errorType?: string;
  errorMessage?: string;
  affectedRegions: string[];
  analysis?: IncidentAnalysis;
  timeline?: TimelineEvent[];
  website?: {
    id: string;
    url: string;
  };
}

interface IncidentAnalysis {
  id: string;
  rootCause?: string;
  impactSummary?: string;
  affectedUsers?: number;
  recommendations?: string[];
  preventionTips?: string[];
  pattern?: string;
  avgResponseTime?: number;
  confidence?: number;
  analyzedAt: Date;
}

interface TimelineEvent {
  id: string;
  timestamp: Date;
  eventType: string;
  description: string;
  metadata?: any;
}

interface IncidentPanelProps {
  websiteId?: string;
}

export const IncidentPanel: React.FC<IncidentPanelProps> = ({ websiteId }) => {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [loading, setLoading] = useState(true);
  const [expandedIncidents, setExpandedIncidents] = useState<string[]>([]);

  useEffect(() => {
    fetchIncidents();
  }, [websiteId]);

  const fetchIncidents = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const url = websiteId 
        ? `${API_URL}/incidents?websiteId=${websiteId}`
        : `${API_URL}/incidents`;
      
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setIncidents(response.data.incidents || []);
    } catch (error: any) {
      console.error("Failed to fetch incidents:", error);
      // If it's a 404 or no incidents yet, show empty state
      if (error.response?.status === 404 || error.response?.data?.incidents?.length === 0) {
        setIncidents([]);
      } else {
        // Use mock data for demonstration if API is not ready
        setIncidents(getMockIncidents());
      }
    } finally {
      setLoading(false);
    }
  };

  const getMockIncidents = (): Incident[] => {
    return [
      {
        id: "1",
        incidentNumber: 42,
        startedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
        resolvedAt: new Date(Date.now() - 30 * 60 * 1000),
        duration: 90 * 60,
        severity: "CRITICAL",
        status: "RESOLVED",
        errorType: "timeout",
        errorMessage: "Connection timeout after 30s",
        affectedRegions: ["USA", "Europe", "Asia"],
        website: {
          id: "1",
          url: "api.example.com"
        },
        analysis: {
          id: "1",
          rootCause: "Connection timeout indicates server may be overloaded or unresponsive",
          impactSummary: "Website api.example.com experienced complete outage affecting users in 3 regions",
          affectedUsers: 1250,
          recommendations: [
            "Check server CPU and memory usage",
            "Review recent traffic patterns",
            "Verify network connectivity",
            "Check for DDoS attacks"
          ],
          preventionTips: [
            "Implement auto-scaling for traffic spikes",
            "Add rate limiting to prevent overload",
            "Set up monitoring alerts for CPU > 80%"
          ],
          pattern: "sudden",
          avgResponseTime: 30000,
          confidence: 0.85,
          analyzedAt: new Date(Date.now() - 90 * 60 * 1000)
        },
        timeline: [
          {
            id: "1",
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
            eventType: "STARTED",
            description: "Website api.example.com went down",
            metadata: { region: "USA" }
          },
          {
            id: "2",
            timestamp: new Date(Date.now() - 110 * 60 * 1000),
            eventType: "DEGRADED",
            description: "Response times increased to 15s",
            metadata: {}
          },
          {
            id: "3",
            timestamp: new Date(Date.now() - 90 * 60 * 1000),
            eventType: "ANALYSIS_ADDED",
            description: "AI analysis completed",
            metadata: {}
          },
          {
            id: "4",
            timestamp: new Date(Date.now() - 30 * 60 * 1000),
            eventType: "RESOLVED",
            description: "Website is back online",
            metadata: { duration: 5400 }
          }
        ]
      },
      {
        id: "2",
        incidentNumber: 41,
        startedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
        resolvedAt: new Date(Date.now() - 23 * 60 * 60 * 1000),
        duration: 60 * 60,
        severity: "MAJOR",
        status: "RESOLVED",
        errorType: "5xx",
        errorMessage: "500 Internal Server Error",
        affectedRegions: ["Europe"],
        website: {
          id: "1",
          url: "api.example.com"
        },
        analysis: {
          id: "2",
          rootCause: "Database connection pool exhausted due to slow queries",
          impactSummary: "Partial service degradation affecting European users",
          affectedUsers: 450,
          recommendations: [
            "Optimize slow database queries",
            "Increase connection pool size",
            "Implement query caching"
          ],
          preventionTips: [
            "Add database query monitoring",
            "Set up connection pool alerts"
          ],
          pattern: "gradual",
          avgResponseTime: 5000,
          confidence: 0.92,
          analyzedAt: new Date(Date.now() - 23.5 * 60 * 60 * 1000)
        }
      }
    ];
  };

  const toggleIncidentExpansion = (incidentId: string) => {
    setExpandedIncidents(prev => 
      prev.includes(incidentId) 
        ? prev.filter(id => id !== incidentId)
        : [...prev, incidentId]
    );
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "CRITICAL": return "bg-red-100 text-red-800 border-red-200";
      case "MAJOR": return "bg-orange-100 text-orange-800 border-orange-200";
      case "MINOR": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "WARNING": return "bg-blue-100 text-blue-800 border-blue-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "CRITICAL": return <XCircle className="w-5 h-5" />;
      case "MAJOR": return <AlertCircle className="w-5 h-5" />;
      case "MINOR": return <AlertTriangle className="w-5 h-5" />;
      case "WARNING": return <Shield className="w-5 h-5" />;
      default: return <AlertCircle className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE": return "bg-red-500";
      case "RESOLVED": return "bg-green-500";
      case "MONITORING": return "bg-yellow-500";
      case "CLOSED": return "bg-gray-500";
      default: return "bg-gray-500";
    }
  };

  const formatDuration = (seconds?: number) => {
    if (!seconds) return "N/A";
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) return `${hours}h ${minutes}m`;
    if (minutes > 0) return `${minutes}m ${secs}s`;
    return `${secs}s`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="h-full bg-white">
      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Incident History</h2>
          <p className="text-sm text-gray-600">
            AI-powered analysis of all incidents with root cause and recommendations
          </p>
        </div>

        {/* Incidents List */}
        <div className="space-y-4">
          {incidents.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
              <p className="text-gray-600">No incidents recorded</p>
              <p className="text-sm text-gray-500 mt-1">Your service is running smoothly!</p>
            </div>
          ) : (
            incidents.map((incident) => {
              const isExpanded = expandedIncidents.includes(incident.id);
              
              return (
                <div
                  key={incident.id}
                  className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                >
                  {/* Incident Header */}
                  <div
                    className="p-4 cursor-pointer hover:bg-gray-50"
                    onClick={() => toggleIncidentExpansion(incident.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <button className="mt-1">
                          {isExpanded ? (
                            <ChevronDown className="w-5 h-5 text-gray-500" />
                          ) : (
                            <ChevronRight className="w-5 h-5 text-gray-500" />
                          )}
                        </button>
                        
                        <div className={`p-2 rounded-lg ${getSeverityColor(incident.severity)}`}>
                          {getSeverityIcon(incident.severity)}
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center space-x-3">
                            <h3 className="font-semibold text-gray-900">
                              Incident #{incident.incidentNumber}
                            </h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(incident.severity)}`}>
                              {incident.severity}
                            </span>
                            <div className="flex items-center space-x-1">
                              <div className={`w-2 h-2 rounded-full ${getStatusColor(incident.status)}`} />
                              <span className="text-xs text-gray-600">{incident.status}</span>
                            </div>
                          </div>
                          
                          <p className="text-sm text-gray-600 mt-1">
                            {incident.website?.url} • {incident.errorType}
                          </p>
                          
                          <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                            <span className="flex items-center space-x-1">
                              <Clock className="w-3 h-3" />
                              <span>Started: {format(new Date(incident.startedAt), "MMM dd, HH:mm")}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Activity className="w-3 h-3" />
                              <span>Duration: {formatDuration(incident.duration)}</span>
                            </span>
                            {incident.affectedRegions && (
                              <span className="flex items-center space-x-1">
                                <Users className="w-3 h-3" />
                                <span>{incident.affectedRegions.length} regions affected</span>
                              </span>
                            )}
                          </div>

                          {incident.analysis && (
                            <div className="mt-3 space-y-2">
                              {/* Error Details */}
                              {incident.errorMessage && (
                                <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                                  <div className="flex items-start space-x-2">
                                    <XCircle className="w-4 h-4 text-red-600 mt-0.5" />
                                    <div className="flex-1">
                                      <p className="text-sm font-medium text-red-900">Error Detected:</p>
                                      <p className="text-sm text-red-800 mt-1 font-mono">
                                        {incident.errorMessage}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              )}
                              
                              {/* AI Analysis */}
                              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                                <div className="flex items-start space-x-2">
                                  <Brain className="w-4 h-4 text-blue-600 mt-0.5" />
                                  <div className="flex-1">
                                    <p className="text-sm font-medium text-blue-900">AI Diagnosis:</p>
                                    <p className="text-sm text-blue-800 mt-1">
                                      {incident.analysis.rootCause}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              
                              {/* Quick Fix Button */}
                              <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                                <div className="flex items-start space-x-2">
                                  <Zap className="w-4 h-4 text-green-600 mt-0.5" />
                                  <div className="flex-1">
                                    <p className="text-sm font-medium text-green-900">Quick Action:</p>
                                    <p className="text-sm text-green-800 mt-1">
                                      {incident.analysis.recommendations?.[0] || "Check server status"}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Content */}
                  {isExpanded && incident.analysis && (
                    <div className="border-t border-gray-200 p-6 bg-gray-50">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Impact Analysis */}
                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                          <h4 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                            <Zap className="w-5 h-5 text-orange-500" />
                            <span>Impact Analysis</span>
                          </h4>
                          <div className="space-y-2">
                            <p className="text-sm text-gray-700">{incident.analysis.impactSummary}</p>
                            <div className="flex items-center space-x-4 text-sm">
                              <span className="text-gray-600">
                                Affected Users: <strong className="text-gray-900">{incident.analysis.affectedUsers?.toLocaleString()}</strong>
                              </span>
                              <span className="text-gray-600">
                                Pattern: <strong className="text-gray-900">{incident.analysis.pattern}</strong>
                              </span>
                            </div>
                            {incident.analysis.confidence && (
                              <div className="mt-2">
                                <div className="flex items-center justify-between text-xs mb-1">
                                  <span className="text-gray-600">AI Confidence</span>
                                  <span className="font-medium">{Math.round(incident.analysis.confidence * 100)}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div 
                                    className="bg-blue-600 h-2 rounded-full"
                                    style={{ width: `${incident.analysis.confidence * 100}%` }}
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Recommendations */}
                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                          <h4 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                            <TrendingUp className="w-5 h-5 text-green-500" />
                            <span>Recommended Actions</span>
                          </h4>
                          <ul className="space-y-2">
                            {incident.analysis.recommendations?.map((rec, idx) => (
                              <li key={idx} className="flex items-start space-x-2 text-sm">
                                <span className="text-green-500 mt-0.5">•</span>
                                <span className="text-gray-700">{rec}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Prevention Tips */}
                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                          <h4 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                            <Shield className="w-5 h-5 text-purple-500" />
                            <span>Prevention Tips</span>
                          </h4>
                          <ul className="space-y-2">
                            {incident.analysis.preventionTips?.map((tip, idx) => (
                              <li key={idx} className="flex items-start space-x-2 text-sm">
                                <span className="text-purple-500 mt-0.5">•</span>
                                <span className="text-gray-700">{tip}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Timeline */}
                        {incident.timeline && incident.timeline.length > 0 && (
                          <div className="bg-white p-4 rounded-lg border border-gray-200">
                            <h4 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                              <Clock className="w-5 h-5 text-blue-500" />
                              <span>Incident Timeline</span>
                            </h4>
                            <div className="space-y-3">
                              {incident.timeline.map((event, idx) => (
                                <div key={event.id} className="flex items-start space-x-3 text-sm">
                                  <div className="mt-1">
                                    <div className={`w-2 h-2 rounded-full ${
                                      event.eventType === "RESOLVED" ? "bg-green-500" :
                                      event.eventType === "STARTED" ? "bg-red-500" :
                                      "bg-yellow-500"
                                    }`} />
                                  </div>
                                  <div className="flex-1">
                                    <p className="text-gray-700">{event.description}</p>
                                    <p className="text-xs text-gray-500 mt-0.5">
                                      {format(new Date(event.timestamp), "HH:mm:ss")}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};