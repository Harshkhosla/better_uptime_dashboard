import { useState } from "react";
import { Code, BookOpen, Webhook, FileCode, HelpCircle, Zap } from "lucide-react";

export const Documents = () => {
  const [activeTab, setActiveTab] = useState("api");

  const tabs = [
    { id: "api", label: "API Documentation", icon: Code },
    { id: "integration", label: "Integration Guide", icon: Zap },
    { id: "webhooks", label: "Webhooks", icon: Webhook },
    { id: "embed", label: "Status Page Embed", icon: FileCode },
    { id: "faq", label: "FAQs", icon: HelpCircle },
  ];

  return (
    <div className="h-screen overflow-y-auto bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Documentation</h1>
          <p className="text-gray-600 mt-2">API references, guides, and integration documentation</p>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <div className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 pb-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? "border-black text-black"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
          {activeTab === "api" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">API Documentation</h2>
                <p className="text-gray-600 mb-6">Access your monitoring data programmatically with our RESTful API.</p>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Base URL</h3>
                  <code className="block bg-gray-100 p-4 rounded-lg text-sm">
                    https://api.betteruptime.com/v1
                  </code>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Authentication</h3>
                  <p className="text-gray-600 mb-2">Include your API token in the Authorization header:</p>
                  <code className="block bg-gray-100 p-4 rounded-lg text-sm">
                    Authorization: Bearer YOUR_API_TOKEN
                  </code>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Endpoints</h3>
                  
                  <div className="space-y-4">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded">GET</span>
                        <code className="text-sm">/website/all</code>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">Get all websites for authenticated user</p>
                      <div className="bg-gray-50 p-3 rounded text-xs">
                        <pre>{`// Response
{
  "websites": [
    {
      "id": "uuid",
      "url": "https://example.com",
      "uptime": "2026-02-05T10:00:00Z",
      "incident": 0,
      "websiteStatus": [...]
    }
  ]
}`}</pre>
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded">POST</span>
                        <code className="text-sm">/website</code>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">Create a new website monitor</p>
                      <div className="bg-gray-50 p-3 rounded text-xs">
                        <pre>{`// Request Body
{
  "url": "https://example.com",
  "escalationPolicy": "Level 1"
}

// Response
{
  "id": "uuid"
}`}</pre>
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded">DELETE</span>
                        <code className="text-sm">/website/:id</code>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">Delete a website monitor</p>
                      <div className="bg-gray-50 p-3 rounded text-xs">
                        <pre>{`// Response
{
  "message": "Website deleted successfully"
}`}</pre>
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded">GET</span>
                        <code className="text-sm">/website/status?websiteId=uuid</code>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">Get detailed status for a specific website</p>
                      <div className="bg-gray-50 p-3 rounded text-xs">
                        <pre>{`// Response
{
  "id": "uuid",
  "url": "https://example.com",
  "uptime": "2026-02-05T10:00:00Z",
  "incident": 0,
  "websiteStatus": [...],
  "notificationPref": {...}
}`}</pre>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "integration" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Integration Guide</h2>
                <p className="text-gray-600 mb-6">Get started with Better Uptime Dashboard in minutes.</p>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">1. Create an Account</h3>
                  <p className="text-gray-600">Sign up at <a href="/signup" className="text-blue-600 hover:underline">betteruptime.com/signup</a> to get started.</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">2. Add Your First Monitor</h3>
                  <p className="text-gray-600 mb-3">Navigate to the Monitors section and click "Add New Monitor".</p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <code className="text-sm">Dashboard → Monitors → Add New Monitor</code>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">3. Configure Notifications</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li>Enable email notifications</li>
                    <li>Set up SMS alerts (optional)</li>
                    <li>Configure push notifications (optional)</li>
                    <li>Set escalation policies</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">4. Monitor Your Sites</h3>
                  <p className="text-gray-600">We'll check your websites every 5 minutes from multiple regions worldwide.</p>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-sm text-yellow-800">
                    <strong>Pro Tip:</strong> Use our API to programmatically add monitors from your CI/CD pipeline!
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "webhooks" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Webhooks</h2>
                <p className="text-gray-600 mb-6">Receive real-time notifications when your website status changes.</p>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Webhook URL</h3>
                  <p className="text-gray-600 mb-2">Configure your webhook endpoint in Settings:</p>
                  <code className="block bg-gray-100 p-4 rounded-lg text-sm">
                    POST https://your-domain.com/webhooks/uptime
                  </code>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Payload Structure</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <pre className="text-xs overflow-x-auto">{`{
  "event": "website.down",
  "timestamp": "2026-02-05T10:30:00Z",
  "website": {
    "id": "uuid",
    "url": "https://example.com",
    "status": "DOWN",
    "incident": 1,
    "responseTime": 0
  },
  "region": "usa"
}`}</pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Event Types</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center space-x-2">
                      <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded">website.down</span>
                      <span className="text-sm text-gray-600">Triggered when a website goes down</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded">website.up</span>
                      <span className="text-sm text-gray-600">Triggered when a website recovers</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === "embed" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Status Page Embed</h2>
                <p className="text-gray-600 mb-6">Embed a public status page on your website.</p>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">JavaScript Embed</h3>
                  <p className="text-gray-600 mb-3">Add this script to your website:</p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <pre className="text-xs overflow-x-auto">{`<div id="betteruptime-status"></div>
<script>
  (function() {
    var script = document.createElement('script');
    script.src = 'https://betteruptime.com/embed.js';
    script.async = true;
    script.onload = function() {
      BetterUptime.init({
        container: '#betteruptime-status',
        apiKey: 'YOUR_PUBLIC_API_KEY'
      });
    };
    document.body.appendChild(script);
  })();
</script>`}</pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">iframe Embed</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <pre className="text-xs overflow-x-auto">{`<iframe 
  src="https://status.betteruptime.com/YOUR_ID" 
  width="100%" 
  height="400" 
  frameborder="0">
</iframe>`}</pre>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "faq" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
              </div>

              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">How often are websites checked?</h3>
                  <p className="text-gray-600 text-sm">Websites are checked every 5 minutes from multiple geographic regions (USA, India, Africa).</p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">How do email notifications work?</h3>
                  <p className="text-gray-600 text-sm">You'll receive an email when a website goes down and another when it recovers. Emails are rate-limited to one every 5 minutes per website to avoid spam.</p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">What does "incident" mean?</h3>
                  <p className="text-gray-600 text-sm">An incident is recorded each time your website goes down. The counter increments with each downtime event.</p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">How is uptime calculated?</h3>
                  <p className="text-gray-600 text-sm">Uptime shows how long your website has been continuously UP since the last downtime. It resets to zero when the site goes down and starts counting again when it recovers.</p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Can I monitor websites behind a firewall?</h3>
                  <p className="text-gray-600 text-sm">Currently, we only support publicly accessible websites. For internal monitoring, consider using our API to push status updates from your infrastructure.</p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">What regions do you monitor from?</h3>
                  <p className="text-gray-600 text-sm">We currently monitor from three regions: USA, India, and Africa. This helps detect regional outages and provides a global perspective on your website's availability.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
