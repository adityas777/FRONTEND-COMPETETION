"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { Progress } from "@/components/ui/progress"
import { Loader2, Sparkles } from "lucide-react"

const galaxySlides = [
  { id: 1, src: "/galaxy-1.jpeg", title: "Cosmic Portal", description: "Gateway to infinite possibilities" },
  { id: 2, src: "/galaxy-2.jpeg", title: "Galaxy Dreams", description: "Where stars are born" },
  { id: 3, src: "/galaxy-3.jpeg", title: "Space Station", description: "Humanity's reach into the void" },
  { id: 4, src: "/galaxy-4.jpeg", title: "Star Cluster", description: "Ancient light across time" },
  { id: 5, src: "/galaxy-5.jpeg", title: "Energy Portal", description: "Dimensional gateway" },
  { id: 6, src: "/galaxy-6.jpeg", title: "Alien World", description: "Distant planetary systems" },
  { id: 7, src: "/cosmic-portal.jpeg", title: "Cosmic Awakening", description: "Witnesses to cosmic wonder" },
  { id: 8, src: "/deep-space.jpeg", title: "Deep Space", description: "The infinite stellar ocean" },
  { id: 9, src: "/space-station.jpeg", title: "Stellar Outpost", description: "Advanced civilizations" },
  { id: 10, src: "/cosmic-person.jpeg", title: "Universal Connection", description: "One with the cosmos" },
  { id: 11, src: "/purple-cosmos.jpeg", title: "Purple Nebula", description: "Mystical cosmic landscapes" },
  {
    id: 12,
    src: "/placeholder.svg?height=800&width=1200&text=Wormhole",
    title: "Wormhole",
    description: "Passage through spacetime",
  },
]

// Dashboard images data
const dashboardImages = [
  {
    id: 1,
    src: "/graph.png",
    title: "Carbon Emissions Analytics",
    description: "Embodied carbon emissions tracking and analysis",
    position: "top-right",
  },
  {
    id: 2,
    src: "/cards.png",
    title: "Brand Management System",
    description: "Multi-brand portfolio management interface",
    position: "bottom-left",
  },
  {
    id: 3,
    src: "/stats.png",
    title: "Portfolio Statistics",
    description: "Comprehensive energy and carbon footprint metrics",
    position: "bottom-right",
  },
]

