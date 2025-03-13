"use client";

import { useState } from "react";
import { useXPToast } from "@/hooks/useXPToast";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function ToastDemoPage() {
  const showToast = useXPToast();
  const [title, setTitle] = useState("Notification Title");
  const [message, setMessage] = useState("");
  const [xp, setXp] = useState(25);
  const [autoClose, setAutoClose] = useState(true);
  const [autoCloseTime, setAutoCloseTime] = useState(5000);

  const handleShowXPToast = (type: "xp" | "achievement" | "level-up") => {
    showToast(type, title, {
      message: message || undefined,
      xp: type === "xp" ? xp : undefined,
      autoClose,
      autoCloseTime,
    });
  };

  return (
    <main className="min-h-screen bg-[#030303] py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300">
            XP Toast Demo
          </h1>
          <p className="text-white/60 mb-8">
            This page demonstrates how to use the new useXPToast hook to show
            different types of notifications.
          </p>

          <Card className="bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] mb-8">
            <CardHeader>
              <CardTitle className="text-white">Toast Configuration</CardTitle>
              <CardDescription className="text-white/60">
                Customize your toast notification options
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title" className="text-white">
                      Title
                    </Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="bg-white/[0.03] border-white/[0.05] text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="message" className="text-white">
                      Message (optional)
                    </Label>
                    <Input
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Default message will be used if empty"
                      className="bg-white/[0.03] border-white/[0.05] text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="xp" className="text-white">
                      XP Amount (for XP type)
                    </Label>
                    <Input
                      id="xp"
                      type="number"
                      value={xp}
                      onChange={(e) => setXp(Number(e.target.value))}
                      className="bg-white/[0.03] border-white/[0.05] text-white"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="autoClose"
                      className="text-white mb-2 block"
                    >
                      Auto Close
                    </Label>
                    <Switch
                      id="autoClose"
                      checked={autoClose}
                      onCheckedChange={setAutoClose}
                    />
                  </div>
                  <div>
                    <Label htmlFor="autoCloseTime" className="text-white">
                      Auto Close Time (ms)
                    </Label>
                    <Input
                      id="autoCloseTime"
                      type="number"
                      value={autoCloseTime}
                      onChange={(e) => setAutoCloseTime(Number(e.target.value))}
                      disabled={!autoClose}
                      className="bg-white/[0.03] border-white/[0.05] text-white"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/[0.02] backdrop-blur-sm border border-white/[0.05]">
            <CardHeader>
              <CardTitle className="text-white">Show Toast</CardTitle>
              <CardDescription className="text-white/60">
                Click the buttons below to show different types of toasts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="xp" className="w-full">
                <TabsList className="grid grid-cols-3 w-full bg-white/[0.03]">
                  <TabsTrigger value="xp">XP Toast</TabsTrigger>
                  <TabsTrigger value="achievement">
                    Achievement Toast
                  </TabsTrigger>
                  <TabsTrigger value="level-up">Level Up Toast</TabsTrigger>
                </TabsList>
                <TabsContent value="xp" className="py-4">
                  <p className="text-white/60 mb-4">
                    Shows a notification with XP earned. This is perfect for
                    when users complete actions that earn them experience
                    points.
                  </p>
                  <Button
                    onClick={() => handleShowXPToast("xp")}
                    className="bg-amber-500 hover:bg-amber-600 text-white"
                  >
                    Show XP Toast
                  </Button>
                </TabsContent>
                <TabsContent value="achievement" className="py-4">
                  <p className="text-white/60 mb-4">
                    Shows a notification for unlocked achievements. Use this
                    when users complete special tasks or milestones.
                  </p>
                  <Button
                    onClick={() => handleShowXPToast("achievement")}
                    className="bg-indigo-500 hover:bg-indigo-600 text-white"
                  >
                    Show Achievement Toast
                  </Button>
                </TabsContent>
                <TabsContent value="level-up" className="py-4">
                  <p className="text-white/60 mb-4">
                    Shows a notification for level ups. Use this when users gain
                    enough XP to reach a new level.
                  </p>
                  <Button
                    onClick={() => handleShowXPToast("level-up")}
                    className="bg-rose-500 hover:bg-rose-600 text-white"
                  >
                    Show Level Up Toast
                  </Button>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <div className="mt-8 pt-8 border-t border-white/[0.05]">
            <h2 className="text-xl font-semibold text-white mb-4">
              Usage Example
            </h2>
            <pre className="bg-gray-900 p-4 rounded-md overflow-x-auto">
              <code className="text-sm text-white">
                {`// 1. Import the hook
import { useXPToast } from "@/hooks/useXPToast";

// 2. Use the hook in your component
const MyComponent = () => {
  const showToast = useXPToast();
  
  const handleComplete = () => {
    // 3. Call showToast with type, title, and optional parameters
    showToast("xp", "XP Earned!", { 
      message: "You earned XP for completing a mission.",
      xp: 25
    });
  };

  return (
    <button onClick={handleComplete}>
      Complete Mission
    </button>
  );
};`}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </main>
  );
}
