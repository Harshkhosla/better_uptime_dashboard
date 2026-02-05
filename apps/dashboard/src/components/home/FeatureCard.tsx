import { ArrowRight } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  iconText: string;
}

function FeatureCard({ title, description, icon, iconText }: FeatureCardProps) {
  return (
    <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-8 backdrop-blur-sm group hover:border-yellow-600 transition-all duration-300 hover:shadow-xl hover:shadow-yellow-600/10">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-white">{title}</h3>
        <ArrowRight className="w-6 h-6 text-gray-600 group-hover:text-yellow-500 transition-colors group-hover:translate-x-1 duration-300" />
      </div>
      <p className="text-gray-300 mb-6 leading-relaxed text-base">{description}</p>
      <div className="flex items-center space-x-3 text-sm text-gray-500">
        <div className="text-gray-600">{icon}</div>
        <span>{iconText}</span>
      </div>
    </div>
  );
}

export default FeatureCard;
