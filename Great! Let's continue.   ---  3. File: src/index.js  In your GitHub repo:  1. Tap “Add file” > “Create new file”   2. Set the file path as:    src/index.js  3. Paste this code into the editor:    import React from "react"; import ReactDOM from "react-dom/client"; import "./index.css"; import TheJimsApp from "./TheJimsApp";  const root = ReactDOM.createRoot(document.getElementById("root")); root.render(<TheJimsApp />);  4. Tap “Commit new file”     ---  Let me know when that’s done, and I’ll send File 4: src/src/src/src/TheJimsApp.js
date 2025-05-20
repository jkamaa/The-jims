import React, { useState } from "react";
import { Card, CardContent } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { motion } from "framer-motion";

export default function TheJimsApp() {
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [status, setStatus] = useState("");
  const [history, setHistory] = useState([]);

  const handleSend = () => {
    if (!amount || !recipient) {
      setStatus("Please enter both recipient and amount.");
      return;
    }
    const newTransaction = {
      id: Date.now(),
      recipient,
      amount,
      timestamp: new Date().toLocaleString(),
    };
    setHistory([newTransaction, ...history]);
    setStatus(`Sent $${amount} to ${recipient}`);
    setAmount("");
    setRecipient("");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="text-3xl font-bold text-center mb-6"
      >
        THE JIMS - Instant Payments
      </motion.h1>

      <Card className="max-w-md mx-auto p-4 shadow-xl">
        <CardContent className="space-y-4">
          <Input
            placeholder="Recipient Name or ID"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Amount ($)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <Button onClick={handleSend} className="w-full">
            Send Payment
          </Button>
          {status && <p className="text-green-600 text-sm">{status}</p>}
        </CardContent>
      </Card>

      <div className="max-w-md mx-auto mt-6">
        <h2 className="text-xl font-semibold mb-2">Transaction History</h2>
        <div className="space-y-2">
          {history.map((tx) => (
            <Card key={tx.id} className="p-3 shadow">
              <CardContent className="text-sm">
                Sent <strong>${tx.amount}</strong> to <strong>{tx.recipient}</strong><br />
                <span className="text-gray-500 text-xs">{tx.timestamp}</span>
              </CardContent>
            </Card>
          ))}
          {history.length === 0 && (
            <p className="text-gray-500 text-sm">No transactions yet.</p>
          )}
        </div>
      </div>
    </div>
  );
  }
