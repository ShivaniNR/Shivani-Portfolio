"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface PieceData {
  id: string;
  finalX: number;
  finalY: number;
  textId: string;
}

export default function PuzzleAnimation() {
  const [isScattered, setIsScattered] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [buttonText, setButtonText] = useState("Organize Puzzle");
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
          // Add a subtle pulse effect when piece lands
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

    // Change button text after animation
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
      setButtonText("Organize Puzzle");
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
    // Initial scatter on mount
    const timer = setTimeout(() => {
      scatterPieces();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="container">
      <h1>✨ My Skills ✨</h1>

      <div id="puzzle-container">
        <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {/* Gradients for realistic shading */}
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop
                offset="0%"
                style={{ stopColor: "#ff6b6b", stopOpacity: 1 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "#ee5a6f", stopOpacity: 1 }}
              />
            </linearGradient>

            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop
                offset="0%"
                style={{ stopColor: "#4ecdc4", stopOpacity: 1 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "#44a08d", stopOpacity: 1 }}
              />
            </linearGradient>

            <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop
                offset="0%"
                style={{ stopColor: "#ffd93d", stopOpacity: 1 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "#f9ca24", stopOpacity: 1 }}
              />
            </linearGradient>

            <linearGradient id="gradient4" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop
                offset="0%"
                style={{ stopColor: "#a29bfe", stopOpacity: 1 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "#6c5ce7", stopOpacity: 1 }}
              />
            </linearGradient>

            {/* Shadow filters for depth */}
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

          {/* Top Left Piece - Problem Solver */}
          <g
            id="piece1"
            className="puzzle-piece"
            filter="url(#shadow)"
            onClick={(e) => handlePieceClick(e, "piece1")}
          >
            <path
              d="
              M 50 50
              L 250 50
              L 250 230
              Q 250 235 245 237
              Q 235 240 235 250
              Q 235 260 245 263
              Q 250 265 250 270
              L 250 250
              L 50 250
              L 50 50
              Z
            "
              fill="url(#gradient1)"
              stroke="rgba(0,0,0,0.2)"
              strokeWidth="2"
            />
            <path
              d="
              M 50 50
              L 250 50
              L 250 230
              Q 250 235 245 237
              Q 235 240 235 250
              Q 235 260 245 263
              Q 250 265 250 270
              L 250 250
              L 50 250
              L 50 50
              Z
            "
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
              fontSize="22"
              fontWeight="bold"
              style={{ pointerEvents: "none" }}
            >
              Problem
            </text>
            <text
              x="150"
              y="170"
              textAnchor="middle"
              fill="white"
              fontSize="22"
              fontWeight="bold"
              style={{ pointerEvents: "none" }}
            >
              Solver
            </text>
          </g>

          {/* Top Right Piece - Team Player */}
          <g
            id="piece2"
            className="puzzle-piece"
            filter="url(#shadow)"
            onClick={(e) => handlePieceClick(e, "piece2")}
          >
            <path
              d="
              M 250 50
              L 450 50
              L 450 250
              L 270 250
              Q 265 250 263 245
              Q 260 235 250 235
              Q 240 235 237 245
              Q 235 250 230 250
              L 250 250
              L 250 50
              Z
            "
              fill="url(#gradient3)"
              stroke="rgba(0,0,0,0.2)"
              strokeWidth="2"
            />
            <path
              d="
              M 250 50
              L 450 50
              L 450 250
              L 270 250
              Q 265 250 263 245
              Q 260 235 250 235
              Q 240 235 237 245
              Q 235 250 230 250
              L 250 250
              L 250 50
              Z
            "
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
              fontSize="22"
              fontWeight="bold"
              style={{ pointerEvents: "none" }}
            >
              Team
            </text>
            <text
              x="350"
              y="170"
              textAnchor="middle"
              fill="white"
              fontSize="22"
              fontWeight="bold"
              style={{ pointerEvents: "none" }}
            >
              Player
            </text>
          </g>

          {/* Bottom Left Piece - Quick Learner */}
          <g
            id="piece3"
            className="puzzle-piece"
            filter="url(#shadow)"
            onClick={(e) => handlePieceClick(e, "piece3")}
          >
            <path
              d="
              M 50 250
              L 250 250
              L 250 270
              Q 250 265 255 263
              Q 265 260 265 250
              Q 265 240 255 237
              Q 250 235 250 230
              L 250 250
              L 250 450
              L 50 450
              L 50 250
              Z
            "
              fill="url(#gradient2)"
              stroke="rgba(0,0,0,0.2)"
              strokeWidth="2"
            />
            <path
              d="
              M 50 250
              L 250 250
              L 250 270
              Q 250 265 255 263
              Q 265 260 265 250
              Q 265 240 255 237
              Q 250 235 250 230
              L 250 250
              L 250 450
              L 50 450
              L 50 250
              Z
            "
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
              fontSize="22"
              fontWeight="bold"
              style={{ pointerEvents: "none" }}
            >
              Quick
            </text>
            <text
              x="150"
              y="370"
              textAnchor="middle"
              fill="white"
              fontSize="22"
              fontWeight="bold"
              style={{ pointerEvents: "none" }}
            >
              Learner
            </text>
          </g>

          {/* Bottom Right Piece - Communicator */}
          <g
            id="piece4"
            className="puzzle-piece"
            filter="url(#shadow)"
            onClick={(e) => handlePieceClick(e, "piece4")}
          >
            <path
              d="
              M 250 250
              L 230 250
              Q 235 250 237 255
              Q 240 265 250 265
              Q 260 265 263 255
              Q 265 250 270 250
              L 250 250
              L 450 250
              L 450 450
              L 250 450
              L 250 250
              Z
            "
              fill="url(#gradient4)"
              stroke="rgba(0,0,0,0.2)"
              strokeWidth="2"
            />
            <path
              d="
              M 250 250
              L 230 250
              Q 235 250 237 255
              Q 240 265 250 265
              Q 260 265 263 255
              Q 265 250 270 250
              L 250 250
              L 450 250
              L 450 450
              L 250 450
              L 250 250
              Z
            "
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
              fontSize="22"
              fontWeight="bold"
              style={{ pointerEvents: "none" }}
            >
              Communi-
            </text>
            <text
              x="350"
              y="370"
              textAnchor="middle"
              fill="white"
              fontSize="22"
              fontWeight="bold"
              style={{ pointerEvents: "none" }}
            >
              cator
            </text>
          </g>
        </svg>
      </div>

      <button
        id="organizeBtn"
        onClick={handleButtonClick}
        disabled={buttonDisabled}
      >
        {buttonText}
      </button>
      <p className="info">Click the button to see the magic happen! ✨</p>

      <style jsx>{`
        .container {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          padding: 20px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        h1 {
          color: white;
          margin-bottom: 30px;
          font-size: 2.5em;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        }

        #puzzle-container {
          width: 500px;
          height: 500px;
          position: relative;
          margin: 0 auto 30px;
        }

        svg {
          width: 100%;
          height: 100%;
          filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.3));
        }

        .puzzle-piece {
          cursor: pointer;
          transition: filter 0.3s ease;
        }

        .puzzle-piece:hover {
          filter: brightness(1.1);
        }

        .puzzle-piece text {
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        }

        button {
          background: white;
          border: none;
          padding: 15px 40px;
          font-size: 18px;
          font-weight: 600;
          border-radius: 50px;
          cursor: pointer;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
          transition: all 0.3s ease;
          color: #667eea;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
        }

        button:active {
          transform: translateY(0);
        }

        button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .info {
          color: white;
          margin-top: 20px;
          font-size: 14px;
          opacity: 0.9;
        }

        @media (max-width: 600px) {
          #puzzle-container {
            width: 90vw;
            height: 90vw;
            max-width: 500px;
            max-height: 500px;
          }

          h1 {
            font-size: 1.8em;
          }
        }
      `}</style>
    </div>
  );
}
