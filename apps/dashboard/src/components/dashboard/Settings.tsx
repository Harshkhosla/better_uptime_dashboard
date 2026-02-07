import { useState, useEffect } from "react";
import { User, Bell, Shield, Key, Webhook, CreditCard, Globe, Loader2 } from "lucide-react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3005/api/v1";

export const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    timezone: "Asia/Kolkata",
    notifyEmail: true,
    notifySMS: false,
    notifyPush: true,
    webhookUrl: "",
    apiKey: "btu_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  });

  // Fetch user details on component mount
  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/users/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const user = response.data.user;
      setFormData(prev => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
        webhookUrl: user.webhookUrl || "",
      }));
    } catch (error) {
      console.error("Failed to fetch user details:", error);
    }
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
    { id: "api", label: "API & Webhooks", icon: Key },
    { id: "preferences", label: "Preferences", icon: Globe },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    setMessage({ type: "", text: "" });
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${API_URL}/users/update`,
        {
          name: formData.name,
          email: formData.email,
          webhookUrl: formData.webhookUrl,
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setMessage({ type: "success", text: "Settings saved successfully!" });
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    } catch (error: any) {
      setMessage({ type: "error", text: error.response?.data?.message || "Failed to save settings" });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ type: "error", text: "New passwords do not match" });
      return;
    }
    
    setLoading(true);
    setMessage({ type: "", text: "" });
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${API_URL}/users/change-password`,
        {
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setMessage({ type: "success", text: "Password changed successfully!" });
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
      setShowPasswordModal(false);
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    } catch (error: any) {
      setMessage({ type: "error", text: error.response?.data?.message || "Failed to change password" });
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    setLoading(true);
    setMessage({ type: "", text: "" });
    try {
      await axios.post(`${API_URL}/users/forgot-password`, {
        email: forgotPasswordEmail,
      });
      setMessage({ type: "success", text: "Password reset link sent to your email!" });
      setForgotPasswordEmail("");
      setShowForgotPasswordModal(false);
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    } catch (error: any) {
      setMessage({ type: "error", text: error.response?.data?.message || "Failed to send reset email" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen overflow-y-auto bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-2">Manage your account settings and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
              <nav className="space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium transition-colors ${
                        activeTab === tab.id
                          ? "bg-black text-white"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
              {/* Profile Settings */}
              {activeTab === "profile" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">Profile Settings</h2>
                    <p className="text-sm text-gray-600">Update your personal information</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Change Password
                      </label>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => setShowPasswordModal(true)}
                          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                          Update Password
                        </button>
                        <button 
                          onClick={() => setShowForgotPasswordModal(true)}
                          className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                        >
                          Forgot Password?
                        </button>
                      </div>
                    </div>

                    {message.text && (
                      <div className={`p-3 rounded-lg ${
                        message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {message.text}
                      </div>
                    )}

                    <div className="pt-4 border-t border-gray-200">
                      <button
                        onClick={handleSave}
                        disabled={loading}
                        className="px-6 py-2 bg-black text-white rounded-lg hover:bg-yellow-600 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                      >
                        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Notification Settings */}
              {activeTab === "notifications" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">Notification Settings</h2>
                    <p className="text-sm text-gray-600">Configure how you receive alerts</p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-3 border-b border-gray-200">
                      <div>
                        <h3 className="font-medium text-gray-900">Email Notifications</h3>
                        <p className="text-sm text-gray-600">Receive alerts via email when websites go down</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          name="notifyEmail"
                          checked={formData.notifyEmail}
                          onChange={handleInputChange}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between py-3 border-b border-gray-200">
                      <div>
                        <h3 className="font-medium text-gray-900">SMS Notifications</h3>
                        <p className="text-sm text-gray-600">Get text messages for critical alerts</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          name="notifySMS"
                          checked={formData.notifySMS}
                          onChange={handleInputChange}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between py-3 border-b border-gray-200">
                      <div>
                        <h3 className="font-medium text-gray-900">Push Notifications</h3>
                        <p className="text-sm text-gray-600">Browser push notifications for instant alerts</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          name="notifyPush"
                          checked={formData.notifyPush}
                          onChange={handleInputChange}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                      </label>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
                      <p className="text-sm text-yellow-800">
                        <strong>Note:</strong> Email notifications are rate-limited to one per 5 minutes per website to prevent spam.
                      </p>
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                      <button
                        onClick={handleSave}
                        className="px-6 py-2 bg-black text-white rounded-lg hover:bg-yellow-600 transition-colors font-semibold"
                      >
                        Save Preferences
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Security Settings */}
              {activeTab === "security" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">Security Settings</h2>
                    <p className="text-sm text-gray-600">Manage your account security</p>
                  </div>

                  <div className="space-y-4">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h3 className="font-medium text-gray-900 mb-2">Two-Factor Authentication</h3>
                      <p className="text-sm text-gray-600 mb-3">Add an extra layer of security to your account</p>
                      <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-yellow-600 transition-colors text-sm font-semibold">
                        Enable 2FA
                      </button>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                      <h3 className="font-medium text-gray-900 mb-2">Active Sessions</h3>
                      <p className="text-sm text-gray-600 mb-3">Manage devices where you're currently logged in</p>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded">
                          <div>
                            <p className="text-sm font-medium text-gray-900">MacBook Pro - Chrome</p>
                            <p className="text-xs text-gray-600">Last active: 2 minutes ago</p>
                          </div>
                          <span className="text-xs text-green-600 font-semibold">Current</span>
                        </div>
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                      <h3 className="font-medium text-gray-900 mb-2">Login History</h3>
                      <p className="text-sm text-gray-600 mb-3">Recent login activity on your account</p>
                      <button className="text-sm text-blue-600 hover:underline">
                        View Login History
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* API & Webhooks */}
              {activeTab === "api" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">API & Webhooks</h2>
                    <p className="text-sm text-gray-600">Integrate with external services</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        API Key
                      </label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={formData.apiKey}
                          readOnly
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 font-mono text-sm"
                        />
                        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm">
                          Copy
                        </button>
                        <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-yellow-600 transition-colors text-sm font-semibold">
                          Regenerate
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Keep this secret! Anyone with this key can access your data.</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Webhook URL
                      </label>
                      <input
                        type="url"
                        name="webhookUrl"
                        value={formData.webhookUrl}
                        onChange={handleInputChange}
                        placeholder="https://your-domain.com/webhooks/uptime"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                      />
                      <p className="text-xs text-gray-500 mt-1">We'll send POST requests to this URL when events occur</p>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-medium text-blue-900 mb-2">Webhook Events</h4>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• <code className="bg-blue-100 px-1 rounded">website.down</code> - Website goes offline</li>
                        <li>• <code className="bg-blue-100 px-1 rounded">website.up</code> - Website comes back online</li>
                      </ul>
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                      <button
                        onClick={handleSave}
                        className="px-6 py-2 bg-black text-white rounded-lg hover:bg-yellow-600 transition-colors font-semibold"
                      >
                        Save Settings
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Preferences */}
              {activeTab === "preferences" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">Preferences</h2>
                    <p className="text-sm text-gray-600">Customize your dashboard experience</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Timezone
                      </label>
                      <select
                        name="timezone"
                        value={formData.timezone}
                        onChange={(e) => handleInputChange(e as any)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                      >
                        <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                        <option value="America/New_York">America/New York (EST)</option>
                        <option value="America/Los_Angeles">America/Los Angeles (PST)</option>
                        <option value="Europe/London">Europe/London (GMT)</option>
                        <option value="Australia/Sydney">Australia/Sydney (AEDT)</option>
                      </select>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                      <h3 className="font-medium text-gray-900 mb-2">Default Monitoring Settings</h3>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm text-gray-600 mb-1">Check Frequency</label>
                          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                            <option value="5">Every 5 minutes (Current)</option>
                            <option value="10">Every 10 minutes</option>
                            <option value="30">Every 30 minutes</option>
                            <option value="60">Every hour</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm text-gray-600 mb-1">Default Regions</label>
                          <div className="space-y-2 mt-2">
                            <label className="flex items-center">
                              <input type="checkbox" defaultChecked className="mr-2 rounded" />
                              <span className="text-sm">USA</span>
                            </label>
                            <label className="flex items-center">
                              <input type="checkbox" defaultChecked className="mr-2 rounded" />
                              <span className="text-sm">India</span>
                            </label>
                            <label className="flex items-center">
                              <input type="checkbox" defaultChecked className="mr-2 rounded" />
                              <span className="text-sm">Africa</span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                      <button
                        onClick={handleSave}
                        className="px-6 py-2 bg-black text-white rounded-lg hover:bg-yellow-600 transition-colors font-semibold"
                      >
                        Save Preferences
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Password Change Modal */}
        {showPasswordModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
              <h2 className="text-2xl font-bold mb-4">Change Password</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Password
                  </label>
                  <input
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
                  />
                </div>

                {message.text && (
                  <div className={`p-3 rounded-lg ${
                    message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {message.text}
                  </div>
                )}

                <div className="flex gap-2 justify-end">
                  <button
                    onClick={() => {
                      setShowPasswordModal(false);
                      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
                      setMessage({ type: "", text: "" });
                    }}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handlePasswordChange}
                    disabled={loading}
                    className="px-6 py-2 bg-black text-white rounded-lg hover:bg-yellow-600 transition-colors font-semibold disabled:opacity-50 flex items-center gap-2"
                  >
                    {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                    Change Password
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Forgot Password Modal */}
        {showForgotPasswordModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
              <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
              
              <div className="space-y-4">
                <p className="text-gray-600">Enter your email address and we'll send you a link to reset your password.</p>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={forgotPasswordEmail}
                    onChange={(e) => setForgotPasswordEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
                  />
                </div>

                {message.text && (
                  <div className={`p-3 rounded-lg ${
                    message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {message.text}
                  </div>
                )}

                <div className="flex gap-2 justify-end">
                  <button
                    onClick={() => {
                      setShowForgotPasswordModal(false);
                      setForgotPasswordEmail("");
                      setMessage({ type: "", text: "" });
                    }}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleForgotPassword}
                    disabled={loading || !forgotPasswordEmail}
                    className="px-6 py-2 bg-black text-white rounded-lg hover:bg-yellow-600 transition-colors font-semibold disabled:opacity-50 flex items-center gap-2"
                  >
                    {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                    Send Reset Link
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
