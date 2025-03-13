"use client";

import { motion } from "framer-motion";
import { Pacifico } from "next/font/google";
import { cn } from "@/lib/utils";
import { ShinyButton } from "@/components/magicui/shiny-button";
import { useRouter } from "next/navigation";

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pacifico",
});

function ElegantShape({
  className,
  delay = 0,
  backgroundImage,
  rotate = 0,
  gradient = "from-white/[0.08]",
  responsiveWidthClasses = "w-[300px] sm:w-[350px] md:w-[400px]",
  responsiveHeightClasses = "h-[300px] sm:h-[350px] md:h-[400px]",
}: {
  className?: string;
  delay?: number;
  width?: number;
  height?: number;
  rotate?: number;
  gradient?: string;
  backgroundImage?: string;
  responsiveWidthClasses?: string;
  responsiveHeightClasses?: string;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -150,
        rotate: rotate - 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
        rotate: rotate,
      }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
      className={cn("absolute", className)}
    >
      <motion.div
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "10px",
          opacity: 0.8,
        }}
        animate={{
          y: [0, 15, 0],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className={cn(
          "relative",
          responsiveWidthClasses,
          responsiveHeightClasses
        )}
      >
        <div
          className={cn(
            "absolute inset-0 rounded-2xl",
            "bg-gradient-to-r to-transparent",
            gradient,
            "backdrop-blur-[2px] border-2 border-white/[0.15]",
            "shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]",
            "after:absolute after:inset-0 after:rounded-full",
            "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]"
          )}
        />
      </motion.div>
    </motion.div>
  );
}

export default function HeroGeometric({
  title1 = "Grap Ticket",
  title2 = "As NFT",
}: {
  badge?: string;
  title1?: string;
  title2?: string;
}) {
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.5 + i * 0.2,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  };
  const router = useRouter();

  return (
    <main>
      <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#030303]">
        <div className="absolute z-10 inset-0 bg-gradient-to-br from-indigo-500/[0.05] via-transparent to-rose-500/[0.05] blur-3xl" />
        <div className="absolute z-0 bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

        <div className="absolute z-10 inset-0 overflow-hidden">
          <ElegantShape
            backgroundImage="/images/NFT1.jpg"
            delay={0.3}
            rotate={12}
            gradient="from-indigo-500/[0.15]"
            className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
            responsiveWidthClasses="w-[300px] sm:w-[400px] md:w-[500px]"
            responsiveHeightClasses="h-[240px] sm:h-[320px] md:h-[400px]"
          />

          <ElegantShape
            backgroundImage="/images/NFT2.jpg"
            delay={0.5}
            rotate={-15}
            gradient="from-rose-500/[0.15]"
            className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
            responsiveWidthClasses="w-[250px] sm:w-[320px] md:w-[400px]"
            responsiveHeightClasses="h-[220px] sm:h-[280px] md:h-[350px]"
          />

          <ElegantShape
            backgroundImage="/images/NFT3.jpg"
            delay={0.4}
            rotate={-8}
            gradient="from-violet-500/[0.15]"
            className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
            responsiveWidthClasses="w-[200px] sm:w-[240px] md:w-[300px]"
            responsiveHeightClasses="h-[200px] sm:h-[240px] md:h-[300px]"
          />

          <ElegantShape
            backgroundImage="/images/NFT4.jpg"
            delay={0.6}
            rotate={20}
            gradient="from-amber-500/[0.15]"
            className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
            responsiveWidthClasses="w-[150px] sm:w-[180px] md:w-[200px]"
            responsiveHeightClasses="h-[150px] sm:h-[180px] md:h-[200px]"
          />

          <ElegantShape
            delay={0.7}
            backgroundImage="/images/NFT5.jpg"
            rotate={-25}
            gradient="from-cyan-500/[0.15]"
            className="left-[20%] md:left-[25%] top-[5%] md:top-[10%]"
            responsiveWidthClasses="w-[100px] sm:w-[120px] md:w-[150px]"
            responsiveHeightClasses="h-[100px] sm:h-[120px] md:h-[150px]"
          />
        </div>

        <div className="relative z-20 container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              custom={1}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
            >
              <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-6 md:mb-8 tracking-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80 ">
                  {title1}
                </span>
                <br />
                <span
                  className={cn(
                    "bg-clip-text text-transparent bg-gradient-to-r from-primary via-indigo-200 to-primary ",
                    pacifico.className
                  )}
                >
                  {title2}
                </span>
              </h1>
            </motion.div>

            <motion.div
              custom={2}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
            >
              <p className="text-base sm:text-lg md:text-xl text-white/40 mb-8 leading-relaxed font-light tracking-wide max-w-xl mx-auto px-4">
                Crafting exceptional digital experiences through innovative
                design and cutting-edge technology.
              </p>
            </motion.div>
            <ShinyButton
              onClick={() => router.push("/guides")}
              className="text-white bg-primary"
            >
              Get Started
            </ShinyButton>
          </div>
        </div>

        <div className="absolute z-10 inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80 pointer-events-none" />
      </section>
    </main>
  );
}
