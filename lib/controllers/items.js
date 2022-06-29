const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const authorizeItem = require('../middleware/authorizeItem');
const Item = require('../models/Item');

module.exports = Router()
  .get('/', authenticate, async (req, res, next) => {
    try {
      const itemList = await Item.getAll(req.user.id);
      res.json(itemList);
    } catch (e) {
      next(e);
    }
  })

  .post('/', authenticate, async (req, res, next) => {
    try {
      const newItem = await Item.insert({ ...req.body, user_id: req.user.id });
      res.json(newItem);
    } catch (e) {
      next(e);
    }
  })
  .put('/:id', [authenticate, authorizeItem], async (req, res, next) => {
    try {
      const fixItem = await Item.updateById(req.params.id, req.body);
      res.json(fixItem);
    } catch (e) {
      next(e);
    }
  })

  .delete('/:id', [authenticate, authorizeItem], async (req, res, next) => {
    try {
      const remove = await Item.delete(req.params.id);
      res.json(remove);
    } catch (e) {
      next(e);
    }
  });
