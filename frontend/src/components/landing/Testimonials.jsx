import { FaStar } from "react-icons/fa";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Homeowner",
      content:
        "HireHelper made it so easy to find reliable help for my home projects. The helpers are professional and the platform is very user-friendly!",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Task Helper",
      content:
        "As a helper, I love how simple it is to find tasks in my area. The notification system keeps me updated, and everything works smoothly.",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      role: "Business Owner",
      content:
        "We use HireHelper for various business tasks. The quality of helpers is excellent and saves us a lot of time.",
      rating: 5,
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-white via-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            What Our Users Say
          </h2>
          <p className="text-lg text-gray-600">
            Trusted by thousands of happy users
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-10">

          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white/70 backdrop-blur-lg border border-gray-200 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >

              {/* Stars */}
              <div className="flex mb-4 gap-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400" />
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-700 mb-6 leading-relaxed italic">
                “{testimonial.content}”
              </p>

              {/* User */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  {testimonial.name.charAt(0)}
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {testimonial.role}
                  </p>
                </div>
              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}