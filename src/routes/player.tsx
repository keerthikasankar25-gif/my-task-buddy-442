import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Music2,
  ListMusic,
} from "lucide-react";

export const Route = createFileRoute("/player")({
  head: () => ({
    meta: [
      { title: "Player — Aurora Music" },
      {
        name: "description",
        content:
          "A minimal, beautiful web music player with playlist, autoplay, progress and volume controls.",
      },
    ],
  }),
  component: Player,
});

type Track = {
  id: string;
  title: string;
  artist: string;
  src: string;
  cover: string;
};

const PLAYLIST: Track[] = [
  {
    id: "1",
    title: "SoundHelix Song 1",
    artist: "T. Schürger",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    cover:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&q=80",
  },
  {
    id: "2",
    title: "SoundHelix Song 2",
    artist: "T. Schürger",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    cover:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&q=80",
  },
  {
    id: "3",
    title: "SoundHelix Song 5",
    artist: "T. Schürger",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    cover:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&q=80",
  },
  {
    id: "4",
    title: "SoundHelix Song 8",
    artist: "T. Schürger",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
    cover:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=80",
  },
];

const fmt = (s: number) => {
  if (!isFinite(s) || s < 0) return "0:00";
  const m = Math.floor(s / 60);
  const r = Math.floor(s % 60);
  return `${m}:${r.toString().padStart(2, "0")}`;
};

function Player() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const [autoplay, setAutoplay] = useState(true);
  const [showList, setShowList] = useState(true);

  const track = PLAYLIST[index];

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.volume = muted ? 0 : volume;
  }, [volume, muted]);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) a.play().catch(() => setPlaying(false));
    else a.pause();
  }, [playing, index]);

  const next = () => setIndex((i) => (i + 1) % PLAYLIST.length);
  const prev = () => setIndex((i) => (i - 1 + PLAYLIST.length) % PLAYLIST.length);

  const select = (i: number) => {
    setIndex(i);
    setPlaying(true);
  };

  const onTime = () => {
    const a = audioRef.current;
    if (a) setProgress(a.currentTime);
  };
  const onLoaded = () => {
    const a = audioRef.current;
    if (a) setDuration(a.duration);
  };
  const onEnded = () => {
    if (autoplay) {
      next();
      setPlaying(true);
    } else {
      setPlaying(false);
    }
  };

  const seek = (v: number) => {
    const a = audioRef.current;
    if (!a) return;
    a.currentTime = v;
    setProgress(v);
  };

  const pct = duration ? (progress / duration) * 100 : 0;

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] flex items-center justify-center p-4">
      <audio
        ref={audioRef}
        src={track.src}
        onTimeUpdate={onTime}
        onLoadedMetadata={onLoaded}
        onEnded={onEnded}
        preload="metadata"
      />

      <div className="w-full max-w-md">
        <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden">
          {/* Cover */}
          <div className="relative aspect-square overflow-hidden">
            <img
              src={track.cover}
              alt={track.title}
              className={`h-full w-full object-cover transition-transform duration-[8000ms] ${playing ? "scale-110" : "scale-100"}`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute top-4 left-4 flex items-center gap-2 text-white/80 text-xs uppercase tracking-[0.2em]">
              <Music2 className="h-3.5 w-3.5" />
              Now Playing
            </div>
            <div className="absolute bottom-5 left-5 right-5">
              <h1 className="text-2xl font-bold text-white truncate">{track.title}</h1>
              <p className="text-sm text-white/70">{track.artist}</p>
            </div>
          </div>

          {/* Controls */}
          <div className="p-6 space-y-5">
            {/* Progress */}
            <div>
              <div className="relative h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-fuchsia-400 to-violet-400 rounded-full"
                  style={{ width: `${pct}%` }}
                />
                <input
                  type="range"
                  min={0}
                  max={duration || 0}
                  step={0.01}
                  value={progress}
                  onChange={(e) => seek(parseFloat(e.target.value))}
                  className="absolute inset-0 w-full opacity-0 cursor-pointer"
                />
              </div>
              <div className="mt-2 flex justify-between text-xs text-white/60 tabular-nums">
                <span>{fmt(progress)}</span>
                <span>{fmt(duration)}</span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-center gap-6">
              <button
                onClick={prev}
                className="text-white/80 hover:text-white transition"
                aria-label="Previous"
              >
                <SkipBack className="h-6 w-6" fill="currentColor" />
              </button>
              <button
                onClick={() => setPlaying((p) => !p)}
                className="h-14 w-14 rounded-full bg-white text-[#302b63] flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition"
                aria-label={playing ? "Pause" : "Play"}
              >
                {playing ? (
                  <Pause className="h-6 w-6" fill="currentColor" />
                ) : (
                  <Play className="h-6 w-6 ml-0.5" fill="currentColor" />
                )}
              </button>
              <button
                onClick={next}
                className="text-white/80 hover:text-white transition"
                aria-label="Next"
              >
                <SkipForward className="h-6 w-6" fill="currentColor" />
              </button>
            </div>

            {/* Volume + options */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMuted((m) => !m)}
                className="text-white/70 hover:text-white"
                aria-label="Mute"
              >
                {muted || volume === 0 ? (
                  <VolumeX className="h-4 w-4" />
                ) : (
                  <Volume2 className="h-4 w-4" />
                )}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={muted ? 0 : volume}
                onChange={(e) => {
                  setVolume(parseFloat(e.target.value));
                  setMuted(false);
                }}
                className="flex-1 accent-fuchsia-400"
              />
              <label className="flex items-center gap-1.5 text-xs text-white/70 select-none cursor-pointer">
                <input
                  type="checkbox"
                  checked={autoplay}
                  onChange={(e) => setAutoplay(e.target.checked)}
                  className="accent-fuchsia-400"
                />
                Autoplay
              </label>
            </div>
          </div>

          {/* Playlist */}
          <div className="border-t border-white/10">
            <button
              onClick={() => setShowList((s) => !s)}
              className="w-full px-6 py-3 flex items-center justify-between text-white/80 hover:text-white text-sm"
            >
              <span className="flex items-center gap-2">
                <ListMusic className="h-4 w-4" /> Playlist ({PLAYLIST.length})
              </span>
              <span className="text-xs text-white/50">{showList ? "Hide" : "Show"}</span>
            </button>
            {showList && (
              <ul className="max-h-64 overflow-y-auto pb-2">
                {PLAYLIST.map((t, i) => {
                  const active = i === index;
                  return (
                    <li key={t.id}>
                      <button
                        onClick={() => select(i)}
                        className={`w-full flex items-center gap-3 px-6 py-2.5 text-left transition ${
                          active ? "bg-white/10" : "hover:bg-white/5"
                        }`}
                      >
                        <div className="h-9 w-9 rounded overflow-hidden shrink-0">
                          <img src={t.cover} alt="" className="h-full w-full object-cover" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p
                            className={`text-sm truncate ${active ? "text-fuchsia-300" : "text-white"}`}
                          >
                            {t.title}
                          </p>
                          <p className="text-xs text-white/50 truncate">{t.artist}</p>
                        </div>
                        {active && playing && (
                          <div className="flex gap-0.5 items-end h-4">
                            <span className="w-0.5 bg-fuchsia-400 animate-pulse h-2" />
                            <span className="w-0.5 bg-fuchsia-400 animate-pulse h-4" />
                            <span className="w-0.5 bg-fuchsia-400 animate-pulse h-3" />
                          </div>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
