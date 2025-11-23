// server/src/routes/procedures.routes.js
/*
const express = require('express');
const Procedure = require('../models/procedure.model');

const router = express.Router();

// GET /api/procedures
router.get('/', async (req, res) => {
  try {
    const procedures = await Procedure.find().sort({ name: 1 });
    res.json(procedures);
  } catch (err) {
    console.error('Error fetching procedures', err);
    res.status(500).json({ message: 'Failed to fetch procedures' });
  }
});

// GET /api/procedures/:id
router.get('/:id', async (req, res) => {
  try {
    const proc = await Procedure.findById(req.params.id);
    if (!proc) {
      return res.status(404).json({ message: 'Procedure not found' });
    }
    res.json(proc);
  } catch (err) {
    console.error('Error fetching procedure', err);
    res.status(500).json({ message: 'Failed to fetch procedure' });
  }
});

// POST /api/procedures
router.post('/', async (req, res) => {
  try {
    const proc = new Procedure(req.body);
    const saved = await proc.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error('Error creating procedure', err);
    res.status(400).json({ message: 'Failed to create procedure', error: err.message });
  }
});

// PUT /api/procedures/:id
router.put('/:id', async (req, res) => {
  try {
    const updated = await Procedure.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Procedure not found' });
    }

    res.json(updated);
  } catch (err) {
    console.error('Error updating procedure', err);
    res.status(400).json({ message: 'Failed to update procedure', error: err.message });
  }
});

// DELETE /api/procedures/:id
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Procedure.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Procedure not found' });
    }
    res.status(204).send();
  } catch (err) {
    console.error('Error deleting procedure', err);
    res.status(500).json({ message: 'Failed to delete procedure' });
  }
});

module.exports = router;
*

// server/src/routes/procedures.routes.js
const express = require('express');
const Procedure = require('../models/procedure.model');

const router = express.Router();

// GET /api/procedures
router.get('/', async (req, res) => {
  try {
    const procedures = await Procedure.find().sort({ name: 1 });
    res.json(procedures);
  } catch (err) {
    console.error('Error fetching procedures', err);
    res.status(500).json({ message: 'Failed to fetch procedures' });
  }
});

// GET /api/procedures/:id
router.get('/:id', async (req, res) => {
  try {
    const proc = await Procedure.findById(req.params.id);
    if (!proc) {
      return res.status(404).json({ message: 'Procedure not found' });
    }
    res.json(proc);
  } catch (err) {
    console.error('Error fetching procedure', err);
    res.status(500).json({ message: 'Failed to fetch procedure' });
  }
});

// POST /api/procedures
router.post('/', async (req, res) => {
  try {
    console.log('Incoming create body:', JSON.stringify(req.body, null, 2));

    const proc = new Procedure(req.body);
    const saved = await proc.save();

    res.status(201).json(saved);
  } catch (err) {
    console.error('Error creating procedure', err);
    res
      .status(400)
      .json({ message: 'Failed to create procedure', error: err.message });
  }
});

// PUT /api/procedures/:id
router.put('/:id', async (req, res) => {
  try {
    console.log('Incoming update body:', JSON.stringify(req.body, null, 2));

    const updated = await Procedure.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        // you *can* turn this back on later, but it can cause 400s if data is loose
        runValidators: false
      }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Procedure not found' });
    }

    res.json(updated);
  } catch (err) {
    console.error('Error updating procedure', err);
    res
      .status(400)
      .json({ message: 'Failed to update procedure', error: err.message });
  }
});

// DELETE /api/procedures/:id
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Procedure.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Procedure not found' });
    }
    res.status(204).send();
  } catch (err) {
    console.error('Error deleting procedure', err);
    res.status(500).json({ message: 'Failed to delete procedure' });
  }
});

module.exports = router;
*/

// server/src/routes/procedures.routes.js
const express = require('express');
const Procedure = require('../models/procedure.model');

const router = express.Router();

// GET /api/procedures
router.get('/', async (req, res) => {
  try {
    const procedures = await Procedure.find().sort({ name: 1 }).lean();
    res.json(procedures);
  } catch (err) {
    console.error('❌ Error fetching procedures:', err);
    res.status(500).json({ message: 'Failed to fetch procedures' });
  }
});

// GET /api/procedures/:id
router.get('/:id', async (req, res) => {
  try {
    const proc = await Procedure.findById(req.params.id).lean();
    if (!proc) {
      return res.status(404).json({ message: 'Procedure not found' });
    }
    res.json(proc);
  } catch (err) {
    console.error('❌ Error fetching procedure by id:', err);
    res.status(500).json({ message: 'Failed to fetch procedure' });
  }
});

// POST /api/procedures
router.post('/', async (req, res) => {
  try {
    console.log('➡️ Create procedure body:', JSON.stringify(req.body, null, 2));

    const data = req.body || {};

    // Minimal required fields
    if (!data.name || !data.service) {
      return res.status(400).json({
        message: 'Name and service are required',
        received: data
      });
    }

    const proc = new Procedure(data);
    const saved = await proc.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error('❌ Error creating procedure:', err);
    res.status(400).json({
      message: 'Invalid procedure data',
      error: err.message || String(err)
    });
  }
});

// PUT /api/procedures/:id
router.put('/:id', async (req, res) => {
  try {
    console.log('➡️ Update procedure id:', req.params.id);
    const data = req.body || {};

    const updated = await Procedure.findByIdAndUpdate(
      req.params.id,
      data,
      { new: true, runValidators: false }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Procedure not found' });
    }

    res.json(updated);
  } catch (err) {
    console.error('❌ Error updating procedure:', err);
    res.status(400).json({
      message: 'Invalid update data',
      error: err.message || String(err)
    });
  }
});

// DELETE /api/procedures/:id
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Procedure.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Procedure not found' });
    }
    res.status(204).send();
  } catch (err) {
    console.error('❌ Error deleting procedure:', err);
    res.status(500).json({ message: 'Failed to delete procedure' });
  }
});

module.exports = router;
