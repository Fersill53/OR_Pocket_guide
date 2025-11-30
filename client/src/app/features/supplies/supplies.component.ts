import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Supply {
  id: string;
  name: string;
  category: string;
  altNames?: string[];
  description: string;
  imageUrl: string;
  notes?: string;
}

@Component({
  selector: 'app-supplies',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './supplies.component.html',
  styleUrls: ['./supplies.component.scss']
})
export class SuppliesComponent {
  // 🔹 You can tweak / expand this list as you like
  supplies: Supply[] = [
    {
      id: 'lap-sponges',
      name: 'Laparotomy Sponges (Laps)',
      category: 'Soft Goods',
      altNames: ['Laps', 'Lap sponges'],
      description:
        'Large, radiopaque sponges used for open abdominal cases. Usually come in packs of 5.',
      imageUrl: 'assets/supplies/lap-sponges.jpg',
      notes: 'Counted item. Always track on the board and with circulator.'
    },
    {
      id: 'raytecs',
      name: 'Ray-Tec Sponges',
      category: 'Soft Goods',
      altNames: ['Raytecs', '4x4s'],
      description:
        'Smaller radiopaque sponges used for general, ENT, plastics and minor procedures.',
      imageUrl: 'assets/supplies/raytecs.jpg',
      notes: 'Counted when used on field; can be non-count when used as dressings.'
    },
    {
      id: 'esmark',
      name: 'Esmarch Bandage',
      category: 'Tourniquets / Wraps',
      altNames: ['Esmark'],
      description:
        'Elastic bandage used to exsanguinate the limb prior to inflating the tourniquet.',
      imageUrl: 'assets/supplies/esmarch.jpg',
      notes: 'Roll from distal to proximal; keep smooth to avoid skin damage.'
    },
    {
      id: 'ioban',
      name: 'Ioban Drapes',
      category: 'Drapes',
      altNames: ['Ioban', 'Iodine drape'],
      description:
        'Adhesive antimicrobial drape placed over the prepped site to reduce bacterial load.',
      imageUrl: 'assets/supplies/ioban.jpg',
      notes: 'Apply after prep is completely dry to avoid skin irritation.'
    }
  ];

  // In the future we could add search/filter here
}
