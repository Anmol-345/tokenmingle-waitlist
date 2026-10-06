"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const mockUser = {
  name: "@tokenmingle",
  avatar: null as string | null,
  shareText: "Just joined the @TokenMingle waitlist! The future of token-powered communities is here.",
};

export default function Home() {
  const [linked, setLinked] = useState(false);

  const handleShare = () => {
    const baseUrl = "https://tokenmingle-waitlist.vercel.app";
    const username = mockUser.name;
    // Trick: Point tweet URL to /claim/[username] with timestamp cache buster
    // so Twitterbot always scrapes fresh OG metadata
    const claimUrl = encodeURIComponent(`${baseUrl}/claim/${encodeURIComponent(username)}?t=${Date.now()}`);
    const tweetText = encodeURIComponent(mockUser.shareText);
    window.open(`https://twitter.com/intent/tweet?text=${tweetText}&url=${claimUrl}`, "_blank");
  };

  return (
    <div
      className="relative flex min-h-screen w-full flex-col items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url(/hero.png)" }}
    >
      
      <div className="relative z-10 flex flex-col items-center justify-center mb-16 gap-1">
        <div className="relative inline-block drop-shadow-xl hover:drop-shadow-[0_15px_20px_rgba(0,0,0,0.4)] transition-all duration-300">
          <Image
            src="/card.png"
            alt="TokenMingle card"
            width={720}
            height={720}
            className="w-[90vw] max-w-[720px] object-contain"
            style={{ height: "auto" }}
            priority
          />
          <div
            className={`absolute transition-all duration-500 ${
              linked ? "opacity-100 scale-100" : "opacity-0 scale-75 pointer-events-none"
            } flex items-center justify-start`}
            style={{ top: "calc(45% + 5px)", left: "calc(11.2% - 12px)", transform: "translateY(-50%)" }}
          >
            <span className="text-black font-montserrat font-extrabold whitespace-nowrap tracking-tight" style={{ fontSize: "clamp(16px, 5.5vw, 42px)" }}>
              {mockUser.name.replace('@', '')}
            </span>
          </div>
        </div>

        <div className="flex flex-row items-center justify-center gap-4">
          {!linked ? (
            <button
              onClick={() => setLinked(true)}
              className="group flex items-center gap-3 rounded-full bg-black/70 backdrop-blur-md px-8 py-4 text-white font-semibold transition-all duration-300 hover:bg-black hover:scale-105 active:scale-95 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.24)] border border-white/20"
            >
              <svg className="w-5 h-5 fill-current transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              Link X
            </button>
          ) : (
            <button
              onClick={handleShare}
              className="group flex items-center gap-3 rounded-full bg-black/70 backdrop-blur-md px-8 py-4 text-white font-semibold transition-all duration-300 hover:bg-black hover:scale-105 active:scale-95 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.24)] border border-white/20"
            >
              <svg className="w-5 h-5 fill-current transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              Share on X
            </button>
          )}

          <Link
            href="#"
            className="group flex items-center gap-3 rounded-full bg-white/10 backdrop-blur-md px-8 py-4 text-white font-semibold transition-all duration-300 hover:bg-white/20 hover:scale-105 active:scale-95 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.24)] border border-white/20"
          >
            <svg className="w-5 h-5 stroke-current transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" fill="none" strokeWidth="2.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
            Visit
          </Link>
        </div>
      </div>
    </div>
  );
}
