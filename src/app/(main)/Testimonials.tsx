import { Star } from "lucide-react";

interface Testimonial {
  name: string;
  rating?: number;
  text: string;
  role: string;
}

export default function TestimonialsPage() {
  const testimonials: Testimonial[] = [
    {
      name: "Jack F.",
      rating: 5,
      text: "I launched my startup in just a day and made my first $100 online! The setup was effortless, I was up and running faster than I ever imagined.",
      role: "Maker",
    },
    {
      name: "Larry",
      rating: 5,
      text: "No more overthinking or endless configurations. Just clone, tweak, and launch. This boilerplate made everything seamless and stress-free!",
      role: "Founder",
    },
    {
      name: "Gabriel",
      text: "This is hands down the best open-source Next.js boilerplate! It's the ultimate launchpad for startups looking to move fast and break barriers.",
      role: "Developer",
    },
    {
      name: "Yitai Goh",
      rating: 4,
      text: "Without this boilerplate, I'd still be wrestling with Stripe and email configurations! It saved me countless hours and let me scale effortlessly. ⚡️",
      role: "Entrepreneur",
    },
    {
      name: "Matt Merrick",
      text: "I launched with this Next.js boilerplate and have landed 5 new customers in the first month! Couldn't be happier with my choice.",
      role: "Founder",
    },
    {
      name: "Tom Friday",
      rating: 5,
      text: "I used this boilerplate to build my SaaS, and in just two weeks, I had my first MRR. It made everything 10x easier.",
      role: "Maker",
    },
  ];

  // Get initials from name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase();
  };

  // Featured testimonials for the top section
  const featuredTestimonials = testimonials.slice(0, 3);
  // Regular testimonials for the grid
  const regularTestimonials = testimonials.slice(3);

  return (
    <section id="testimonials" className="bg-white py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-blue-600 font-medium mb-4 uppercase tracking-wider">Testimonials</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
            Trusted by developers worldwide
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            See what our users are saying about their experience with our Next.js boilerplate
          </p>
        </div>

        {/* Featured testimonials - larger cards at the top */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {featuredTestimonials.map((testimonial, index) => (
            <div 
              key={`featured-${index}`}
              className="bg-white rounded-xl shadow-md p-8 border border-gray-100 flex flex-col h-full transition-transform duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              {testimonial.rating && (
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-blue-600 text-blue-600"
                    />
                  ))}
                </div>
              )}

              <p className="text-gray-700 mb-6 flex-grow text-lg leading-relaxed">
                &quot;{testimonial.text}&quot;
              </p>

              <div className="flex items-center gap-4 pt-4 border-t border-gray-100 mt-auto">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-50 text-blue-600 font-semibold text-lg">
                  {getInitials(testimonial.name)}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {testimonial.name}
                  </h3>
                  <p className="text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Regular testimonials - smaller cards in a grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {regularTestimonials.map((testimonial, index) => (
            <div 
              key={`regular-${index}`}
              className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 flex flex-col h-full transition-all duration-300 hover:shadow-md hover:-translate-y-1"
            >
              {testimonial.rating && (
                <div className="flex gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-blue-600 text-blue-600"
                    />
                  ))}
                </div>
              )}

              <p className="text-gray-700 mb-4 flex-grow">
                &quot;{testimonial.text}&quot;
              </p>

              <div className="flex items-center gap-3 pt-3 border-t border-gray-100 mt-auto">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-50 text-blue-600 font-medium">
                  {getInitials(testimonial.name)}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">
                    {testimonial.name}
                  </h3>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
