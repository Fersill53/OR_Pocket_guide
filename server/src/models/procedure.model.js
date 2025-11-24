// server/src/models/procedure.model.js
/*
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
*

// server/src/models/procedure.model.js
const mongoose = require('mongoose');

const instrumentSchema = new mongoose.Schema(
  {
    name: { type: String },   // no longer required: true
    notes: { type: String }
  },
  { _id: false }
);

const supplySchema = new mongoose.Schema(
  {
    name: { type: String },
    notes: { type: String }
  },
  { _id: false }
);

const medicationSchema = new mongoose.Schema(
  {
    name: { type: String },
    dose: { type: String },
    route: { type: String },
    notes: { type: String }
  },
  { _id: false }
);

const sutureSchema = new mongoose.Schema(
  {
    name: { type: String },
    size: { type: String },
    notes: { type: String }
  },
  { _id: false }
);

const procedureSchema = new mongoose.Schema(
  {
    // keep these, but make them optional at DB layer to avoid 400s
    name: { type: String },
    service: { type: String },

    tags: [{ type: String }],

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
*

// server/src/models/procedure.model.js
const mongoose = require('mongoose');

const InstrumentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }
  },
  { _id: false }
);

const SupplySchema = new mongoose.Schema(
  {
    name: { type: String, required: true }
  },
  { _id: false }
);

const MedicationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    dose: { type: String },
    route: { type: String }
  },
  { _id: false }
);

const SutureSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    size: { type: String }
  },
  { _id: false }
);

const ProcedureSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    service: { type: String, required: true },

    // Optional fields
    position: { type: String },
    roomSetup: [{ type: String }],
    drapes: [{ type: String }],
    instruments: [InstrumentSchema],
    supplies: [SupplySchema],
    medications: [MedicationSchema],
    sutures: [SutureSchema],
    dressings: [{ type: String }],
    notes: [{ type: String }],
    tags: [{ type: String }]
  },
  {
    timestamps: true,
    strict: false // allow extra fields without breaking
  }
);

module.exports = mongoose.model('Procedure', ProcedureSchema);
*/

// server/src/models/procedure.model.js
const mongoose = require('mongoose');

const InstrumentSchema = new mongoose.Schema(
  {
    name: { type: String } // not required
  },
  { _id: false }
);

const SupplySchema = new mongoose.Schema(
  {
    name: { type: String }
  },
  { _id: false }
);

const MedicationSchema = new mongoose.Schema(
  {
    name: { type: String },
    dose: { type: String },
    route: { type: String }
  },
  { _id: false }
);

const SutureSchema = new mongoose.Schema(
  {
    name: { type: String },
    size: { type: String }
  },
  { _id: false }
);

const ProcedureSchema = new mongoose.Schema(
  {
    // Everything optional so saves don't fail
    name: { type: String },
    service: { type: String },
    position: { type: String },
    roomSetup: [{ type: String }],
    drapes: [{ type: String }],
    instruments: [InstrumentSchema],
    supplies: [SupplySchema],
    medications: [MedicationSchema],
    sutures: [SutureSchema],
    dressings: [{ type: String }],
    notes: [{ type: String }],
    tags: [{ type: String }]
  },
  {
    timestamps: true,
    strict: false // allow extra fields from frontend without error
  }
);

module.exports = mongoose.model('Procedure', ProcedureSchema);
