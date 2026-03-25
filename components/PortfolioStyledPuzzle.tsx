"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const softSkills = [
  {
    id: "piece1",
    label: "Problem Solver",
    icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
    gradient: "from-cyan-500 to-cyan-600",
  },
  {
    id: "piece2",
    label: "Team Player",
    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
    gradient: "from-blue-500 to-blue-600",
  },
  {
    id: "piece3",
    label: "Quick Learner",
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
    gradient: "from-cyan-400 to-cyan-500",
  },
  {
    id: "piece4",
    label: "Communicator",
    icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
    gradient: "from-blue-600 to-indigo-600",
  },
];

export default function PortfolioStyledPuzzle() {
  const [isScattered, setIsScattered] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [buttonText, setButtonText] = useState("Make It Make Sense");
  const containerRef = useRef<HTMLDivElement>(null);

  const scatterPieces = () => {
    softSkills.forEach((skill, index) => {
      const element = document.getElementById(skill.id);
      if (!element) return;

      const angle = Math.random() * 360;
      const distance = 80 + Math.random() * 60;
      const x = Math.cos((angle * Math.PI) / 180) * distance;
      const y = Math.sin((angle * Math.PI) / 180) * distance;
      const rotation = -15 + Math.random() * 30;

      gsap.to(element, {
        x,
        y,
        rotation,
        scale: 0.9,
        opacity: 0.7,
        duration: 0.8,
        ease: "back.out(1.7)",
        delay: index * 0.1,
      });
    });
    setIsScattered(true);
  };

  const organizePieces = () => {
    softSkills.forEach((skill, index) => {
      const element = document.getElementById(skill.id);
      if (!element) return;

      gsap.to(element, {
        x: 0,
        y: 0,
        rotation: 0,
        scale: 1,
        opacity: 1,
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
      setTimeout(() => setButtonDisabled(false), 2000);
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
      rotation: "+=10",
      duration: 0.1,
      yoyo: true,
      repeat: 3,
      ease: "power2.inOut",
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => scatterPieces(), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div aria-label="Soft skills puzzle" className="flex flex-col items-center">
      {/* Header */}
      <div className="text-center mb-6">
        <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-1">
          {isScattered ? "The Raw Ingredients" : "My Soft Skills"}
        </h3>
        <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400">
          {isScattered
            ? "...of a great teammate"
            : "Pieces assembled and ready to collaborate"}
        </p>
      </div>

      {/* Puzzle Grid */}
      <div
        ref={containerRef}
        className="grid grid-cols-2 gap-3 md:gap-4 mb-6 w-full max-w-xs"
      >
        {softSkills.map((skill) => (
          <div
            key={skill.id}
            id={skill.id}
            onClick={(e) => handlePieceClick(e, skill.id)}
            className={`
              cursor-pointer select-none
              bg-gradient-to-br ${skill.gradient}
              rounded-xl p-4 md:p-5
              shadow-lg hover:shadow-xl
              border border-white/20
              flex flex-col items-center justify-center gap-2
              aspect-square
              transition-shadow
            `}
          >
            <svg
              className="w-8 h-8 md:w-10 md:h-10 text-white/90"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d={skill.icon}
              />
            </svg>
            <span className="text-white font-semibold text-xs md:text-sm text-center leading-tight">
              {skill.label}
            </span>
          </div>
        ))}
      </div>

      {/* Button */}
      <button
        onClick={handleButtonClick}
        disabled={buttonDisabled}
        aria-label={isScattered ? "Assemble puzzle pieces" : "Scatter puzzle pieces"}
        className={`
          px-6 md:px-8 py-2.5 md:py-3 rounded-lg font-semibold text-sm md:text-base
          transition-all duration-300
          hover:scale-105 active:scale-95
          ${
            isScattered
              ? "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
              : "border-2 border-cyan-500 dark:border-cyan-400 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-900/30"
          }
          ${isScattered ? "text-white" : ""}
          shadow-md hover:shadow-lg
          disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100
        `}
      >
        {buttonText}
      </button>

      <p className="text-xs text-slate-400 dark:text-slate-500 mt-3">
        {isScattered ? "Click to assemble" : "Click to scatter"}
      </p>
    </div>
  );
}
