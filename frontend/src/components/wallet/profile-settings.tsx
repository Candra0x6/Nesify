"use client";

import type React from "react";

import { motion } from "framer-motion";
import { User, Bell, Check, X, Upload } from "lucide-react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { MediaRenderer } from "thirdweb/react";
import { client } from "@/lib/thirdweb-dev";

interface ProfileData {
  username: string;
  avatar: string;
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
}

interface ProfileSettingsProps {
  profile: ProfileData;
  onUpdateProfile: (profile: ProfileData) => void;
  onImageUpload?: (file: File) => void;
}

export default function ProfileSettings({
  profile,
  onUpdateProfile,
  onImageUpload,
}: ProfileSettingsProps) {
  const [username, setUsername] = useState(profile.username);
  const [notifications, setNotifications] = useState(profile.notifications);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(
    profile.avatar
  );
  const [isUploading, setIsUploading] = useState(false);

  // Update state when profile changes (e.g., after image upload)
  useEffect(() => {
    setUsername(profile.username);
    setNotifications(profile.notifications);
  }, [profile]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Submit the profile update
    onUpdateProfile({
      username,
      avatar: profile.avatar, // The avatar URL is handled separately through onImageUpload
      notifications,
    });

    setIsSubmitting(false);
  };

  const handleNotificationChange = (
    type: keyof typeof notifications,
    value: boolean
  ) => {
    setNotifications({
      ...notifications,
      [type]: value,
    });
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Display preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image is too large. Maximum size is 5MB.");
        return;
      }

      // Check file type
      if (!file.type.startsWith("image/")) {
        toast.error("Please select an image file.");
        return;
      }

      // Call the upload handler if provided
      if (onImageUpload) {
        try {
          setIsUploading(true);
          await onImageUpload(file);
          toast.success("Profile picture updated!");
        } catch (error) {
          console.error("Error uploading image:", error);
          toast.error("Failed to upload image. Please try again.");
        } finally {
          setIsUploading(false);
        }
      }
    }
  };

  console.log(profile);

  return (
    <div className="bg-gradient-to-br from-white/[0.05] to-transparent backdrop-blur-sm border border-white/[0.08] rounded-xl p-6">
      <h2 className="text-xl font-bold text-white mb-6">Profile Settings</h2>

      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          {/* Avatar */}
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full overflow-hidden">
                <MediaRenderer
                  client={client}
                  src={profile.avatar || "/placeholder.svg"}
                  alt="Profile Avatar"
                  className="w-full h-full object-cover"
                />
                {isUploading && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
              </div>
              <label className="absolute bottom-0 right-0 bg-white/[0.03] backdrop-blur-sm border border-white/[0.08] rounded-full w-8 h-8 flex items-center justify-center cursor-pointer">
                <User className="w-4 h-4 text-white/60" />
                <input
                  type="file"
                  className="hidden"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleAvatarChange}
                  disabled={isUploading}
                />
              </label>
            </div>

            <div className="flex-1">
              <h3 className="text-white font-medium mb-2">Profile Picture</h3>
              <p className="text-white/60 text-sm mb-3">
                Upload a profile picture to personalize your account.
              </p>
              <div className="flex gap-2">
                <label
                  className={`px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.08] text-white/70 hover:text-white text-sm cursor-pointer flex items-center gap-2 ${
                    isUploading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  <Upload className="w-4 h-4" />
                  <span>Upload Image</span>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleAvatarChange}
                    disabled={isUploading}
                  />
                </label>

                {avatarPreview && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    disabled={isUploading}
                    onClick={() => setAvatarPreview(null)}
                    className="px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.08] text-rose-400 hover:text-rose-300 text-sm"
                  >
                    <X className="w-4 h-4" />
                    <span>Remove</span>
                  </motion.button>
                )}
              </div>
              <p className="text-white/40 text-xs mt-2">
                Supported formats: JPEG, PNG, WebP. Max size: 5MB.
              </p>
            </div>
          </div>

          {/* Username & Email */}
          <div className="">
            <div>
              <label className="block text-white/70 mb-2 text-sm">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-white/40" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white/[0.03] border border-white/[0.08] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                  required
                />
              </div>
            </div>
          </div>

          {/* Notification Preferences */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Bell className="w-5 h-5 text-indigo-400" />
              <h3 className="text-white font-medium">
                Notification Preferences
              </h3>
            </div>

            <div className="bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-white font-medium">
                    Email Notifications
                  </h4>
                  <p className="text-white/60 text-sm">
                    Receive updates about events and tickets via email
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={notifications.email}
                    onChange={() =>
                      handleNotificationChange("email", !notifications.email)
                    }
                  />
                  <div className="w-11 h-6 bg-white/10 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-500"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-white font-medium">Push Notifications</h4>
                  <p className="text-white/60 text-sm">
                    Receive real-time notifications on your device
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={notifications.push}
                    onChange={() =>
                      handleNotificationChange("push", !notifications.push)
                    }
                  />
                  <div className="w-11 h-6 bg-white/10 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-500"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-white font-medium">SMS Notifications</h4>
                  <p className="text-white/60 text-sm">
                    Receive important updates via text message
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={notifications.sms}
                    onChange={() =>
                      handleNotificationChange("sms", !notifications.sms)
                    }
                  />
                  <div className="w-11 h-6 bg-white/10 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-500"></div>
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              className="px-4 py-2 rounded-lg bg-white/[0.03] border border-white/[0.08] text-white/70 hover:text-white text-sm flex items-center gap-2"
            >
              <X className="w-4 h-4" />
              <span>Cancel</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-rose-500 text-white text-sm font-medium flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  <span>Save Changes</span>
                </>
              )}
            </motion.button>
          </div>
        </div>
      </form>
    </div>
  );
}
