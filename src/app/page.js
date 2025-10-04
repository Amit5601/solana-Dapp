"use client";

import { useState, useEffect } from "react";
import { Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export default function Home() {
  const { publicKey } = useWallet();
  const [address, setAddress] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [endpoint, setEndpoint] = useState("https://api.mainnet-beta.solana.com");

  // Fetch balance automatically when wallet connects
  useEffect(() => {
    if (publicKey) fetchBalance(publicKey.toBase58());
  }, [publicKey]);

  const fetchBalance = async (walletAddress) => {
    try {
      const connection = new Connection(endpoint);
      const pubKey = new PublicKey(walletAddress);
      const balance = await connection.getBalance(pubKey);
      setBalance(balance / LAMPORTS_PER_SOL);
    } catch (err) {
      console.error("Balance fetch error:", err);
      setBalance(null);
    }
  };

  const fetchTransactions = async () => {
    const walletAddr = address || publicKey?.toBase58();
    if (!walletAddr) {
      alert("Please enter a wallet address or connect your wallet!");
      return;
    }

    try {
      setLoading(true);
      const connection = new Connection(endpoint);
      const pubKey = new PublicKey(walletAddr);
      const sigs = await connection.getSignaturesForAddress(pubKey, { limit: 10 });
      setTransactions(sigs);
      fetchBalance(walletAddr);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch transactions.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 min-h-screen bg-zinc-900 text-white">
      <h1 className="text-4xl font-bold mb-4">Solana Wallet Dashboard</h1>

      {/* Network Selector */}
      <div className="flex items-center gap-3 mb-6">
        <label className="text-gray-300 font-medium">Network:</label>
        <select
          value={endpoint}
          onChange={(e) => setEndpoint(e.target.value)}
          className="text-black rounded px-3 py-2"
        >
          <option value="https://api.mainnet-beta.solana.com">Mainnet</option>
          <option value="https://api.devnet.solana.com">Devnet</option>
        </select>
      </div>

      {/* Wallet Section */}
      <div className="flex flex-wrap gap-3 justify-center items-center mb-8">
        <WalletMultiButton />
        <input
          type="text"
          placeholder="Enter Solana wallet address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="text-black px-3 py-2 rounded w-80"
        />
        <button
          onClick={fetchTransactions}
          className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded font-semibold"
        >
          {loading ? "Fetching..." : "Fetch Transactions"}
        </button>
      </div>

      {/* Balance Card */}
      <div className="mb-8 bg-zinc-800 p-4 rounded-lg shadow-md w-full max-w-md text-center">
        {publicKey || address ? (
          <>
            <h2 className="text-xl font-semibold mb-2">Wallet Balance</h2>
            {balance !== null ? (
              <p className="text-2xl font-bold text-green-400">{balance.toFixed(4)} SOL</p>
            ) : (
              <p className="text-gray-400">Fetching balance...</p>
            )}
          </>
        ) : (
          <p className="text-gray-400">Connect or enter a wallet to see balance.</p>
        )}
      </div>

      {/* Transactions */}
      <div className="w-full max-w-3xl bg-zinc-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-4 border-b border-gray-700 pb-2">
          Recent Transactions
        </h2>
        {transactions.length === 0 ? (
          <p className="text-gray-400">No transactions found.</p>
        ) : (
          <ul className="space-y-3">
            {transactions.map((tx) => (
              <li
                key={tx.signature}
                className="bg-zinc-700 rounded-lg px-4 py-3 hover:bg-zinc-600 transition"
              >
                <p>
                  <span className="text-purple-400 font-semibold">Signature:</span>{" "}
                  {tx.signature}
                </p>
                <p className="text-gray-400 text-sm mb-2">Slot: {tx.slot}</p>
                <a
                  href={`https://solscan.io/tx/${tx.signature}?cluster=${endpoint.includes("devnet") ? "devnet" : "mainnet"}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-400 hover:underline text-sm"
                >
                  🔗 View on Solscan
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
