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
      className={`bg-white border rounded-xl p-6 shadow-sm ${
        isHighlighted ? "border-yellow-500 shadow-yellow-100" : "border-gray-200"
      }`}
    >
      <h3 className="text-2xl font-bold text-gray-900 mb-4">{title}</h3>
      <p
        className={`text-3xl font-bold mb-2 ${
          isHighlighted ? "text-yellow-600" : "text-gray-700"
        }`}
      >
        {price}
      </p>
      <p className="text-gray-600 mb-6">{period}</p>
      <div className="space-y-2 text-sm text-gray-600">
        {features.map((feature, index) => (
          <p key={index}>{feature}</p>
        ))}
      </div>
    </div>
  );
}

export default PricingCard;
