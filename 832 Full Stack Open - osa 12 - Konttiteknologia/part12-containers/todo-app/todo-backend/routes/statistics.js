const express = require('express');
const { getAsync } = require('../redis');
const router = express.Router();

router.get('/', async (req, res) => {
  let count = await getAsync('added_todos');
  count = count ? parseInt(count) : 0;

  res.json({ added_todos: count });
});

module.exports = router;