export default function Component() {
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [showContent, setShowContent] = useState(false)
  const [showBlast, setShowBlast] = useState(false)
  const [showSpline, setShowSpline] = useState(false)
  const [showExplosionBlast, setShowExplosionBlast] = useState(false)
  const [showRobotSpline, setShowRobotSpline] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const horizontalRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  // Optimized image scaling
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.8, 1])
  const imageOpacity = useTransform(scrollYProgress, [0, 0.3], [0.4, 1])
  const imageWidth = useTransform(scrollYProgress, [0, 1], ["50%", "80vw"])
  const imageHeight = useTransform(scrollYProgress, [0, 1], ["auto", "70vh"])
  const imageBorderRadius = useTransform(scrollYProgress, [0, 1], [24, 12])

  // Horizontal scroll detection
  const { scrollYProgress: horizontalScrollY } = useScroll({
    target: horizontalRef,
    offset: ["start start", "end end"],
  })

  const totalImages = galaxySlides.length
  const imageWidth_calc = 85
  const totalWidthNeeded = totalImages * imageWidth_calc
  const finalPosition = -((totalWidthNeeded - 100) / 100) * 100

  const horizontalX = useTransform(horizontalScrollY, [0, 1], ["0%", `${finalPosition}%`])

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          setIsComplete(true)
          setTimeout(() => setShowContent(true), 800)
          clearInterval(timer)
          return 100
        }
        const increment = Math.random() * 2 + 1
        return Math.min(prevProgress + increment, 100)
      })
    }, 50)

    return () => clearInterval(timer)
  }, [])

  // Scroll detection for first blast trigger
  useEffect(() => {
    let hasTriggered = false

    const unsubscribe = horizontalScrollY.on("change", (latest) => {
      if (latest >= 0.9 && !hasTriggered && !showBlast && !showSpline) {
        hasTriggered = true
        setShowBlast(true)
        setTimeout(() => {
          setShowBlast(false)
          setShowSpline(true)
        }, 2500)
      }
    })

    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const scrollHeight = document.documentElement.scrollHeight
      const clientHeight = document.documentElement.clientHeight
      const scrollPercentage = scrollTop / (scrollHeight - clientHeight)

      if (scrollPercentage >= 0.9 && !hasTriggered && !showBlast && !showSpline) {
        hasTriggered = true
        setShowBlast(true)
        setTimeout(() => {
          setShowBlast(false)
          setShowSpline(true)
        }, 2500)
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      unsubscribe()
      window.removeEventListener("scroll", handleScroll)
    }
  }, [horizontalScrollY, showBlast, showSpline])

  const triggerBlastManually = () => {
    if (!showBlast && !showSpline) {
      setShowBlast(true)
      setTimeout(() => {
        setShowBlast(false)
        setShowSpline(true)
      }, 2500)
    }
  }

  // Handle explosion button click - SMOOTHER TRANSITION
  const handleExplosionClick = () => {
    if (!showExplosionBlast && !showRobotSpline) {
      setShowExplosionBlast(true)
      setTimeout(() => {
        setShowExplosionBlast(false)
        setShowRobotSpline(true)
      }, 2800) // Slightly longer for smoother transition
    }
  }

  const handleRestart = () => {
    setProgress(0)
    setIsComplete(false)
    setShowContent(false)
    setShowBlast(false)
    setShowSpline(false)
    setShowExplosionBlast(false)
    setShowRobotSpline(false)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Updated to open external URL
  const handleImageClick = () => {
    window.open("https://v0-vercel-ai-project-jet.vercel.app/", "_blank")
  }

  const getImagePosition = (position: string) => {
    switch (position) {
      case "top-right":
        return "top-8 right-8"
      case "bottom-left":
        return "bottom-8 left-8"
      case "bottom-right":
        return "bottom-8 right-8"
      default:
        return "top-8 right-8"
    }
  }

  return (
    <div className="bg-black relative" style={{ scrollBehavior: "smooth" }}>
      {/* First Blast Animation Overlay */}
      <AnimatePresence>
        {showBlast && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{
              background: "radial-gradient(circle, #ffffff 0%, #00ffff 20%, #ff00ff 40%, #000000 70%)",
            }}
          >
            {/* Central blast point */}
            <motion.div
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 80, opacity: 0 }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="absolute w-8 h-8 rounded-full bg-white"
              style={{ boxShadow: "0 0 200px #ffffff, 0 0 400px #00ffff" }}
            />

            {/* Multiple blast waves */}
            {[...Array(3)].map((_, waveIndex) => (
              <motion.div
                key={`wave-${waveIndex}`}
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 60, opacity: 0 }}
                transition={{
                  duration: 2,
                  delay: waveIndex * 0.2,
                  ease: "easeOut",
                }}
                className="absolute w-12 h-12 rounded-full"
                style={{
                  background:
                    waveIndex % 2 === 0
                      ? "radial-gradient(circle, #00ffff, transparent)"
                      : "radial-gradient(circle, #ff00ff, transparent)",
                  boxShadow: `0 0 100px ${waveIndex % 2 === 0 ? "#00ffff" : "#ff00ff"}`,
                }}
              />
            ))}

            {/* Enhanced blast particles */}
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  scale: 0,
                  x: 0,
                  y: 0,
                  opacity: 1,
                }}
                animate={{
                  scale: [0, 2, 0],
                  x: (Math.random() - 0.5) * 3000,
                  y: (Math.random() - 0.5) * 3000,
                  opacity: [1, 1, 0],
                  rotate: Math.random() * 360,
                }}
                transition={{
                  duration: 2.5,
                  delay: i * 0.03,
                  ease: "easeOut",
                }}
                className="absolute w-8 h-8 rounded-full"
                style={{
                  background: i % 3 === 0 ? "#00ffff" : i % 3 === 1 ? "#ff00ff" : "#ffffff",
                  boxShadow: `0 0 30px currentColor`,
                }}
              />
            ))}

            {/* Blast text effect */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 1, 0], scale: [0, 2, 4] }}
              transition={{ duration: 1.5, delay: 0.5 }}
              className="absolute text-6xl font-bold text-white z-10"
              style={{
                textShadow: "0 0 50px #00ffff, 0 0 100px #ff00ff",
                fontFamily: "monospace",
              }}
            >
              PORTAL ACTIVATED
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SMOOTHER Explosion Blast Animation Overlay */}
      <AnimatePresence>
        {showExplosionBlast && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{
              background: "radial-gradient(circle, #ffff00 0%, #ff4500 15%, #ff00ff 30%, #00ffff 50%, #000000 80%)",
            }}
          >
            {/* MASSIVE Central blast point with smoother animation */}
            <motion.div
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 150, opacity: 0 }}
              transition={{ duration: 2.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="absolute w-16 h-16 rounded-full bg-yellow-300"
              style={{ boxShadow: "0 0 500px #ffff00, 0 0 1000px #ff4500" }}
            />

            {/* Multiple MASSIVE blast waves with smoother timing */}
            {[...Array(5)].map((_, waveIndex) => (
              <motion.div
                key={`explosion-wave-${waveIndex}`}
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 120, opacity: 0 }}
                transition={{
                  duration: 2.8,
                  delay: waveIndex * 0.12,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="absolute w-20 h-20 rounded-full"
                style={{
                  background:
                    waveIndex % 3 === 0
                      ? "radial-gradient(circle, #ffff00, transparent)"
                      : waveIndex % 3 === 1
                        ? "radial-gradient(circle, #ff4500, transparent)"
                        : "radial-gradient(circle, #ff00ff, transparent)",
                  boxShadow: `0 0 200px ${
                    waveIndex % 3 === 0 ? "#ffff00" : waveIndex % 3 === 1 ? "#ff4500" : "#ff00ff"
                  }`,
                }}
              />
            ))}

            {/* MASSIVE blast particles with smoother motion */}
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={`explosion-particle-${i}`}
                initial={{
                  scale: 0,
                  x: 0,
                  y: 0,
                  opacity: 1,
                }}
                animate={{
                  scale: [0, 3, 0],
                  x: (Math.random() - 0.5) * 4000,
                  y: (Math.random() - 0.5) * 4000,
                  opacity: [1, 1, 0],
                  rotate: Math.random() * 720,
                }}
                transition={{
                  duration: 2.8,
                  delay: i * 0.015,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="absolute w-12 h-12 rounded-full"
                style={{
                  background: i % 4 === 0 ? "#ffff00" : i % 4 === 1 ? "#ff4500" : i % 4 === 2 ? "#ff00ff" : "#00ffff",
                  boxShadow: `0 0 50px currentColor`,
                }}
              />
            ))}

            {/* Multiple shockwave rings with smoother animation */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`explosion-ring-${i}`}
                initial={{ scale: 0, opacity: 0.9 }}
                animate={{ scale: 80, opacity: 0 }}
                transition={{
                  duration: 2.8,
                  delay: i * 0.08,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="absolute border-8 rounded-full"
                style={{
                  borderColor: i % 3 === 0 ? "#ffff00" : i % 3 === 1 ? "#ff4500" : "#ff00ff",
                  width: "300px",
                  height: "300px",
                  filter: "blur(3px)",
                }}
              />
            ))}

            {/* Smoother flash effects */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0, 1, 0, 0.5, 0] }}
              transition={{
                duration: 2.2,
                times: [0, 0.1, 0.2, 0.4, 0.5, 0.8, 1],
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="absolute inset-0 bg-yellow-300"
            />

            {/* EXPLOSION text effect with smoother animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 1, 1, 0], scale: [0, 3, 5, 8] }}
              transition={{
                duration: 2.3,
                delay: 0.4,
                times: [0, 0.3, 0.7, 1],
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="absolute text-8xl font-bold text-white z-10"
              style={{
                textShadow: "0 0 100px #ffff00, 0 0 200px #ff4500",
                fontFamily: "monospace",
              }}
            >
              💥 EXPLOSION! 💥
            </motion.div>

            {/* Secondary explosion text with smoother timing */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 1, 0], scale: [0, 2, 6] }}
              transition={{
                duration: 1.8,
                delay: 1.2,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="absolute text-6xl font-bold text-yellow-300 z-10"
              style={{
                textShadow: "0 0 80px #ff4500, 0 0 160px #ffff00",
                fontFamily: "monospace",
              }}
            >
              ROBOT PORTAL OPENING
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* First Spline Scene */}
      <AnimatePresence>
        {showSpline && !showRobotSpline && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="fixed inset-0 z-40"
          >
            <div className="h-screen w-full relative">
              <iframe
                src="https://my.spline.design/projectpromoclickzoom-KoavZAXl2ZCpEf2aKnzXT9ti/"
                frameBorder="0"
                width="100%"
                height="100%"
                className="w-full h-full pointer-events-auto"
              />

              {/* Left Side Instructions with Transparent Background */}
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 3, duration: 1 }}
                className="absolute left-8 top-1/2 transform -translate-y-1/2 z-50 max-w-xs"
              >
                <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-cyan-500/20">
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    className="text-cyan-300 text-sm mb-4 font-medium"
                  >
                    💡 Click the image once to open • Click again to go back to first Spline
                  </motion.div>

                  {/* GLOWING NEON EXPLOSION BUTTON */}
                  <motion.button
                    onClick={handleExplosionClick}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{
                      scale: 1,
                      opacity: 1,
                      boxShadow: [
                        "0 0 20px #ff00ff, 0 0 40px #ff00ff, 0 0 60px #ff00ff",
                        "0 0 30px #00ffff, 0 0 60px #00ffff, 0 0 90px #00ffff",
                        "0 0 20px #ff00ff, 0 0 40px #ff00ff, 0 0 60px #ff00ff",
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      scale: { delay: 0.5, duration: 0.5 },
                      opacity: { delay: 0.5, duration: 0.5 },
                    }}
                    whileHover={{
                      scale: 1.1,
                      boxShadow: "0 0 40px #ffff00, 0 0 80px #ff4500, 0 0 120px #ff00ff",
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full px-6 py-4 rounded-2xl font-bold text-lg text-black relative overflow-hidden border-2"
                    style={{
                      background: "linear-gradient(45deg, #ff00ff, #00ffff, #ffff00)",
                      borderColor: "#ff00ff",
                      textShadow: "0 0 10px #000000",
                    }}
                  >
                    {/* Animated background */}
                    <motion.div
                      className="absolute inset-0 opacity-30"
                      animate={{
                        background: [
                          "linear-gradient(45deg, #ff00ff, #00ffff)",
                          "linear-gradient(45deg, #00ffff, #ffff00)",
                          "linear-gradient(45deg, #ffff00, #ff00ff)",
                          "linear-gradient(45deg, #ff00ff, #00ffff)",
                        ],
                      }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    />

                    {/* Button text */}
                    <span className="relative z-10 flex items-center justify-center space-x-2">
                      <span>💥</span>
                      <span>CLICK FOR EXPLOSION</span>
                      <span>💥</span>
                    </span>

                    {/* Glowing particles */}
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 rounded-full"
                        style={{
                          background: i % 2 === 0 ? "#ff00ff" : "#00ffff",
                          left: `${20 + i * 30}%`,
                          top: "20%",
                        }}
                        animate={{
                          y: [0, -10, 0],
                          opacity: [0.5, 1, 0.5],
                          scale: [0.5, 1, 0.5],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Number.POSITIVE_INFINITY,
                          delay: i * 0.3,
                        }}
                      />
                    ))}
                  </motion.button>
                </div>
              </motion.div>

              {/* Enhanced restart button */}
              <motion.button
                initial={{ opacity: 0, y: 100, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 3, duration: 1, type: "spring", stiffness: 200 }}
                whileHover={{
                  scale: 1.15,
                  boxShadow: "0 0 60px #00ffff, 0 0 120px #ff00ff",
                }}
                whileTap={{ scale: 0.9 }}
                onClick={handleRestart}
                className="absolute top-8 right-8 px-8 py-4 rounded-3xl font-bold text-lg text-black z-50 relative overflow-hidden"
                style={{
                  background: "linear-gradient(45deg, #00ffff, #ff00ff)",
                  boxShadow: "0 0 40px #00ffff",
                }}
              >
                <span className="relative z-10">🚀 Restart Journey</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Robot Spline Page with Dashboard Images */}
      <AnimatePresence>
        {showRobotSpline && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="fixed inset-0 z-40"
          >
            <div className="h-screen w-full relative">
              <iframe
                src="https://my.spline.design/robotfollowcursorforlandingpage-K1dzNEhJ6skRNqf2NDGxO1aj/"
                frameBorder="0"
                width="100%"
                height="100%"
                className="w-full h-full"
              />

              {/* Small transparent robot status - top left */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 0.7, x: 0 }}
                transition={{ delay: 1, duration: 1 }}
                whileHover={{
                  opacity: 1,
                  scale: 1.05,
                  textShadow: "0 0 20px #00ffff, 0 0 40px #ff00ff",
                }}
                className="absolute top-6 left-6 z-50 cursor-pointer"
              >
                <div className="bg-black/20 backdrop-blur-sm rounded-xl p-3 border border-cyan-500/20">
                  <motion.p
                    className="text-cyan-300 text-sm font-medium"
                    animate={{
                      textShadow: ["0 0 10px #00ffff", "0 0 15px #ff00ff", "0 0 10px #00ffff"],
                    }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                  >
                    🤖 ROBOT PORTAL ACTIVATED 🤖
                  </motion.p>
                  <p className="text-cyan-200 text-xs opacity-80">Move cursor to interact</p>
                </div>
              </motion.div>

              {/* Dashboard Images positioned around the spline */}
              {dashboardImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 2 + index * 0.3, duration: 0.8 }}
                  className={`absolute ${getImagePosition(image.position)} z-50`}
                >
                  <motion.div
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 0 30px rgba(0,255,255,0.5), 0 0 60px rgba(255,0,255,0.3)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleImageClick}
                    className="w-48 h-32 bg-black/30 backdrop-blur-sm rounded-2xl overflow-hidden border border-cyan-500/30 cursor-pointer group"
                  >
                    <div className="relative h-full">
                      <img
                        src={image.src || "/placeholder.svg"}
                        alt={image.title}
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                      {/* Hover overlay */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        className="absolute inset-0 bg-black/50 flex items-center justify-center"
                      >
                        <div className="text-center text-white">
                          <div className="text-sm font-bold mb-1">Click to open dashboard</div>
                          <div className="text-xs text-cyan-300">{image.title}</div>
                        </div>
                      </motion.div>

                      {/* Title overlay */}
                      <div className="absolute bottom-2 left-2 right-2">
                        <h4 className="text-white text-xs font-semibold truncate">{image.title}</h4>
                        <p className="text-cyan-300 text-xs opacity-80 truncate">{image.description}</p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}

              {/* Enhanced restart button - moved to top center to avoid conflict */}
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 3, duration: 1, type: "spring", stiffness: 200 }}
                whileHover={{
                  scale: 1.15,
                  boxShadow: "0 0 60px #00ffff, 0 0 120px #ff00ff",
                }}
                whileTap={{ scale: 0.9 }}
                onClick={handleRestart}
                className="absolute top-8 left-1/2 transform -translate-x-1/2 px-8 py-4 rounded-3xl font-bold text-lg text-black z-50 relative overflow-hidden"
                style={{
                  background: "linear-gradient(45deg, #00ffff, #ff00ff)",
                  boxShadow: "0 0 40px #00ffff",
                }}
              >
                <span className="relative z-10">🚀 Restart Journey</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Optimized Background */}
      <div className="fixed inset-0 z-1">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.2) 0%, transparent 50%),
              linear-gradient(135deg, #000000 0%, #1a0033 50%, #000000 100%)
            `,
          }}
        />

        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 4 + 1 + "px",
              height: Math.random() * 4 + 1 + "px",
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
              background: i % 3 === 0 ? "#00ffff" : i % 3 === 1 ? "#ff00ff" : "#ffffff",
              boxShadow: `0 0 ${Math.random() * 10 + 5}px currentColor`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Particle Nebula Spline Background - Only show on main content */}
      {showContent && !showSpline && !showRobotSpline && (
        <div className="fixed inset-0 z-5">
          <iframe
            src="https://my.spline.design/particlenebula-DVXLglRttXue7VlJ2jslaLU8/"
            frameBorder="0"
            width="100%"
            height="100%"
            className="w-full h-full pointer-events-none"
            style={{ opacity: 0.3 }}
          />
        </div>
      )}

      <AnimatePresence mode="wait">
        {!showContent ? (
          <motion.div
            key="loading-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="fixed inset-0 flex items-center justify-center p-4 z-50"
          >
            <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />

            <div className="w-full max-w-lg mx-auto relative z-10">
              {!isComplete ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center space-y-8"
                >
                  <div className="relative mx-auto w-24 h-24 flex items-center justify-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      className="absolute inset-0 rounded-full border-3 border-cyan-400/60"
                      style={{
                        boxShadow: "0 0 20px #00ffff",
                      }}
                    />

                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      className="absolute inset-2"
                    >
                      <Loader2 className="w-full h-full text-purple-400" />
                    </motion.div>

                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        boxShadow: ["0 0 20px #ff00ff", "0 0 40px #ff00ff", "0 0 20px #ff00ff"],
                      }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      className="absolute inset-6 flex items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-purple-600"
                    >
                      <Sparkles className="w-6 h-6 text-white" />
                    </motion.div>
                  </div>

                  <div className="space-y-6">
                    <motion.div className="relative text-6xl font-bold font-mono" key={Math.floor(progress)}>
                      <div className="absolute inset-0 bg-black/70 rounded-xl blur-lg" />

                      <motion.div
                        className="absolute inset-0 text-6xl font-bold font-mono text-cyan-400 blur-sm"
                        style={{
                          textShadow: "0 0 20px #00ffff, 0 0 40px #00ffff",
                        }}
                      >
                        {Math.floor(progress).toString().padStart(3, "0")}%
                      </motion.div>

                      <motion.span
                        className="relative z-10 text-white"
                        style={{
                          textShadow: "0 0 10px #ffffff, 0 0 20px #00ffff",
                          WebkitTextStroke: "1px #00ffff",
                        }}
                      >
                        {Math.floor(progress).toString().padStart(3, "0")}
                      </motion.span>
                      <span
                        className="text-pink-400 relative z-10"
                        style={{
                          textShadow: "0 0 10px #ec4899",
                        }}
                      >
                        %
                      </span>
                    </motion.div>

                    <div className="space-y-4">
                      <div className="relative">
                        <Progress value={progress} className="h-3 bg-slate-900/80" />
                        <motion.div
                          className="absolute top-0 left-0 h-3 rounded-full"
                          style={{
                            background: "linear-gradient(90deg, #00ffff, #ff00ff)",
                            boxShadow: "0 0 15px #00ffff",
                          }}
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                          transition={{ duration: 0.2 }}
                        />
                      </div>
                    </div>
                  </div>

                  <motion.div
                    animate={{
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    className="text-cyan-300 text-xl font-medium"
                  >
                    <div className="absolute inset-0 bg-black/50 rounded-lg blur-lg" />
                    <span className="relative z-10">Loading Galaxy...</span>
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div
                  key="complete"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center space-y-8"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="relative mx-auto w-20 h-20 rounded-full flex items-center justify-center"
                    style={{
                      background: "linear-gradient(45deg, #00ff80, #00ffff)",
                      boxShadow: "0 0 40px #00ff80",
                    }}
                  >
                    <motion.svg
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                      className="w-10 h-10 text-black"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <motion.path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </motion.svg>
                  </motion.div>

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="space-y-4"
                  >
                    <h2
                      className="text-4xl font-bold text-white"
                      style={{
                        textShadow: "0 0 20px #00ffff",
                      }}
                    >
                      Ready!
                    </h2>
                  </motion.div>
                </motion.div>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="relative z-10"
            style={{
              display: showSpline || showRobotSpline ? "none" : "block",
              willChange: "transform",
              backfaceVisibility: "hidden",
              perspective: 1000,
            }}
          >
            {/* Instructional Text - Top Right */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2, duration: 1 }}
              className="fixed top-8 right-8 z-50 max-w-xs"
            >
              <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-4 border border-cyan-500/30">
                <motion.p
                  className="text-cyan-300 text-sm font-medium text-center"
                  animate={{
                    textShadow: ["0 0 10px #00ffff", "0 0 15px #ff00ff", "0 0 10px #00ffff"],
                  }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                >
                  ⚡ Scroll till the last image to see the explosion ⚡
                </motion.p>
                <motion.div
                  animate={{ y: [0, 5, 0] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  className="text-center mt-2 text-2xl"
                >
                  ↓ 💥 ↓
                </motion.div>
              </div>
            </motion.div>
            {/* Hero Section */}
            <motion.section
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="min-h-screen flex items-center justify-center p-8"
            >
              <div className="text-center space-y-8 max-w-4xl">
                <motion.h1
                  className="text-6xl md:text-8xl font-bold text-white"
                  style={{
                    textShadow: "0 0 30px #00ffff, 0 0 60px #ff00ff",
                  }}
                >
                  GALAXY
                </motion.h1>
                <motion.p
                  className="text-xl md:text-2xl text-cyan-300"
                  style={{
                    textShadow: "0 0 15px #00ffff",
                  }}
                >
                  Journey through stunning cosmic visuals
                </motion.p>
              </div>
            </motion.section>

            {/* Image Scaling Section */}
            <div ref={containerRef} className="h-[200vh] relative">
              <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
                <motion.div
                  ref={imageRef}
                  style={{
                    scale: imageScale,
                    opacity: imageOpacity,
                    width: imageWidth,
                    height: imageHeight,
                    borderRadius: imageBorderRadius,
                  }}
                  className="relative flex items-center justify-center"
                >
                  <motion.div
                    className="relative overflow-hidden shadow-2xl"
                    style={{
                      borderRadius: imageBorderRadius,
                      boxShadow: "0 0 50px #00ffff, 0 0 100px #ff00ff",
                    }}
                  >
                    <motion.img
                      src="/galaxy-1.jpeg"
                      alt="Galaxy Portal"
                      className="w-full h-full object-cover brightness-75 contrast-125 saturate-120"
                      loading="eager"
                      style={{ willChange: "transform" }}
                    />
                  </motion.div>
                </motion.div>
              </div>
            </div>

            {/* Horizontal Scrolling Section */}
            <div ref={horizontalRef} className="relative" style={{ height: `${totalImages * 120}vh` }}>
              <div className="sticky top-0 h-screen overflow-hidden">
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-30">
                  <div className="bg-black/50 backdrop-blur-sm rounded-full px-6 py-3">
                    <span className="text-cyan-300 text-sm font-mono">
                      Progress: {Math.round(horizontalScrollY * 100)}%
                    </span>
                    {horizontalScrollY >= 0.85 && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="ml-2 text-yellow-300 font-bold"
                      >
                        ⚡ PORTAL CHARGING...
                      </motion.span>
                    )}
                  </div>
                </div>

                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: horizontalScrollY > 0.8 ? 1 : 0 }}
                  onClick={triggerBlastManually}
                  className="absolute top-20 left-1/2 transform -translate-x-1/2 z-30 px-4 py-2 bg-red-600 text-white rounded-lg font-bold"
                >
                  🚀 ACTIVATE PORTAL (Test)
                </motion.button>

                <motion.div
                  style={{ x: horizontalX, willChange: "transform" }}
                  className="flex h-full items-center will-change-transform"
                >
                  {galaxySlides.map((slide, index) => {
                    const imageProgress = index / (totalImages - 1)
                    const isCurrentImage = Math.abs(horizontalScrollY - imageProgress) < 0.1

                    return (
                      <motion.div
                        key={slide.id}
                        className="flex-shrink-0 h-[75vh] flex items-center justify-center mx-4 relative group"
                        style={{ width: `${imageWidth_calc}vw` }}
                        initial={{ opacity: 0.6, scale: 0.9 }}
                        animate={{
                          opacity: isCurrentImage ? 1 : 0.7,
                          scale: isCurrentImage ? 1 : 0.95,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.div
                          className="relative w-full h-full overflow-hidden rounded-3xl cursor-pointer"
                          whileHover={{
                            scale: 1.05,
                            y: -10,
                          }}
                          transition={{
                            duration: 0.3,
                            type: "spring",
                            stiffness: 200,
                            damping: 25,
                          }}
                          style={{
                            boxShadow: isCurrentImage
                              ? "0 0 50px rgba(0,255,255,0.6), 0 0 100px rgba(255,0,255,0.4)"
                              : "0 0 30px rgba(0,255,255,0.3), 0 0 60px rgba(255,0,255,0.2)",
                            willChange: "transform",
                          }}
                        >
                          {/* Darker overlay for better visibility */}
                          <motion.div
                            className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/20 to-black/40"
                            whileHover={{ opacity: 0.3 }}
                            transition={{ duration: 0.3 }}
                          />

                          <motion.img
                            src={slide.src}
                            alt={slide.title}
                            className="w-full h-full object-cover brightness-90 contrast-110 saturate-110"
                            loading="lazy"
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            style={{ willChange: "transform" }}
                          />

                          {isCurrentImage &&
                            [...Array(3)].map((_, i) => (
                              <motion.div
                                key={i}
                                className="absolute w-2 h-2 rounded-full"
                                style={{
                                  left: `${30 + i * 20}%`,
                                  top: `${30 + i * 15}%`,
                                  background:
                                    i % 2 === 0
                                      ? "radial-gradient(circle, #00ffff, transparent)"
                                      : "radial-gradient(circle, #ff00ff, transparent)",
                                  boxShadow: i % 2 === 0 ? "0 0 10px #00ffff" : "0 0 10px #ff00ff",
                                }}
                                animate={{
                                  scale: [0, 1.2, 0],
                                  opacity: [0, 0.8, 0],
                                  y: [-10, -20, -10],
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Number.POSITIVE_INFINITY,
                                  delay: i * 0.5,
                                  ease: "easeInOut",
                                }}
                              />
                            ))}

                          <motion.div
                            className="absolute bottom-6 left-6 right-6 z-20"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                          >
                            <motion.h3
                              className="text-3xl font-bold text-white mb-2"
                              style={{
                                textShadow: "0 0 20px #00ffff, 0 0 40px #00ffff",
                              }}
                            >
                              {slide.title}
                            </motion.h3>

                            <motion.p className="text-sm text-cyan-200 mb-3 opacity-90" transition={{ duration: 0.3 }}>
                              {slide.description}
                            </motion.p>

                            <motion.div
                              className="w-12 h-1 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500"
                              animate={{
                                width: isCurrentImage ? "60%" : "12px",
                                boxShadow: isCurrentImage ? "0 0 15px #00ffff" : "none",
                              }}
                              transition={{ duration: 0.3 }}
                            />
                          </motion.div>

                          <motion.div
                            className="absolute top-4 right-4 z-20 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1"
                            animate={{
                              scale: isCurrentImage ? 1.1 : 1,
                              backgroundColor: isCurrentImage ? "rgba(0,255,255,0.2)" : "rgba(0,0,0,0.5)",
                            }}
                          >
                            <span className="text-cyan-300 text-sm font-mono">
                              {index + 1}/{galaxySlides.length}
                            </span>
                          </motion.div>
                        </motion.div>
                      </motion.div>
                    )
                  })}

                  <motion.div
                    className="flex-shrink-0 w-screen h-screen flex items-center justify-center relative"
                    style={{ opacity: horizontalScrollY > 0.8 ? 1 : 0.3 }}
                  >
                    <div className="text-center space-y-8 relative z-10">
                      <motion.h2
                        className="text-6xl font-bold text-white mb-4"
                        style={{
                          textShadow: "0 0 40px #00ffff, 0 0 80px #ff00ff",
                        }}
                        animate={{
                          textShadow: [
                            "0 0 40px #00ffff, 0 0 80px #ff00ff",
                            "0 0 60px #ff00ff, 0 0 120px #00ffff",
                            "0 0 40px #00ffff, 0 0 80px #ff00ff",
                          ],
                        }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      >
                        {horizontalScrollY > 0.85 ? "PORTAL READY" : "Journey's End"}
                      </motion.h2>

                      <motion.p className="text-xl text-cyan-300 mb-8">
                        {horizontalScrollY > 0.85
                          ? "Keep scrolling to activate the portal..."
                          : `You've witnessed all ${galaxySlides.length} cosmic wonders`}
                      </motion.p>

                      {horizontalScrollY > 0.85 && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                          className="text-4xl"
                        >
                          ⚡🌌⚡
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
