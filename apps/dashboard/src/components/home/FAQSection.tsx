import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

function FAQItem({ question, answer, isOpen, onToggle }: FAQItemProps) {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors"
      >
        <span className="text-left font-semibold text-gray-900">{question}</span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0 ml-4" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0 ml-4" />
        )}
      </button>
      {isOpen && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <p className="text-gray-700 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "How does the AI agent achieve 95% auto-resolution?",
      answer: "Our AI agent uses machine learning trained on millions of incidents to recognize patterns and apply proven fixes automatically. It can restart failed services, clear caches, scale resources, roll back deployments, and execute custom remediation scripts—all without human intervention. For complex issues, it intelligently routes to the right team with full context."
    },
    {
      question: "What makes this platform 70% more cost-effective than alternatives?",
      answer: "Traditional monitoring tools charge per host, per metric, or per user. We use intelligent data sampling and compression, store logs in your own S3 bucket, and our AI optimization reduces alert fatigue by 90%. Plus, auto-resolution means fewer incident response costs and less engineering time spent firefighting."
    },
    {
      question: "How can you guarantee 99.99% uptime?",
      answer: "Our infrastructure runs across multiple cloud regions with automatic failover. We use redundant data centers, CDN distribution, and real-time health checks. If any component fails, traffic is instantly routed to healthy instances. Our AI predictive maintenance also prevents issues before they impact uptime. We back this with an SLA and credits if we don't meet it."
    },
    {
      question: "What happens if the AI makes a wrong decision?",
      answer: "Safety is built into every layer. The AI only applies verified fixes with rollback mechanisms. Each action is logged and can be automatically reverted. You can set approval workflows for critical systems. In 18 months of operation across 10,000+ companies, our AI has maintained 99.7% accuracy with zero data loss incidents."
    },
    {
      question: "How long does it take to set up?",
      answer: "Most teams are fully operational in under 30 minutes. Our one-click integrations work with all major cloud providers (AWS, GCP, Azure), Kubernetes, and popular frameworks. The AI starts learning your patterns immediately and reaches optimal performance within 7 days of monitoring your infrastructure."
    },
    {
      question: "Can I try it before committing?",
      answer: "Absolutely! We offer a 14-day free trial with full access to all features, including AI auto-resolution. No credit card required. You can monitor unlimited services and see the ROI before making any financial commitment. Most teams see measurable improvements within the first week."
    },
    {
      question: "How does pricing work for scaling companies?",
      answer: "We grow with you. Start free for small projects, then pay based on monitored services and incident volume. Unlike competitors who charge per seat or per metric, you only pay for actual usage. Our AI optimization often means your bill stays flat even as you scale, because it reduces redundant monitoring and false alerts."
    },
    {
      question: "What about security and compliance?",
      answer: "We're SOC 2 Type II certified, GDPR compliant, and support HIPAA workloads. Your data is encrypted at rest and in transit. We support SSO, role-based access control, and audit logging. For maximum privacy, logs can be stored in your own S3 bucket—we never see your sensitive data."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
          <span>❓</span>
          <span>Frequently Asked Questions</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Got{" "}
          <span className="bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">
            Questions?
          </span>
        </h2>
        <p className="text-xl text-gray-600">
          Everything you need to know about zero downtime and AI-powered monitoring
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <FAQItem
            key={index}
            question={faq.question}
            answer={faq.answer}
            isOpen={openIndex === index}
            onToggle={() => setOpenIndex(openIndex === index ? null : index)}
          />
        ))}
      </div>

      {/* CTA */}
      <div className="mt-12 text-center bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-2xl p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-3">
          Still have questions?
        </h3>
        <p className="text-gray-700 mb-6">
          Our team is here to help. Book a demo or chat with an engineer.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-black hover:bg-gray-800 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-200">
            Book a Demo
          </button>
          <button className="bg-white hover:bg-gray-50 text-gray-900 font-semibold px-8 py-3 rounded-lg transition-all duration-200 border border-gray-300">
            Chat with Sales
          </button>
        </div>
      </div>
    </div>
  );
}

export default FAQSection;
