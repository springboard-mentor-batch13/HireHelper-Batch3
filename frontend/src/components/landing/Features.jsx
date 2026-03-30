import { FaFileAlt, FaBolt, FaBell, FaShieldAlt } from "react-icons/fa";

export default function Features() {
  const features = [
    {
      icon: FaFileAlt,
      title: "Easy Task Posting",
      description: "Create and post tasks in minutes with a simple interface.",
    },
    {
      icon: FaBolt,
      title: "Real-time Requests",
      description: "Get instant requests from helpers near you.",
    },
    {
      icon: FaBell,
      title: "Smart Notifications",
      description: "Stay updated with alerts about your tasks and requests.",
    },
    {
      icon: FaShieldAlt,
      title: "Secure Platform",
      description: "Your data and tasks are safe and protected.",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Powerful Features
          </h2>
          <p className="text-lg text-gray-600">
            Everything you need to manage your tasks easily
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">

          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-lg border border-gray-200 p-6 rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02]"
            >

              {/* Icon */}
              <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-4">
                <feature.icon className="text-blue-600 text-xl" />
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}