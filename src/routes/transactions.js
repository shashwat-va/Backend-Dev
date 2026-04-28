const express = require('express');
const router = express.Router();
const logger = require('../logger');

const sampleTransactions = [
  { id: 'txn-001', amount: 320.5, currency: 'USD', status: 'completed' },
  { id: 'txn-002', amount: 1025.75, currency: 'EUR', status: 'pending' }
];

router.get('/', (req, res) => {
  res.json({ environment: process.env.NODE_ENV || 'development', transactions: sampleTransactions });
});

router.post('/', (req, res) => {
  const { amount, currency } = req.body;
  if (typeof amount !== 'number' || typeof currency !== 'string') {
    return res.status(400).json({ error: 'Invalid transaction payload' });
  }

  const newTransaction = {
    id: `txn-${Date.now()}`,
    amount,
    currency,
    status: 'processing',
    createdAt: new Date().toISOString()
  };

  logger.info('Created transaction', { transactionId: newTransaction.id, environment: process.env.NODE_ENV });
  res.status(201).json({ transaction: newTransaction });
});

module.exports = router;
