"use client";

import Image from "next/image";
import { useState } from "react";

const mockUser = {
  shareText: "Just joined the @tokenmngle waitlist! The future of token-powered communities is here.",
};

export default function Home() {
  const [username, setUsername] = useState<string>("");
  const [showForm, setShowForm] = useState(false);
  const [inputUsername, setInputUsername] = useState("");

  const displayUsername = (showForm ? inputUsername : username).trim().replace(/^@/, '');

  const handleShare = () => {
    const baseUrl = "https://www.waitlist.tokenmingle.fun";
    // Trick: Point tweet URL to /claim/[username] with timestamp cache buster
    // so Twitterbot always scrapes fresh OG metadata
    const claimUrl = encodeURIComponent(`${baseUrl}/claim/${encodeURIComponent(username)}?t=${Date.now()}`);
    const tweetText = encodeURIComponent(mockUser.shareText);
    window.open(`https://twitter.com/intent/tweet?text=${tweetText}&url=${claimUrl}`, "_blank");
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedUsername = inputUsername.trim().replace(/^@/, '');
    if (formattedUsername.length >= 3 && formattedUsername.length <= 14) {
      setUsername(formattedUsername);
      setShowForm(false);
    }
  };

  return (
    <div
      className="relative flex min-h-screen w-full flex-col items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url(/hero.png)" }}
    >
      <div className="absolute inset-0 bg-black/50"></div>
      
      <div className="relative z-10 flex flex-col items-center justify-center mb-16 gap-1">
        <div className="relative inline-block drop-shadow-xl hover:drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)] hover:-translate-y-2 hover:scale-[1.02] hover:rotate-1 transition-all duration-300 cursor-pointer">
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
              displayUsername ? "opacity-100 scale-100" : "opacity-0 scale-75 pointer-events-none"
            } flex items-center justify-start`}
            style={{ top: "calc(43% + 20px)", left: "calc(11.4% + 1.5px)", transform: "translateY(-50%)" }}
          >
            <span className="text-black font-montserrat font-extrabold whitespace-nowrap tracking-tight" style={{ fontSize: "clamp(16px, 5.5vw, 42px)" }}>
              {displayUsername}
            </span>
          </div>
        </div>

        <div className="flex flex-row items-center justify-center gap-4 h-16 mt-4">
          {!username ? (
            <div className="flex flex-row items-center">
              {/* Button Container */}
              <div className={`transition-all duration-500 ease-out overflow-hidden flex items-center ${showForm ? 'max-w-0 opacity-0 scale-50' : 'max-w-[300px] opacity-100 scale-100'}`}>
                <button
                  onClick={() => setShowForm(true)}
                  className="group flex items-center gap-3 rounded-full bg-black/70 backdrop-blur-md px-8 py-4 text-white font-semibold shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/20 hover:bg-black hover:scale-105 active:scale-95 hover:shadow-[0_8px_30px_rgb(0,0,0,0.24)] whitespace-nowrap"
                >
                  Get Your Card
                </button>
              </div>

              {/* Form Container */}
              <div className={`transition-all duration-500 ease-out overflow-hidden flex items-center ${showForm ? 'max-w-[500px] opacity-100 scale-100' : 'max-w-0 opacity-0 scale-50'}`}>
                <form onSubmit={handleGenerate} className="flex items-center gap-2 pl-2">
                  <input
                    type="text"
                    placeholder="Enter X username"
                    value={inputUsername}
                    onChange={(e) => setInputUsername(e.target.value)}
                    maxLength={15}
                    minLength={3}
                    className="rounded-full bg-black/70 backdrop-blur-md px-6 py-4 text-white font-semibold shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/20 outline-none focus:border-white/50 w-40 sm:w-56 shrink-0"
                  />
                  <div className="flex bg-black/70 backdrop-blur-sm rounded-full overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/20 shrink-0">
                    <button
                      type="submit"
                      disabled={displayUsername.length < 3 || displayUsername.length > 14}
                      className={`px-4 py-4 flex items-center justify-center text-white bg-transparent transition-opacity ${displayUsername.length < 3 || displayUsername.length > 14 ? 'opacity-30 cursor-not-allowed' : 'hover:opacity-80 active:scale-95'}`}
                      title="Generate"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                    </button>
                    <div className="w-[1px] bg-white/20" />
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="px-4 py-4 flex items-center justify-center text-white bg-transparent"
                      title="Cancel"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                  </div>
                </form>
              </div>
            </div>
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

          <a
            href="https://www.tokenmingle.fun"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 rounded-full bg-white/10 backdrop-blur-md px-8 py-4 text-white font-semibold transition-all duration-300 hover:bg-white/20 hover:scale-105 active:scale-95 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.24)] border border-white/20"
          >
            <svg className="w-5 h-5 stroke-current transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" fill="none" strokeWidth="2.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
            Visit
          </a>
        </div>
      </div>
    </div>
  );
}
