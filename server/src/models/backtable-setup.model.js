const mongoose = require('mongoose');

const PhotoSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    contentType: { type: String, required: true },
    data: { type: Buffer, required: true }
  },
  { _id: true }
);

const BacktableSetupSchema = new mongoose.Schema(
  {
    caseName: { type: String, required: true, trim: true },
    surgeonName: { type: String, default: '', trim: true },

    gownsAndGloves: [{ type: String }],
    drapes: [{ type: String }],
    instrumentTrays: [{ type: String }],
    medications: [{ type: String }],

    photos: [PhotoSchema]
  },
  { timestamps: true }
);

module.exports = mongoose.model('BacktableSetup', BacktableSetupSchema);
