export interface Item {
  name: string;
  notes?: string;
  qty?: number;
}

export interface Procedure {
  id: string;
  name: string;
  service: string;
  position?: string;
  anesthesia?: string;
  roomSetup?: string[];
  drapes?: Item[];
  instruments?: Item[];
  supplies?: Item[];
  medications?: Item[];
  sutures?: Item[];
  dressings?: Item[];
  notes?: string[];
  tags?: string[];
}
