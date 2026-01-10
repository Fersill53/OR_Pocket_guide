const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');

const BacktableSetup = require('../models/backtable-setup.model');

const router = express.Router();
const { isValidObjectId } = mongoose;

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    files: 12,
    fileSize: 5 * 1024 * 1024 // 5MB per file
  }
});

// Helper: Convert doc to API shape with photo URLs
function toDto(req, doc) {
  const base = `${req.protocol}://${req.get('host')}`;
  const d = doc.toObject ? doc.toObject() : doc;

  const photos = (d.photos || []).map(p => ({
    id: String(p._id),
    name: p.name,
    contentType: p.contentType,
    url: `${base}/api/backtable-setups/${d._id}/photos/${p._id}`
  }));

  return {
    id: String(d._id),
    caseName: d.caseName,
    surgeonName: d.surgeonName || '',
    gownsAndGloves: d.gownsAndGloves || [],
    drapes: d.drapes || [],
    instrumentTrays: d.instrumentTrays || [],
    medications: d.medications || [],
    photos,
    createdAt: d.createdAt,
    updatedAt: d.updatedAt
  };
}

// GET /api/backtable-setups
router.get('/', async (req, res) => {
  try {
    const docs = await BacktableSetup.find().sort({ createdAt: -1 }).lean();
    // lean() removes buffers in a safe way but includes them — don't return them.
    // Re-fetch without photo buffers by projecting photos.data out:
    const projected = await BacktableSetup.find()
      .select('-photos.data')
      .sort({ createdAt: -1 });

    res.json(projected.map(d => toDto(req, d)));
  } catch (err) {
    console.error('❌ Error fetching backtable setups:', err);
    res.status(500).json({ message: 'Failed to fetch backtable setups' });
  }
});

// GET /api/backtable-setups/:id
router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    if (!isValidObjectId(id)) return res.status(400).json({ message: 'Invalid id' });

    const doc = await BacktableSetup.findById(id).select('-photos.data');
    if (!doc) return res.status(404).json({ message: 'Backtable setup not found' });

    res.json(toDto(req, doc));
  } catch (err) {
    console.error('❌ Error fetching backtable setup:', err);
    res.status(500).json({ message: 'Failed to fetch backtable setup' });
  }
});

// GET /api/backtable-setups/:id/photos/:photoId  (serves actual image bytes)
router.get('/:id/photos/:photoId', async (req, res) => {
  try {
    const { id, photoId } = req.params;
    if (!isValidObjectId(id) || !isValidObjectId(photoId)) {
      return res.status(400).json({ message: 'Invalid id' });
    }

    const doc = await BacktableSetup.findById(id);
    if (!doc) return res.status(404).json({ message: 'Backtable setup not found' });

    const photo = doc.photos.id(photoId);
    if (!photo) return res.status(404).json({ message: 'Photo not found' });

    res.setHeader('Content-Type', photo.contentType);
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    res.send(photo.data);
  } catch (err) {
    console.error('❌ Error serving photo:', err);
    res.status(500).json({ message: 'Failed to serve photo' });
  }
});

// POST /api/backtable-setups  (multipart/form-data: payload + photos[])
router.post('/', upload.array('photos', 12), async (req, res) => {
  try {
    // payload is JSON string from the client
    const payloadRaw = req.body.payload;
    const payload = payloadRaw ? JSON.parse(payloadRaw) : {};

    const photos = (req.files || []).map(f => ({
      name: f.originalname,
      contentType: f.mimetype,
      data: f.buffer
    }));

    const doc = new BacktableSetup({
      caseName: (payload.caseName || '').trim(),
      surgeonName: (payload.surgeonName || '').trim(),
      gownsAndGloves: payload.gownsAndGloves || [],
      drapes: payload.drapes || [],
      instrumentTrays: payload.instrumentTrays || [],
      medications: payload.medications || [],
      photos
    });

    const saved = await doc.save();
    const dto = toDto(req, saved);
    res.status(201).json(dto);
  } catch (err) {
    console.error('❌ Error creating backtable setup:', err);
    res.status(400).json({ message: 'Invalid backtable setup data', error: err.message || String(err) });
  }
});

// DELETE /api/backtable-setups/:id
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    if (!isValidObjectId(id)) return res.status(400).json({ message: 'Invalid id' });

    const deleted = await BacktableSetup.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Backtable setup not found' });

    res.status(204).send();
  } catch (err) {
    console.error('❌ Error deleting backtable setup:', err);
    res.status(500).json({ message: 'Failed to delete backtable setup' });
  }
});

module.exports = router;
