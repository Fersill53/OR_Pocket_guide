// server/src/models/procedure.model.js
const mongoose = require('mongoose');

const instrumentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    notes: { type: String }
  },
  { _id: false }
);

const supplySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    notes: { type: String }
  },
  { _id: false }
);

const medicationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    dose: { type: String },
    route: { type: String },
    notes: { type: String }
  },
  { _id: false }
);

const sutureSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    size: { type: String },
    notes: { type: String }
  },
  { _id: false }
);

const procedureSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    service: { type: String, required: true },       // e.g. Ortho, General, Spine
    tags: [{ type: String }],

    // Text / array fields you already use
    roomSetup: [{ type: String }],
    drapes: [{ type: String }],
    dressings: [{ type: String }],
    notes: [{ type: String }],

    instruments: [instrumentSchema],
    supplies: [supplySchema],
    medications: [medicationSchema],
    sutures: [sutureSchema]
  },
  {
    timestamps: true
  }
);

// Transform _id -> id for frontend compatibility
procedureSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  }
});

const Procedure = mongoose.model('Procedure', procedureSchema);

module.exports = Procedure;
