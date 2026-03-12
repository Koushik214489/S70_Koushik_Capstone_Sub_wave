const express = require('express');
const {
  getSubscriptions,
  addSubscription,
  updateSubscription,
  deleteSubscription,
  syncEmails
} = require('../controllers/subscriptionController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();
router.use(protect);

router.get('/', getSubscriptions);
router.post('/', addSubscription);
router.put('/:id', updateSubscription);
router.delete('/:id', deleteSubscription);
router.post('/sync', syncEmails);

module.exports = router;
