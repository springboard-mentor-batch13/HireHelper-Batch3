import { FaClipboardList, FaUsers, FaCheckCircle } from "react-icons/fa";

export default function HowItWorks() {
  const steps = [
    {
      icon: FaClipboardList,
      title: "Post Task",
      description: "Describe your task with details, location, and timeline.",
    },
    {
      icon: FaUsers,
      title: "Receive Requests",
      description: "Get requests from helpers near you.",
    },
    {
      icon: FaCheckCircle,
      title: "Hire & Complete",
      description: "Choose the best helper and get your task done.",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600">
            Get started in just 3 simple steps
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-10">

          {steps.map((step, index) => (
            <div
              key={index}
              className="relative bg-white p-8 rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02]"
            >

              {/* Step Number */}
              <div className="absolute -top-5 -left-5 w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center font-bold shadow-lg">
                {index + 1}
              </div>

              {/* Icon */}
              <div className="mb-6 mt-4">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center">
                  <step.icon className="text-blue-600 text-2xl" />
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {step.title}
              </h3>

              <p className="text-gray-600 leading-relaxed">
                {step.description}
              </p>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}