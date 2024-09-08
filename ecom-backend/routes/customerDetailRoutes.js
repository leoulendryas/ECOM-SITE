const express = require('express');
const router = express.Router();
const customerDetailController = require('../controllers/customerDetailController');

// Customer Detail routes
router.post('/', customerDetailController.createCustomerDetail);
router.get('/:user_id', customerDetailController.getCustomerDetailsByUserId);
router.put('/:id', customerDetailController.updateCustomerDetail);
router.delete('/:id', customerDetailController.deleteCustomerDetail);

module.exports = router;
