import { useState } from "react";
import { Link } from "@remix-run/react";

// Mock data for demonstration
const mockOrders = [
  { id: 1, type: "buy", token: "SOL", amount: 5, price: 200, status: "completed" },
  { id: 2, type: "sell", token: "RAY", amount: 20, price: 5, status: "open" },
];

export default function Orders() {
  const [orders] = useState(mockOrders);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Place New Order</h2>
        {/* Add order placement form here */}
        <p>Order placement form coming soon...</p>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">Order History</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <th className="border p-2">Type</th>
              <th className="border p-2">Token</th>
              <th className="border p-2">Amount</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="border p-2">{order.type}</td>
                <td className="border p-2">{order.token}</td>
                <td className="border p-2">{order.amount}</td>
                <td className="border p-2">${order.price}</td>
                <td className="border p-2">{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Link to="/" className="mt-4 inline-block text-purple-600 hover:underline">Back to Home</Link>
    </div>
  );
}