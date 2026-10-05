"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const mockUser = {
  name: "@tokenmingle",
  avatar: null as string | null,
  shareText: "Just joined the @TokenMingle waitlist! The future of token-powered communities is here. Get early access now! tokenmingle.xyz",
};

export default function Home() {
  const [linked, setLinked] = useState(false);
  const encodedText = encodeURIComponent(mockUser.shareText);
  const xIntentUrl = `https://x.com/intent/post?text=${encodedText}`;

  return (
    <div
      className="relative flex min-h-screen w-full flex-col items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url(/hero.png)" }}
    >
      {/* Background Blur Overlay */}
      <div className="absolute inset-0 backdrop-blur-sm bg-black/10" />
      
      <div className="relative z-10 flex flex-col items-center justify-center mb-16 gap-1">
        <div className="relative inline-block drop-shadow-xl hover:drop-shadow-[0_15px_20px_rgba(0,0,0,0.4)] transition-all duration-300">
          <Image
            src="/card.png"
            alt="TokenMingle card"
            width={720}
            height={720}
            className="h-auto w-[90vw] max-w-[720px] object-contain"
            priority
          />
          <div
            className={`absolute transition-all duration-500 ${
              linked ? "opacity-100 scale-100" : "opacity-0 scale-75 pointer-events-none"
            } flex flex-col items-center gap-[10px]`}
            style={{ top: "50%", right: "6.5%", transform: "translate(0%, -60%)" }}
          >
            <div className="w-[110.6px] h-[110.6px] rounded-full bg-black border-[3px] border-white/40 shadow-xl flex items-center justify-center overflow-hidden">
              <svg className="w-[56.9px] h-[56.9px] text-white/60" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
              </svg>
            </div>
            <span className="text-white text-[11.3px] font-semibold tracking-wide drop-shadow-md whitespace-nowrap">
              {mockUser.name}
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
            <Link
              href={xIntentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 rounded-full bg-black/70 backdrop-blur-md px-8 py-4 text-white font-semibold transition-all duration-300 hover:bg-black hover:scale-105 active:scale-95 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.24)] border border-white/20"
            >
              <svg className="w-5 h-5 fill-current transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              Share on X
            </Link>
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
