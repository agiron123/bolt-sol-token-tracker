import type { MetaFunction } from "@remix-run/node";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Solana Token Manager" },
    { name: "description", content: "Manage your Solana tokens with ease" },
  ];
};

export default function Index() {
  const { publicKey } = useWallet();

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-purple-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Solana Token Manager</h1>
          <WalletMultiButton />
        </div>
      </header>

      <main className="flex-grow container mx-auto p-4">
        {publicKey ? (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Welcome to your dashboard</h2>
            <nav className="space-x-4">
              <Link to="/portfolio" className="text-purple-600 hover:underline">Portfolio</Link>
              <Link to="/orders" className="text-purple-600 hover:underline">Orders</Link>
            </nav>
            {/* Add more dashboard content here */}
          </div>
        ) : (
          <div className="text-center mt-20">
            <h2 className="text-2xl font-bold mb-4">Connect your wallet to get started</h2>
            <p className="mb-4">Manage your Solana tokens, track your portfolio, and trade with ease.</p>
            <WalletMultiButton />
          </div>
        )}
      </main>

      <footer className="bg-gray-100 dark:bg-gray-800 p-4 text-center">
        <p>&copy; 2023 Solana Token Manager. All rights reserved.</p>
      </footer>
    </div>
  );
}