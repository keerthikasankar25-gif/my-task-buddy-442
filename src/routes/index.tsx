import { createFileRoute, Link } from "@tanstack/react-router";
import { Play, Headphones, Volume2, ListMusic, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aurora — Your Music, Reimagined" },
      {
        name: "description",
        content:
          "Aurora is a beautiful web music player with playlist support, autoplay, progress tracking, and volume controls. Listen now.",
      },
      { property: "og:title", content: "Aurora — Your Music, Reimagined" },
      {
        property: "og:description",
        content:
          "Aurora is a beautiful web music player with playlist support, autoplay, progress tracking, and volume controls. Listen now.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white">
      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center px-6 py-24 md:py-36 text-center">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-fuchsia-500 blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-violet-500 blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm backdrop-blur-md">
            <Headphones className="h-4 w-4 text-fuchsia-300" />
            <span>Free web music player</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
            Your Music,
            <br />
            <span className="bg-gradient-to-r from-fuchsia-300 to-violet-300 bg-clip-text text-transparent">
              Reimagined
            </span>
          </h1>

          <p className="text-lg md:text-xl text-white/70 max-w-xl mx-auto">
            Aurora is a minimal, beautiful music player that runs right in your browser.
            Play, pause, seek, and build your playlist — no downloads required.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/player"
              className="inline-flex items-center gap-2 rounded-full bg-white text-[#302b63] px-8 py-3.5 font-semibold shadow-lg hover:scale-105 active:scale-95 transition"
            >
              <Play className="h-5 w-5" fill="currentColor" />
              Launch Player
            </Link>
            <a
              href="#features"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-3.5 font-medium backdrop-blur-sm hover:bg-white/10 transition"
            >
              Explore Features
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="px-6 py-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Everything you need
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm hover:bg-white/10 transition">
              <div className="mb-4 inline-flex items-center justify-center h-12 w-12 rounded-xl bg-fuchsia-500/20 text-fuchsia-300">
                <Play className="h-6 w-6" fill="currentColor" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Full Playback Control</h3>
              <p className="text-white/60 leading-relaxed">
                Play, pause, skip forward or backward, and seek anywhere in the track with a smooth progress bar.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm hover:bg-white/10 transition">
              <div className="mb-4 inline-flex items-center justify-center h-12 w-12 rounded-xl bg-violet-500/20 text-violet-300">
                <Volume2 className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Volume & Mute</h3>
              <p className="text-white/60 leading-relaxed">
                Fine-tune your listening experience with a precise volume slider and one-click mute toggle.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm hover:bg-white/10 transition">
              <div className="mb-4 inline-flex items-center justify-center h-12 w-12 rounded-xl bg-emerald-500/20 text-emerald-300">
                <ListMusic className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Playlist & Autoplay</h3>
              <p className="text-white/60 leading-relaxed">
                Browse your playlist, jump to any track instantly, and enable autoplay for uninterrupted listening.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Preview / CTA */}
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto rounded-3xl border border-white/10 bg-white/5 p-10 md:p-16 text-center backdrop-blur-sm">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to listen?
          </h2>
          <p className="text-white/70 text-lg max-w-xl mx-auto mb-8">
            Jump into the player and start streaming your favorite SoundHelix tracks right now.
          </p>
          <Link
            to="/player"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-fuchsia-500 to-violet-500 text-white px-10 py-4 font-semibold shadow-lg hover:scale-105 active:scale-95 transition"
          >
            <Play className="h-5 w-5" fill="currentColor" />
            Open Music Player
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 px-6 py-10">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/50">
          <p> Aurora Music Player</p>
          <div className="flex items-center gap-6">
            <Link to="/" className="hover:text-white transition">Home</Link>
            <Link to="/player" className="hover:text-white transition">Player</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
