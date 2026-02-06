import { Star, Quote } from "lucide-react";

function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "CTO at TechFlow",
      company: "TechFlow",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      content: "Since switching to this platform, we've achieved 99.99% uptime and reduced our monitoring costs by 65%. The AI agent resolved a critical database issue at 3 AM before any customers were affected.",
      rating: 5,
      metric: "65% cost savings"
    },
    {
      name: "Michael Rodriguez",
      role: "DevOps Lead at CloudScale",
      company: "CloudScale",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
      content: "The AI-powered auto-resolution is a game changer. Our MTTR dropped from 45 minutes to under 2 minutes. It's like having a senior DevOps engineer on call 24/7, but at a fraction of the cost.",
      rating: 5,
      metric: "2min MTTR"
    },
    {
      name: "Emily Thompson",
      role: "Engineering Manager at FinTech Pro",
      company: "FinTech Pro",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
      content: "Zero downtime is not a dream anymore—it's our reality. The predictive maintenance caught a memory leak before it caused any issues. Best investment we've made for our infrastructure.",
      rating: 5,
      metric: "Zero downtime"
    },
    {
      name: "David Park",
      role: "Founder at StartupX",
      company: "StartupX",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
      content: "As a startup, budget is tight. This platform gave us enterprise-grade monitoring at startup-friendly pricing. We cut our infrastructure costs by 70% while actually improving reliability.",
      rating: 5,
      metric: "70% savings"
    },
    {
      name: "Lisa Wang",
      role: "VP Engineering at DataCore",
      company: "DataCore",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa",
      content: "The AI agent is incredibly smart. It automatically scaled our services during a traffic spike and prevented what would have been hours of downtime. Impressive technology.",
      rating: 5,
      metric: "100% availability"
    },
    {
      name: "James Miller",
      role: "Site Reliability Engineer at GlobalTech",
      company: "GlobalTech",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
      content: "Finally, a monitoring solution that actually fixes problems instead of just alerting us. The ROI was clear within the first month. Highly recommended for any serious engineering team.",
      rating: 5,
      metric: "ROI in 1 month"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
          <Star className="w-4 h-4 fill-current" />
          <span>Trusted by 10,000+ Companies</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Real Results from{" "}
          <span className="bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">
            Real Teams
          </span>
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          See how leading companies achieve zero downtime while cutting costs
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 relative"
          >
            {/* Quote Icon */}
            <div className="absolute top-4 right-4 text-yellow-200">
              <Quote className="w-8 h-8 fill-current" />
            </div>

            {/* Rating */}
            <div className="flex gap-1 mb-4">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 text-yellow-500 fill-current"
                />
              ))}
            </div>

            {/* Content */}
            <p className="text-gray-700 mb-6 text-sm leading-relaxed">
              "{testimonial.content}"
            </p>

            {/* Metric Badge */}
            <div className="inline-block bg-yellow-50 text-yellow-700 px-3 py-1 rounded-full text-xs font-semibold mb-4">
              {testimonial.metric}
            </div>

            {/* Author */}
            <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-12 h-12 rounded-full bg-gray-100"
              />
              <div>
                <div className="font-semibold text-gray-900 text-sm">
                  {testimonial.name}
                </div>
                <div className="text-gray-600 text-xs">
                  {testimonial.role}
                </div>
                <div className="text-gray-500 text-xs">
                  {testimonial.company}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Trust Badges */}
      <div className="mt-16 pt-16 border-t border-gray-200">
        <div className="text-center mb-8">
          <p className="text-sm text-gray-600 font-medium">TRUSTED BY INDUSTRY LEADERS</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center opacity-60">
          <div className="text-2xl font-bold text-gray-400">TechFlow</div>
          <div className="text-2xl font-bold text-gray-400">CloudScale</div>
          <div className="text-2xl font-bold text-gray-400">FinTech Pro</div>
          <div className="text-2xl font-bold text-gray-400">DataCore</div>
        </div>
      </div>
    </div>
  );
}

export default TestimonialsSection;
