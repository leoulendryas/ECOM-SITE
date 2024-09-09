const { models } = require('../config/db');
const CustomerDetail = models.CustomerDetail;

// Create customer detail
exports.createCustomerDetail = async (req, res) => {
  try {
    const detail = await CustomerDetail.create(req.body);
    res.status(201).json(detail);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get customer details by user ID
exports.getCustomerDetailsByUserId = async (req, res) => {
  try {
    const details = await CustomerDetail.findAll({
      where: { user_id: req.params.user_id },
    });
    res.status(200).json(details);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update customer detail
exports.updateCustomerDetail = async (req, res) => {
  try {
    const detail = await CustomerDetail.findByPk(req.params.id);
    if (!detail) {
      return res.status(404).json({ error: 'Customer detail not found' });
    }
    await detail.update(req.body);
    res.status(200).json(detail);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete customer detail
exports.deleteCustomerDetail = async (req, res) => {
  try {
    const detail = await CustomerDetail.findByPk(req.params.id);
    if (!detail) {
      return res.status(404).json({ error: 'Customer detail not found' });
    }
    await detail.destroy();
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
