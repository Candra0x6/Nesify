import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting seed process...");

  // Create levels
  const levels = [
    {
      levelNumber: 1,
      xpThreshold: 0,
      rewardName: "🎟️ NFT Newbie",
      rewardDescription:
        "Welcome to Nesify! You've taken your first step into the world of NFT ticketing. 🚀",
      rewardValue: 5,
    },
    {
      levelNumber: 2,
      xpThreshold: 100,
      rewardName: "🌍 Blockchain Explorer",
      rewardDescription:
        "You're exploring the Nesify ecosystem—keep discovering new events and experiences! 🎫",
      rewardValue: 10,
    },
    {
      levelNumber: 3,
      xpThreshold: 250,
      rewardName: "🎶 Singing Star",
      rewardDescription:
        "You're getting the rhythm! Unlock exclusive NFT-based singing events. 🎤",
      rewardValue: 20,
    },
    {
      levelNumber: 4,
      xpThreshold: 500,
      rewardName: "🔥 NFT Enthusiast",
      rewardDescription:
        "Your dedication is impressive! Enjoy access to limited-edition NFT tickets. 🎟️",
      rewardValue: 25,
    },
    {
      levelNumber: 5,
      xpThreshold: 1000,
      rewardName: "🥈 Silver Ticket Holder",
      rewardDescription:
        "You're halfway to mastery! Your commitment earns you exclusive perks. 🎫",
      rewardValue: 30,
    },
    {
      levelNumber: 6,
      xpThreshold: 2000,
      rewardName: "🎭 Event Insider",
      rewardDescription:
        "A true Nesify fan! Get special access to VIP ticketing and private events. 🏆",
      rewardValue: 40,
    },
    {
      levelNumber: 7,
      xpThreshold: 3500,
      rewardName: "🔷 Polygon Pathfinder",
      rewardDescription:
        "You're mastering the blockchain network—unlocking more ticketing opportunities! 🚀",
      rewardValue: 50,
    },
    {
      levelNumber: 8,
      xpThreshold: 5000,
      rewardName: "🥇 Gold Ticket Status",
      rewardDescription:
        "You've reached an elite level! Enjoy priority access to top events. 🎭",
      rewardValue: 60,
    },
    {
      levelNumber: 9,
      xpThreshold: 7500,
      rewardName: "🚀 Web3 Visionary",
      rewardDescription:
        "You're shaping the future of NFT ticketing! Exclusive experiences await. 🌟",
      rewardValue: 70,
    },
    {
      levelNumber: 10,
      xpThreshold: 10000,
      rewardName: "👑 Nesify Legend",
      rewardDescription:
        "The highest honor—you're now a master of NFT ticketing and events. 🎉",
      rewardValue: 80,
    },
  ];

  // Create sample missions
  const missions = [
    {
      name: "✅ Complete Your Profile",
      description:
        "Set up your profile with a username and profile picture. 🖼️",
      xpReward: 50,
      startDate: null,
      endDate: null,
    },
    {
      name: "🔗 First Wallet Connection",
      description: "Connect your wallet to Nesify and get started! 🏦",
      xpReward: 100,
      startDate: null,
      endDate: null,
    },
    {
      name: "👀 Browse NFT Collection",
      description:
        "View at least 5 different NFT tickets in the marketplace. 🎟️",
      xpReward: 75,
      startDate: null,
      endDate: null,
    },
    {
      name: "💬 Join Nesify Discord",
      description:
        "Join our Discord server and link your account for exclusive perks! 🎧",
      xpReward: 150,
      startDate: null,
      endDate: null,
    },
    {
      name: "🐦 Follow Nesify on Twitter",
      description: "Follow our official Twitter account to stay updated. 🔥",
      xpReward: 100,
      startDate: null,
      endDate: null,
    },
    {
      name: "📩 Invite a Friend",
      description:
        "Invite a friend to join Nesify using your referral link. 🤝",
      xpReward: 200,
      startDate: null,
      endDate: null,
    },
    {
      name: "💰 First NFT Ticket Purchase",
      description: "Buy your first NFT ticket for an event on Nesify! 🎫",
      xpReward: 300,
      startDate: null,
      endDate: null,
    },
    {
      name: "🔄 Resell an NFT Ticket",
      description: "Sell an NFT ticket on Nesify's secondary market. 💸",
      xpReward: 250,
      startDate: null,
      endDate: null,
    },
    {
      name: "✅ Validate a Ticket",
      description: "Validate an NFT ticket for an event on Nesify. 🎟️",
      xpReward: 400,
      startDate: null,
      endDate: null,
    },
    {
      name: "🏆 Weekly Challenge: Nesify Pioneers",
      description: "Join this week's exclusive Nesify challenge! 🚀",
      xpReward: 500,
      startDate: new Date(),
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  ];

  // Seed levels
  console.log("Seeding levels...");
  for (const level of levels) {
    // Check if level already exists (to avoid duplicates during multiple seed runs)
    const existingLevel = await prisma.level.findUnique({
      where: { levelNumber: level.levelNumber },
    });

    if (!existingLevel) {
      await prisma.level.create({
        data: level,
      });
      console.log(`Created level ${level.levelNumber}: ${level.rewardName}`);
    } else {
      console.log(`Level ${level.levelNumber} already exists, skipping...`);
    }
  }

  // Seed missions
  console.log("Seeding missions...");
  for (const mission of missions) {
    // Check if mission already exists (by name for simplicity)
    const existingMission = await prisma.mission.findFirst({
      where: { name: mission.name },
    });

    if (!existingMission) {
      await prisma.mission.create({
        data: mission,
      });
      console.log(`Created mission: ${mission.name}`);
    } else {
      console.log(`Mission "${mission.name}" already exists, skipping...`);
    }
  }

  console.log("Seed process completed successfully!");
}

main()
  .catch((e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
