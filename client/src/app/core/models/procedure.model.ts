export interface Item {
  name: string;

  // Optional extra info depending on context
  dose?: string;       // meds
  route?: string;      // meds
  size?: string;       // sutures
  qty?: number | string; // instruments/supplies quantity if you ever need it
  notes?: string;      // extra notes per item
}

export interface Procedure {
  id?: string;
  _id?: string;

  name: string;
  service: string;
  position?: string;
  anesthesia?: string;

  tags?: string[];

  roomSetup?: string[];
  drapes?: string[];

  instruments?: Item[];
  supplies?: Item[];
  medications?: Item[];
  sutures?: Item[];

  dressings?: string[];
  notes?: string[];
}
