"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Shield, Lock, Smartphone, Key, AlertTriangle, Check } from "lucide-react"
import { useState } from "react"

interface SecuritySettingsProps {
  is2FAEnabled: boolean
  onToggle2FA: (enabled: boolean) => void
  onChangePassword: () => void
  onManageDevices: () => void
}

export default function SecuritySettings({
  is2FAEnabled,
  onToggle2FA,
  onChangePassword,
  onManageDevices,
}: SecuritySettingsProps) {
  const [showPasswordForm, setShowPasswordForm] = useState(false)
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setShowPasswordForm(false)
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
      onChangePassword()
    }, 1500)
  }

  return (
    <div className="bg-gradient-to-br from-white/[0.05] to-transparent backdrop-blur-sm border border-white/[0.08] rounded-xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-white/[0.03] rounded-full w-10 h-10 flex items-center justify-center">
          <Shield className="w-5 h-5 text-indigo-400" />
        </div>
        <h2 className="text-xl font-bold text-white">Security Settings</h2>
      </div>

      <div className="space-y-4">
        {/* Two-Factor Authentication */}
        <div className="bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] rounded-xl p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <div className="bg-white/[0.03] rounded-full w-8 h-8 flex items-center justify-center mt-1">
                <Smartphone className="w-4 h-4 text-rose-400" />
              </div>

              <div>
                <h3 className="font-medium text-white mb-1">Two-Factor Authentication</h3>
                <p className="text-white/60 text-sm mb-2">Add an extra layer of security to your account with 2FA.</p>

                <div className="flex items-center gap-2 text-xs">
                  <div className={`w-2 h-2 rounded-full ${is2FAEnabled ? "bg-emerald-500" : "bg-white/20"}`} />
                  <span className="text-white/60">{is2FAEnabled ? "Enabled" : "Disabled"}</span>
                </div>
              </div>
            </div>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={is2FAEnabled}
                onChange={() => onToggle2FA(!is2FAEnabled)}
              />
              <div className="w-11 h-6 bg-white/10 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-500"></div>
            </label>
          </div>
        </div>

        {/* Change Password */}
        <div className="bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] rounded-xl p-4">
          <div className="flex items-start gap-3 mb-3">
            <div className="bg-white/[0.03] rounded-full w-8 h-8 flex items-center justify-center mt-1">
              <Lock className="w-4 h-4 text-amber-400" />
            </div>

            <div className="flex-1">
              <h3 className="font-medium text-white mb-1">Password</h3>
              <p className="text-white/60 text-sm">Change your account password regularly for better security.</p>
            </div>

            {!showPasswordForm && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowPasswordForm(true)}
                className="px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.08] text-white/70 hover:text-white text-sm"
              >
                Change
              </motion.button>
            )}
          </div>

          {showPasswordForm && (
            <form onSubmit={handlePasswordSubmit} className="border-t border-white/[0.05] pt-3">
              <div className="space-y-3">
                <div>
                  <label className="block text-white/60 text-sm mb-1">Current Password</label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full px-3 py-2 bg-white/[0.03] border border-white/[0.08] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                    required
                  />
                </div>

                <div>
                  <label className="block text-white/60 text-sm mb-1">New Password</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-3 py-2 bg-white/[0.03] border border-white/[0.08] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                    required
                  />
                </div>

                <div>
                  <label className="block text-white/60 text-sm mb-1">Confirm New Password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-3 py-2 bg-white/[0.03] border border-white/[0.08] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={() => setShowPasswordForm(false)}
                  className="px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.08] text-white/70 hover:text-white text-sm"
                >
                  Cancel
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-indigo-500 to-rose-500 text-white text-sm flex items-center gap-1"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Save Changes</span>
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          )}
        </div>

        {/* Manage Devices */}
        <div className="bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] rounded-xl p-4">
          <div className="flex items-start gap-3">
            <div className="bg-white/[0.03] rounded-full w-8 h-8 flex items-center justify-center mt-1">
              <Key className="w-4 h-4 text-indigo-400" />
            </div>

            <div className="flex-1">
              <h3 className="font-medium text-white mb-1">Connected Devices</h3>
              <p className="text-white/60 text-sm">Manage devices that have access to your account.</p>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onManageDevices}
              className="px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.08] text-white/70 hover:text-white text-sm"
            >
              Manage
            </motion.button>
          </div>
        </div>

        {/* Security Alert */}
        <div className="bg-rose-500/10 backdrop-blur-sm border border-rose-500/20 rounded-xl p-4 flex items-start gap-3">
          <div className="bg-rose-500/20 rounded-full w-8 h-8 flex items-center justify-center mt-1">
            <AlertTriangle className="w-4 h-4 text-rose-400" />
          </div>

          <div>
            <h3 className="font-medium text-white mb-1">Security Best Practices</h3>
            <p className="text-white/60 text-sm">
              Never share your private keys or seed phrases. Our team will never ask for them.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

