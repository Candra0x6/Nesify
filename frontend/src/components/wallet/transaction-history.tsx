"use client"

import { motion } from "framer-motion"
import { ArrowUpRight, ArrowDownLeft, Gift, ExternalLink, Search, Filter, Calendar } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

interface Transaction {
  id: string
  type: "purchase" | "sale" | "reward"
  title: string
  date: string
  amount: string
  currency: string
  status: "completed" | "pending" | "failed"
  image?: string
  txHash?: string
}

interface TransactionHistoryProps {
  transactions: Transaction[]
}

export default function TransactionHistory({ transactions }: TransactionHistoryProps) {
  const [activeFilter, setActiveFilter] = useState<"all" | "purchases" | "sales" | "rewards">("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredTransactions = transactions.filter((transaction) => {
    // Filter by type
    if (activeFilter === "purchases" && transaction.type !== "purchase") return false
    if (activeFilter === "sales" && transaction.type !== "sale") return false
    if (activeFilter === "rewards" && transaction.type !== "reward") return false

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        transaction.title.toLowerCase().includes(query) ||
        transaction.amount.toLowerCase().includes(query) ||
        transaction.currency.toLowerCase().includes(query)
      )
    }

    return true
  })

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "purchase":
        return <ArrowUpRight className="w-5 h-5 text-rose-400" />
      case "sale":
        return <ArrowDownLeft className="w-5 h-5 text-emerald-400" />
      case "reward":
        return <Gift className="w-5 h-5 text-amber-400" />
      default:
        return <ArrowUpRight className="w-5 h-5 text-rose-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-emerald-500"
      case "pending":
        return "bg-amber-500"
      case "failed":
        return "bg-rose-500"
      default:
        return "bg-emerald-500"
    }
  }

  return (
    <div className="bg-gradient-to-br from-white/[0.05] to-transparent backdrop-blur-sm border border-white/[0.08] rounded-xl p-6">
      <h2 className="text-xl font-bold text-white mb-6">Transaction History</h2>

      <div className="mb-6 space-y-4">
        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-white/40" />
            </div>
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white/[0.03] border border-white/[0.08] rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
            />
          </div>

          <div className="flex items-center gap-2">
            <div className="bg-white/[0.03] border border-white/[0.08] rounded-lg p-1 flex">
              <button
                onClick={() => setActiveFilter("all")}
                className={`px-3 py-1 rounded text-sm ${
                  activeFilter === "all"
                    ? "bg-gradient-to-r from-indigo-500 to-rose-500 text-white"
                    : "text-white/60 hover:text-white"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setActiveFilter("purchases")}
                className={`px-3 py-1 rounded text-sm ${
                  activeFilter === "purchases"
                    ? "bg-gradient-to-r from-indigo-500 to-rose-500 text-white"
                    : "text-white/60 hover:text-white"
                }`}
              >
                Purchases
              </button>
              <button
                onClick={() => setActiveFilter("sales")}
                className={`px-3 py-1 rounded text-sm ${
                  activeFilter === "sales"
                    ? "bg-gradient-to-r from-indigo-500 to-rose-500 text-white"
                    : "text-white/60 hover:text-white"
                }`}
              >
                Sales
              </button>
              <button
                onClick={() => setActiveFilter("rewards")}
                className={`px-3 py-1 rounded text-sm ${
                  activeFilter === "rewards"
                    ? "bg-gradient-to-r from-indigo-500 to-rose-500 text-white"
                    : "text-white/60 hover:text-white"
                }`}
              >
                Rewards
              </button>
            </div>

            <button className="p-2 bg-white/[0.03] border border-white/[0.08] rounded-lg text-white/60 hover:text-white">
              <Calendar className="w-4 h-4" />
            </button>

            <button className="p-2 bg-white/[0.03] border border-white/[0.08] rounded-lg text-white/60 hover:text-white">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {filteredTransactions.length > 0 ? (
        <div className="space-y-4">
          {filteredTransactions.map((transaction) => (
            <motion.div
              key={transaction.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] rounded-xl p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="bg-white/[0.03] rounded-full w-10 h-10 flex items-center justify-center">
                  {getTransactionIcon(transaction.type)}
                </div>

                <div>
                  <h3 className="font-medium text-white">{transaction.title}</h3>
                  <div className="flex items-center gap-2 text-white/60 text-sm">
                    <span>{transaction.date}</span>
                    <div className={`w-1.5 h-1.5 rounded-full ${getStatusColor(transaction.status)}`} />
                    <span>{transaction.status}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div
                    className={`font-medium ${
                      transaction.type === "purchase"
                        ? "text-rose-400"
                        : transaction.type === "sale"
                          ? "text-emerald-400"
                          : "text-amber-400"
                    }`}
                  >
                    {transaction.type === "purchase" ? "-" : "+"}
                    {transaction.amount} {transaction.currency}
                  </div>

                  {transaction.txHash && (
                    <button
                      onClick={() => window.open(`https://etherscan.io/tx/${transaction.txHash}`, "_blank")}
                      className="text-white/40 hover:text-white/60 text-xs flex items-center gap-1 ml-auto"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>View Transaction</span>
                    </button>
                  )}
                </div>

                {transaction.image && (
                  <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={transaction.image || "/placeholder.svg"}
                      alt={transaction.title}
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] rounded-xl p-6 text-center">
          <div className="bg-white/[0.03] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-8 h-8 text-white/40" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">No Transactions Found</h3>
          <p className="text-white/60">
            {searchQuery
              ? "No transactions match your search criteria. Try a different search term."
              : "You don't have any transactions yet. Purchase a ticket to get started."}
          </p>
        </div>
      )}
    </div>
  )
}

