interface PricingCardProps {
  title: string;
  price: string;
  period: string;
  features: string[];
  isHighlighted?: boolean;
}

function PricingCard({
  title,
  price,
  period,
  features,
  isHighlighted = false,
}: PricingCardProps) {
  return (
    <div
      className={`bg-dark-900 border rounded-xl p-6 backdrop-blur-sm ${
        isHighlighted ? "border-primary-500" : "border-dark-800"
      }`}
    >
      <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
      <p
        className={`text-3xl font-bold mb-2 ${
          isHighlighted ? "text-primary-400" : "text-dark-300"
        }`}
      >
        {price}
      </p>
      <p className="text-dark-400 mb-6">{period}</p>
      <div className="space-y-2 text-sm text-dark-300">
        {features.map((feature, index) => (
          <p key={index}>{feature}</p>
        ))}
      </div>
    </div>
  );
}

export default PricingCard;
