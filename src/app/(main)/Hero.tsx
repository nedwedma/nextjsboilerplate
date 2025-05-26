import Link from "next/link";

const HeroSection = () => {
  return (
    <div className="bg-[#e6f2ff] pt-24 pb-16 px-4 sm:px-6 md:px-8 lg:px-12">
      <div className="max-w-7xl w-full mx-auto flex flex-col items-center text-center">
        {/* Headline und Subtext */}
        <div className="max-w-3xl my-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 text-gray-800 leading-tight">
            Build faster with<br />
            Next.js Boilerplate
          </h1>

          <p className="text-base text-gray-600 mb-8">
            Authentication, API routes, and modern UI components.<br />
            Everything you need to start shipping immediately.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
            <Link
              href="https://github.com/yourusername/nextjs-boilerplate"
              className="inline-flex items-center justify-center bg-[#e9ff1a] hover:bg-[#d9ef0a] text-black px-6 py-2 rounded-md font-medium text-sm duration-300 transition-colors"
            >
              <span className="mr-2 text-black">→</span>
              Get Started
            </Link>
            
            <Link
              href="/docs"
              className="inline-flex items-center justify-center bg-white hover:bg-gray-100 text-gray-800 border border-gray-300 px-6 py-2 rounded-md font-medium text-sm duration-300 transition-colors"
            >
              <span className="mr-2">📚</span>
              Documentation
            </Link>
          </div>
        </div>

        {/* Code Visualization */}
        <div className="w-full max-w-4xl">
          <div className="bg-[#1e1e1e] rounded-lg shadow-xl p-4 border border-gray-700 text-left">
            <div className="flex items-center justify-between mb-4 border-b border-gray-700 pb-2">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <span className="text-sm font-medium text-gray-300">app/page.tsx</span>
              </div>
            </div>
            
            <div className="font-mono text-sm text-gray-300">
              <pre className="overflow-x-auto">
                <code>
                  <span className="text-blue-400">import</span> <span className="text-yellow-300">&#123; Metadata &#125;</span> <span className="text-blue-400">from</span> <span className="text-green-400">next</span>;{"\n"}
                  <span className="text-blue-400">import</span> <span className="text-white">Header</span> <span className="text-blue-400">from</span> <span className="text-green-400">@/components/navigation/Header</span>;{"\n"}
                  <span className="text-blue-400">import</span> <span className="text-white">Footer</span> <span className="text-blue-400">from</span> <span className="text-green-400">@/components/Footer</span>;{"\n"}
                  {"\n"}
                  <span className="text-green-400">Metadata for SEO</span>{"\n"}
                  <span className="text-blue-400">export const</span> <span className="text-yellow-300">metadata</span>: <span className="text-purple-400">Metadata</span> = &#123;{"\n"}
                  {"  "}<span className="text-white">title</span>: <span className="text-green-400">Next.js Boilerplate</span>,{"\n"}
                  {"  "}<span className="text-white">description</span>: <span className="text-green-400"> A modern Next.js starter template</span>{"\n"}
                  &#125;;{"\n"}
                  {"\n"}
                  <span className="text-blue-400">export default function</span> <span className="text-yellow-300">Home</span>() &#123;{"\n"}
                  {"  "}<span className="text-blue-400">return</span> ({"\n"}
                  {"    "}&lt;<span className="text-yellow-300">div</span> <span className="text-purple-400">className</span>=<span className="text-green-400">min-h-screen flex flex-col</span>&gt;{"\n"}
                  {"      "}&lt;<span className="text-yellow-300">main</span> <span className="text-purple-400">className</span>=<span className="text-green-400">flex-grow</span>&gt;{"\n"}
                  {"        "}<span className="text-gray-400">&#123;/* Your content here */&#125;</span>{"\n"}
                  {"      "}&lt;/<span className="text-yellow-300">main</span>&gt;{"\n"}
                  {"    "}&lt;/<span className="text-yellow-300">div</span>&gt;{"\n"}
                  {"  "});{"\n"}
                  &#125;
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
