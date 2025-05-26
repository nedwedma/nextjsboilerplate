import { Check, Mail, Database, CreditCard, Lock, Search, Layers, Palette } from "lucide-react";

export default function FeatureSection() {
  const features = [
    {
      title: "Authentication",
      description: "Secure, flexible authentication with multiple providers",
      icon: <Lock className="w-6 h-6 text-blue-600" />,
      details: [
        { name: "Auth.js Integration", description: "Complete authentication solution with session management" },
        { name: "Google OAuth", description: "One-click social login with Google" },
        { name: "Credentials Login", description: "Traditional email/password authentication" },
        { name: "Protected Routes", description: "Easy-to-implement route protection" }
      ]
    },
    {
      title: "Email Service",
      description: "Professional email delivery with templates",
      icon: <Mail className="w-6 h-6 text-blue-600" />,
      details: [
        { name: "Maileroo Integration", description: "Reliable email delivery service" },
        { name: "Transactional Emails", description: "Welcome, password reset, and notification emails" },
        { name: "HTML Templates", description: "Responsive, customizable email templates" },
        { name: "Email Analytics", description: "Track opens, clicks, and delivery status" }
      ]
    },
    {
      title: "Database",
      description: "Powerful database with type-safe ORM",
      icon: <Database className="w-6 h-6 text-blue-600" />,
      details: [
        { name: "PostgreSQL", description: "Robust, scalable relational database" },
        { name: "Prisma ORM", description: "Type-safe database client with migrations" },
        { name: "Data Models", description: "Pre-configured models for users, products, and more" },
        { name: "Query Builder", description: "Efficient, type-safe database queries" }
      ]
    },
    {
      title: "Payments",
      description: "Seamless payment processing and subscriptions",
      icon: <CreditCard className="w-6 h-6 text-blue-600" />,
      details: [
        { name: "Stripe Integration", description: "Secure payment processing" },
        { name: "Subscription Management", description: "Recurring billing and subscription plans" },
        { name: "Webhook Handling", description: "Automated handling of Stripe events" },
        { name: "Payment UI", description: "Ready-to-use checkout components" }
      ]
    },
    {
      title: "UI Components",
      description: "Beautiful, accessible UI components",
      icon: <Palette className="w-6 h-6 text-blue-600" />,
      details: [
        { name: "Radix UI", description: "Unstyled, accessible UI primitives" },
        { name: "Tailwind CSS", description: "Utility-first CSS framework" },
        { name: "Responsive Design", description: "Mobile-first, responsive layouts" },
        { name: "Dark Mode", description: "Built-in dark mode support" }
      ]
    },
    {
      title: "SEO Optimization",
      description: "Built-in SEO tools for better visibility",
      icon: <Search className="w-6 h-6 text-blue-600" />,
      details: [
        { name: "Metadata API", description: "Easy page metadata management" },
        { name: "Open Graph Tags", description: "Social media preview optimization" },
        { name: "Sitemap Generation", description: "Automatic sitemap creation" },
        { name: "Structured Data", description: "Schema markup for rich search results" }
      ]
    }
  ];

  return (
    <div className="bg-[#f8fafc] py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Powerful Features for Modern Web Apps
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our Next.js boilerplate comes packed with everything you need to build production-ready applications without the setup headaches.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {features.map((feature, index) => (
            <div key={index} className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-[#e6f2ff] p-3 rounded-lg">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
              
              <ul className="space-y-3 mt-4">
                {feature.details.map((detail, detailIndex) => (
                  <li key={detailIndex} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium text-gray-800">{detail.name}</span>
                      <p className="text-sm text-gray-600">{detail.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <div className="inline-flex items-center justify-center bg-[#e6f2ff] px-6 py-3 rounded-lg">
            <Layers className="w-5 h-5 text-blue-600 mr-2" />
            <span className="text-gray-800 font-medium">All features work together seamlessly out of the box</span>
          </div>
        </div>
      </div>
    </div>
  );
}
