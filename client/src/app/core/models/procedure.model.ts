export interface Item {
  name: string;

  // optional extras used in various parts of the UI
  qty?: number | string;   // e.g. "2", 3, etc.
  notes?: string;          // extra info per item

  // for meds/sutures (even if not always used, keep them optional)
  dose?: string;           // e.g. "1g", "10mg"
  route?: string;          // e.g. "IV", "PO"
  size?: string;           // e.g. "0", "3-0", "4-0"
}

export interface Procedure {
  id?: string;
  _id?: string;

  name: string;
  service: string;
  position?: string;
  anesthesia?: string;     // <-- this is what the templates are using

  tags?: string[];

  roomSetup?: string[];

  // these were string[] originally, but your add-procedure logic
  // is sometimes giving them Item[] — make the type flexible:
  drapes?: (string | Item)[];

  instruments?: Item[];
  supplies?: Item[];
  medications?: Item[];
  sutures?: Item[];

  // same deal here: allow either plain strings or Item-shaped data
  dressings?: (string | Item)[];
  notes?: string[];
}
