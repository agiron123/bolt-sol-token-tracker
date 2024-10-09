import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import { Link } from "@remix-run/react";
import { PublicKey } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";

interface TokenAccount {
  mint: string;
  amount: number;
}

interface TokenInfo {
  symbol: string;
  balance: number;
  value: number;
}

export default function Portfolio() {
  const { publicKey } = useWallet();
  const { connection } = useConnection();
  const [tokens, setTokens] = useState<TokenInfo[]>([]);
  const [totalValue, setTotalValue] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTokenAccounts = async (owner: PublicKey) => {
    setIsLoading(true);
    setError(null);
    try {
      const accounts = await connection.getParsedTokenAccountsByOwner(owner, {
        programId: TOKEN_PROGRAM_ID,
      });

      const tokenAccounts: TokenAccount[] = accounts.value.map((account) => ({
        mint: account.account.data.parsed.info.mint,
        amount: account.account.data.parsed.info.tokenAmount.uiAmount,
      }));

      // In a real app, you would fetch token prices here
      const mockPrices: { [key: string]: number } = {
        "So11111111111111111111111111111111111111112": 20, // SOL
        "4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R": 1, // RAY
        "SRMuApVNdxXokk5GT7XD5cUUgXMBCoAz2LHeuAoKWRt": 0.5, // SRM
      };

      const tokenInfos: TokenInfo[] = tokenAccounts.map((account) => ({
        symbol: account.mint.slice(0, 4), // This is a simplification. In a real app, you'd use a token list to get symbols
        balance: account.amount,
        value: account.amount * (mockPrices[account.mint] || 0),
      }));

      setTokens(tokenInfos);
      setTotalValue(tokenInfos.reduce((acc, token) => acc + token.value, 0));
    } catch (err) {
      console.error("Error fetching token accounts:", err);
      setError("Failed to fetch token accounts. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (publicKey) {
      fetchTokenAccounts(publicKey);
    }
  }, [publicKey, connection]);

  if (!publicKey) {
    return (
      <div className="container mx-auto p-4">
        <p>Please connect your wallet to view your portfolio.</p>
        <Link to="/" className="mt-4 inline-block text-purple-600 hover:underline">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Portfolio</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="flex justify-between items-center mb-4">
        <p className="text-lg">Total Value: ${totalValue.toFixed(2)}</p>
        <button
          onClick={() => publicKey && fetchTokenAccounts(publicKey)}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors"
          disabled={isLoading}
        >
          {isLoading ? "Refreshing..." : "Refresh"}
        </button>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      ) : (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {tokens.map((token) => (
            <div key={token.symbol} className="border p-4 rounded shadow">
              <h2 className="text-xl font-semibold">{token.symbol}</h2>
              <p>Balance: {token.balance.toFixed(4)}</p>
              <p>Value: ${token.value.toFixed(2)}</p>
            </div>
          ))}
        </div>
      )}
      <Link to="/" className="mt-8 inline-block text-purple-600 hover:underline">Back to Home</Link>
    </div>
  );
}