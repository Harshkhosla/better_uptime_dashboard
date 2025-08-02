import { ArrowRight } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  iconText: string;
}

function FeatureCard({ title, description, icon, iconText }: FeatureCardProps) {
  return (
    <div className="bg-dark-900 border border-dark-800 rounded-xl p-6 backdrop-blur-sm group hover:border-primary-500 transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        <ArrowRight className="w-5 h-5 text-dark-400 group-hover:text-primary-400 transition-colors" />
      </div>
      <p className="text-dark-300 mb-4">{description}</p>
      <div className="flex items-center space-x-2 text-sm text-dark-400">
        {icon}
        <span>{iconText}</span>
      </div>
    </div>
  );
}

export default FeatureCard;
