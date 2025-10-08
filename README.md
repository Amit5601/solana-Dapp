# 🪙 Solana Wallet Dashboard  

A simple, lightweight dApp built with **Next.js** and **Solana Web3.js**, allowing users to:  
- Connect their Solana wallet  
- View wallet balance  
- Check recent transactions  
- Switch between Mainnet, Devnet, and Testnet  

Built as part of the **100xSchool × Superteam Solana Hackathon** 🚀  

---

## 🌐 Live Demo  
Once deployed, the app will be available here:  
👉 [https://solana-dapp-coral.vercel.app/](https://solana-dapp-coral.vercel.app/)
*(If you’re running locally, see instructions below.)*

---

## ⚡ Features  
- 🔗 Connect Solana wallets.  
- 💰 Fetch and display wallet balance.
- 📜 View recent transaction history. 
- 🧠 Built with React hooks and Solana web3.js.
- 💅 built with TailwindCSS for a clean, fast, and focused user experience.
- ☁️ Deployed via Vercel.  

---

## 🧰 Tech Stack  
| Layer | Tools Used |
|-------|-------------|
| **Frontend** | Next.js (App Router) |
| **Blockchain SDK** | @solana/web3.js |
| **Wallet Integration** | @solana/wallet-adapter-react, Phantom, Solflare |
| **Styling** | Tailwind CSS |
| **Deployment** | Vercel |

---

## 🚀 Getting Started (Run Locally)

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Amit5601/solana-Dapp.git
cd solana-Dapp
npm install
npm run dev
Then open your browser and visit 👉 [http://localhost:3000]

---

## 💡 How It Works  

🔹 **Step 1:** User connects wallet → Phantom/Solflare adapter authenticates the wallet.  
🔹 **Step 2:** `@solana/web3.js` connects to the chosen network (**Mainnet**, **Devnet**, or **Testnet**).  
🔹 **Step 3:** The dApp fetches the wallet’s balance and transaction history.  
🔹 **Step 4:** Data is displayed dynamically using React hooks and state.  

---

