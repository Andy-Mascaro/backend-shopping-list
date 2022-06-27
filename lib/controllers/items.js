const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const Item = require('../models/Item');

module.exports = Router().get('/', authenticate, async (req, res, next) => {
  try {
    const itemList = await Item.getAll(req.user.id);
    res.json(itemList);
  } catch (e) {
    next(e);
  }
});
