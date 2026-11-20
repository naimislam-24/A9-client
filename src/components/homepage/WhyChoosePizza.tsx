import { Truck, Heart, Headset } from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Get your pizza hot & fresh at your doorstep.",
  },
  {
    icon: Heart,
    title: "Top Quality",
    description: "Premium ingredients, unforgettable taste.",
  },
  {
    icon: Headset,
    title: "24/7 Support",
    description: "We're here to help whenever you need us.",
  },
];

const WhyChoosePizza = () => {
  return (
    <section className="px-4 py-8 sm:px-6 lg:py-10">
      <div className="container mx-auto container overflow-hidden rounded-2xl border border-orange-900/30 bg-gradient-to-br from-[#281713] via-[#1c100e] to-[#120b09] px-4 py-6 shadow-2xl sm:px-8 sm:py-8 lg:px-10">
        {/* Heading */}
        <div className="mb-5 text-center sm:mb-6">
          <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl lg:text-4xl">
            Why Choose <span className="text-red-500">PizzaHub?</span>
          </h2>

          <p className="mx-auto mt-2 max-w-lg text-xs leading-6 text-gray-400 sm:text-sm">
            More than just pizza, we deliver happiness with every slice.
            Experience the difference with PizzaHub.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-0">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className={`group flex flex-col items-center px-3 py-3 text-center transition-all duration-300 hover:-translate-y-1 sm:px-4 md:px-6 ${
                  index !== 2 ? "sm:border-r sm:border-orange-900/40" : ""
                }`}
              >
                {/* Icon */}
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/10 text-red-500 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:border-red-500/50 group-hover:bg-red-500 group-hover:text-white group-hover:shadow-red-500/20 sm:h-12 sm:w-12">
                  <Icon size={24} strokeWidth={2.5} />
                </div>

                {/* Content */}
                <h3 className="mb-1.5 text-base font-bold text-white transition-colors duration-300 group-hover:text-red-400 sm:text-lg">
                  {feature.title}
                </h3>

                <p className="max-w-[220px] text-xs leading-5 text-gray-400 sm:text-sm">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChoosePizza;
