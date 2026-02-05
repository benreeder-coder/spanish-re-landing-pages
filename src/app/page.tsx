import Link from "next/link";

const variations = [
  {
    id: 1,
    name: "Dark Luxe Editorial",
    description: "Premium magazine aesthetic with asymmetric grids, warm gold accents, and editorial typography.",
    palette: ["#0A0A0A", "#D4AF37", "#F5F5DC", "#E8E8E8"],
    font: "Playfair Display",
  },
  {
    id: 2,
    name: "Bold Brutalist",
    description: "Raw, high-contrast design with thick borders, monospace type, and neon accents.",
    palette: ["#000000", "#FFFFFF", "#39FF14", "#222222"],
    font: "Space Mono",
  },
  {
    id: 3,
    name: "Blueprint Technical",
    description: "Architecture-inspired layout with grid-paper textures, technical typography, and blueprint blue.",
    palette: ["#003366", "#FFFFFF", "#00BFFF", "#F0F4F8"],
    font: "Roboto Mono",
  },
  {
    id: 4,
    name: "Mediterranean Warmth",
    description: "Warm terracotta and olive tones with organic curves, flowing layouts, and Spanish cultural resonance.",
    palette: ["#D4735A", "#6B7F5F", "#F5E6D3", "#1F3A5F"],
    font: "Cormorant Garamond",
  },
  {
    id: 5,
    name: "Glassmorphism Futurist",
    description: "Frosted glass cards on deep teal with warm amber accents, floating elements, and subtle glow effects.",
    palette: ["#0A1F1F", "#0D4D4D", "#1A7A7A", "#D4935C"],
    font: "DM Sans",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white font-inter">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-6 pt-20 pb-16">
        <p className="text-sm tracking-[0.3em] uppercase text-neutral-500 mb-4">
          Design Concepts
        </p>
        <h1 className="text-4xl md:text-6xl font-light tracking-tight mb-6">
          AI Automation for
          <br />
          <span className="text-neutral-400">Spanish Real Estate</span>
        </h1>
        <p className="text-lg text-neutral-400 max-w-2xl leading-relaxed">
          Five distinct landing page concepts for a fully automated, plug-and-play
          AI system built for real estate agencies in Spain. Each design takes a
          completely different creative direction.
        </p>
      </div>

      {/* Variation Grid */}
      <div className="max-w-6xl mx-auto px-6 pb-32">
        <div className="grid gap-6">
          {variations.map((v, i) => (
            <Link
              key={v.id}
              href={`/${v.id}`}
              className="group block"
            >
              <div className="border border-neutral-800 rounded-lg p-8 md:p-10 hover:border-neutral-600 transition-all duration-300 hover:bg-neutral-900/50">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3">
                      <span className="text-sm font-mono text-neutral-600">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h2 className="text-2xl md:text-3xl font-light tracking-tight group-hover:text-white transition-colors">
                        {v.name}
                      </h2>
                    </div>
                    <p className="text-neutral-500 max-w-xl leading-relaxed text-sm md:text-base">
                      {v.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-6">
                    {/* Color swatches */}
                    <div className="flex gap-2">
                      {v.palette.map((color, ci) => (
                        <div
                          key={ci}
                          className="w-8 h-8 rounded-full border border-neutral-700"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>

                    {/* Arrow */}
                    <div className="text-neutral-600 group-hover:text-white group-hover:translate-x-1 transition-all duration-300">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
