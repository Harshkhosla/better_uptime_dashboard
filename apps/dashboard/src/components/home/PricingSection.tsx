import PricingCard from "./PricingCard";

function PricingSection() {
  const pricingData = [
    {
      title: "Datadog",
      price: "approx. $28,000",
      period: "per month",
      features: [
        "1 TB traces per month 30-day retention",
        "1 TB logs per month 30-day retention",
        "150B metrics data points 13-month retention",
      ],
      isHighlighted: false,
    },
    {
      title: "Better Uptime",
      price: "$879",
      period: "per month",
      features: [
        "1 TB traces per month 30-day retention",
        "1 TB logs per month 30-day retention",
        "150B metrics data points 13-month retention",
      ],
      isHighlighted: true,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-6">
          At a fraction of your current costs
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Get an unrivaled price-to-performance ratio. Decrease your budget by
          30x or keep your current budget but actually instrument all of your
          services, without sampling.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {pricingData.map((pricing, index) => (
          <PricingCard
            key={index}
            title={pricing.title}
            price={pricing.price}
            period={pricing.period}
            features={pricing.features}
            isHighlighted={pricing.isHighlighted}
          />
        ))}
      </div>
    </div>
  );
}

export default PricingSection;
