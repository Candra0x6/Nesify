"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Zap, X, Award, Trophy } from "lucide-react"
import { useState, useEffect } from "react"

export interface XPNotificationProps {
  type: "xp" | "achievement" | "level-up"
  title: string
  message: string
  xp?: number
  show: boolean
  onClose: () => void
  autoClose?: boolean
  autoCloseTime?: number
}

export default function XPNotification({
  type,
  title,
  message,
  xp,
  show,
  onClose,
  autoClose = true,
  autoCloseTime = 5000,
}: XPNotificationProps) {
  const [isVisible, setIsVisible] = useState(show)

  useEffect(() => {
    setIsVisible(show)

    if (show && autoClose) {
      const timer = setTimeout(() => {
        setIsVisible(false)
        setTimeout(onClose, 300) // Wait for exit animation
      }, autoCloseTime)

      return () => clearTimeout(timer)
    }
  }, [show, autoClose, autoCloseTime, onClose])

  const getIcon = () => {
    switch (type) {
      case "xp":
        return <Zap className="w-5 h-5 text-amber-400" />
      case "achievement":
        return <Award className="w-5 h-5 text-indigo-400" />
      case "level-up":
        return <Trophy className="w-5 h-5 text-rose-400" />
      default:
        return <Zap className="w-5 h-5 text-amber-400" />
    }
  }

  const getBgGradient = () => {
    switch (type) {
      case "xp":
        return "from-amber-500/20 to-transparent"
      case "achievement":
        return "from-indigo-500/20 to-transparent"
      case "level-up":
        return "from-rose-500/20 to-transparent"
      default:
        return "from-amber-500/20 to-transparent"
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="fixed top-4 right-4 z-50 max-w-sm w-full"
        >
          <div
            className={`bg-gradient-to-r ${getBgGradient()} backdrop-blur-md border border-white/[0.08] rounded-xl p-4 shadow-xl`}
          >
            <div className="flex items-start gap-3">
              <div className="bg-white/[0.03] rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">
                {getIcon()}
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-white">{title}</h3>
                  <button
                    onClick={() => {
                      setIsVisible(false)
                      setTimeout(onClose, 300)
                    }}
                    className="text-white/40 hover:text-white transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-white/60 text-sm mt-1">{message}</p>

                {xp && (
                  <div className="flex items-center gap-1 mt-2 text-amber-400 font-medium">
                    <Zap className="w-4 h-4" />
                    <span>+{xp} XP</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

