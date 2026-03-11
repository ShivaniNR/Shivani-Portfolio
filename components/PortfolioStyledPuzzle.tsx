"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface PieceData {
  id: string;
  finalX: number;
  finalY: number;
  textId: string;
}

export default function PortfolioStyledPuzzle() {
  const [isScattered, setIsScattered] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [buttonText, setButtonText] = useState("Make It Make Sense");
  const piecesRef = useRef<PieceData[]>([
    { id: "piece1", finalX: 0, finalY: 0, textId: "text1" },
    { id: "piece2", finalX: 0, finalY: 0, textId: "text2" },
    { id: "piece3", finalX: 0, finalY: 0, textId: "text3" },
    { id: "piece4", finalX: 0, finalY: 0, textId: "text4" },
  ]);

  const scatterPieces = () => {
    piecesRef.current.forEach((piece, index) => {
      const element = document.getElementById(piece.id);
      if (!element) return;

      const angle = Math.random() * 360;
      const distance = 150 + Math.random() * 100;
      const x = Math.cos((angle * Math.PI) / 180) * distance;
      const y = Math.sin((angle * Math.PI) / 180) * distance;
      const rotation = -30 + Math.random() * 60;

      gsap.to(element, {
        x: x,
        y: y,
        rotation: rotation,
        duration: 0.8,
        ease: "back.out(1.7)",
        delay: index * 0.1,
      });
    });
    setIsScattered(true);
  };

  const organizePieces = () => {
    piecesRef.current.forEach((piece, index) => {
      const element = document.getElementById(piece.id);
      if (!element) return;

      gsap.to(element, {
        x: 0,
        y: 0,
        rotation: 0,
        duration: 1,
        ease: "elastic.out(1, 0.5)",
        delay: index * 0.15,
        onComplete: () => {
          gsap.to(element, {
            scale: 1.05,
            duration: 0.2,
            yoyo: true,
            repeat: 1,
            ease: "power2.inOut",
          });
        },
      });
    });

    setTimeout(() => {
      setButtonText("Scatter Again");
      setIsScattered(false);
    }, 1500);
  };

  const handleButtonClick = () => {
    if (isScattered) {
      organizePieces();
      setButtonText("Organizing...");
      setButtonDisabled(true);
      setTimeout(() => {
        setButtonDisabled(false);
      }, 2000);
    } else {
      scatterPieces();
      setButtonText("Make It Make Sense");
    }
  };

  const handlePieceClick = (e: React.MouseEvent, pieceId: string) => {
    e.stopPropagation();
    const element = document.getElementById(pieceId);
    if (!element) return;

    gsap.to(element, {
      rotation: "+=15",
      duration: 0.1,
      yoyo: true,
      repeat: 3,
      ease: "power2.inOut",
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      scatterPieces();
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-slate-800 dark:to-cyan-900/20 p-6 md:p-8 rounded-2xl border border-cyan-200 dark:border-cyan-800/30 overflow-hidden">
      {/* Header - Matches portfolio style */}
      <div className="text-center mb-6">
        <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-2">
          {isScattered ? "The Raw Ingredients" : "My Soft Skills"}
        </h3>
        <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400">
          {isScattered
            ? "...of a great teammate 🧩"
            : "Pieces assembled and ready to collaborate ✨"}
        </p>
      </div>

      {/* Puzzle Area */}
      <div
        className="relative mx-auto mb-6"
        style={{ maxWidth: "400px", aspectRatio: "1/1" }}
      >
        <svg
          viewBox="0 0 500 500"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <defs>
            {/* Updated gradients to match portfolio cyan/blue theme */}
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop
                offset="0%"
                style={{ stopColor: "#06b6d4", stopOpacity: 1 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "#0891b2", stopOpacity: 1 }}
              />
            </linearGradient>

            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop
                offset="0%"
                style={{ stopColor: "#0ea5e9", stopOpacity: 1 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "#0284c7", stopOpacity: 1 }}
              />
            </linearGradient>

            <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop
                offset="0%"
                style={{ stopColor: "#22d3ee", stopOpacity: 1 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "#06b6d4", stopOpacity: 1 }}
              />
            </linearGradient>

            <linearGradient id="gradient4" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop
                offset="0%"
                style={{ stopColor: "#2563eb", stopOpacity: 1 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "#1d4ed8", stopOpacity: 1 }}
              />
            </linearGradient>

            {/* Shadow filter */}
            <filter id="shadow">
              <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
              <feOffset dx="2" dy="2" result="offsetblur" />
              <feComponentTransfer>
                <feFuncA type="linear" slope="0.5" />
              </feComponentTransfer>
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Puzzle pieces with updated colors */}
          <g
            id="piece1"
            className="cursor-pointer hover:brightness-110 transition-all"
            filter="url(#shadow)"
            onClick={(e) => handlePieceClick(e, "piece1")}
          >
            <path
              d="M 50 50 L 250 50 L 250 230 Q 250 235 245 237 Q 235 240 235 250 Q 235 260 245 263 Q 250 265 250 270 L 250 250 L 50 250 L 50 50 Z"
              fill="url(#gradient1)"
              stroke="rgba(0,0,0,0.2)"
              strokeWidth="2"
            />
            <path
              d="M 50 50 L 250 50 L 250 230 Q 250 235 245 237 Q 235 240 235 250 Q 235 260 245 263 Q 250 265 250 270 L 250 250 L 50 250 L 50 50 Z"
              fill="none"
              stroke="white"
              strokeWidth="1"
              opacity="0.3"
            />
            <text
              x="150"
              y="140"
              textAnchor="middle"
              fill="white"
              fontSize="20"
              fontWeight="700"
              fontFamily="system-ui, -apple-system, sans-serif"
              style={{ pointerEvents: "none" }}
            >
              Problem
            </text>
            <text
              x="150"
              y="165"
              textAnchor="middle"
              fill="white"
              fontSize="20"
              fontWeight="700"
              fontFamily="system-ui, -apple-system, sans-serif"
              style={{ pointerEvents: "none" }}
            >
              Solver
            </text>
          </g>

          <g
            id="piece2"
            className="cursor-pointer hover:brightness-110 transition-all"
            filter="url(#shadow)"
            onClick={(e) => handlePieceClick(e, "piece2")}
          >
            <path
              d="M 250 50 L 450 50 L 450 250 L 270 250 Q 265 250 263 245 Q 260 235 250 235 Q 240 235 237 245 Q 235 250 230 250 L 250 250 L 250 50 Z"
              fill="url(#gradient2)"
              stroke="rgba(0,0,0,0.2)"
              strokeWidth="2"
            />
            <path
              d="M 250 50 L 450 50 L 450 250 L 270 250 Q 265 250 263 245 Q 260 235 250 235 Q 240 235 237 245 Q 235 250 230 250 L 250 250 L 250 50 Z"
              fill="none"
              stroke="white"
              strokeWidth="1"
              opacity="0.3"
            />
            <text
              x="350"
              y="140"
              textAnchor="middle"
              fill="white"
              fontSize="20"
              fontWeight="700"
              fontFamily="system-ui, -apple-system, sans-serif"
              style={{ pointerEvents: "none" }}
            >
              Team
            </text>
            <text
              x="350"
              y="165"
              textAnchor="middle"
              fill="white"
              fontSize="20"
              fontWeight="700"
              fontFamily="system-ui, -apple-system, sans-serif"
              style={{ pointerEvents: "none" }}
            >
              Player
            </text>
          </g>

          <g
            id="piece3"
            className="cursor-pointer hover:brightness-110 transition-all"
            filter="url(#shadow)"
            onClick={(e) => handlePieceClick(e, "piece3")}
          >
            <path
              d="M 50 250 L 250 250 L 250 270 Q 250 265 255 263 Q 265 260 265 250 Q 265 240 255 237 Q 250 235 250 230 L 250 250 L 250 450 L 50 450 L 50 250 Z"
              fill="url(#gradient3)"
              stroke="rgba(0,0,0,0.2)"
              strokeWidth="2"
            />
            <path
              d="M 50 250 L 250 250 L 250 270 Q 250 265 255 263 Q 265 260 265 250 Q 265 240 255 237 Q 250 235 250 230 L 250 250 L 250 450 L 50 450 L 50 250 Z"
              fill="none"
              stroke="white"
              strokeWidth="1"
              opacity="0.3"
            />
            <text
              x="150"
              y="340"
              textAnchor="middle"
              fill="white"
              fontSize="20"
              fontWeight="700"
              fontFamily="system-ui, -apple-system, sans-serif"
              style={{ pointerEvents: "none" }}
            >
              Quick
            </text>
            <text
              x="150"
              y="365"
              textAnchor="middle"
              fill="white"
              fontSize="20"
              fontWeight="700"
              fontFamily="system-ui, -apple-system, sans-serif"
              style={{ pointerEvents: "none" }}
            >
              Learner
            </text>
          </g>

          <g
            id="piece4"
            className="cursor-pointer hover:brightness-110 transition-all"
            filter="url(#shadow)"
            onClick={(e) => handlePieceClick(e, "piece4")}
          >
            <path
              d="M 250 250 L 230 250 Q 235 250 237 255 Q 240 265 250 265 Q 260 265 263 255 Q 265 250 270 250 L 250 250 L 450 250 L 450 450 L 250 450 L 250 250 Z"
              fill="url(#gradient4)"
              stroke="rgba(0,0,0,0.2)"
              strokeWidth="2"
            />
            <path
              d="M 250 250 L 230 250 Q 235 250 237 255 Q 240 265 250 265 Q 260 265 263 255 Q 265 250 270 250 L 250 250 L 450 250 L 450 450 L 250 450 L 250 250 Z"
              fill="none"
              stroke="white"
              strokeWidth="1"
              opacity="0.3"
            />
            <text
              x="350"
              y="340"
              textAnchor="middle"
              fill="white"
              fontSize="20"
              fontWeight="700"
              fontFamily="system-ui, -apple-system, sans-serif"
              style={{ pointerEvents: "none" }}
            >
              Communi-
            </text>
            <text
              x="350"
              y="365"
              textAnchor="middle"
              fill="white"
              fontSize="20"
              fontWeight="700"
              fontFamily="system-ui, -apple-system, sans-serif"
              style={{ pointerEvents: "none" }}
            >
              cator
            </text>
          </g>
        </svg>
      </div>

      {/* Button - Matches portfolio button style */}
      <div className="text-center">
        <button
          onClick={handleButtonClick}
          disabled={buttonDisabled}
          className={`
            px-6 md:px-8 py-2.5 md:py-3 rounded-xl font-bold text-sm md:text-base
            transition-all duration-300
            transform hover:scale-105 active:scale-95
            ${
              isScattered
                ? "bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700"
                : "bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800"
            }
            text-white shadow-lg hover:shadow-xl
            border-2 border-white/20
            w-full md:w-auto
            disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100
          `}
        >
          <span className="flex items-center justify-center gap-2">
            {isScattered ? (
              <>
                <svg
                  className="w-4 h-4 md:w-5 md:h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                {buttonText}
              </>
            ) : (
              <>
                <svg
                  className="w-4 h-4 md:w-5 md:h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                {buttonText}
              </>
            )}
          </span>
        </button>

        <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 italic">
          {isScattered
            ? "Click to assemble the puzzle"
            : "Perfectly interlocked! 🎯"}
        </p>
      </div>
    </div>
  );
}
