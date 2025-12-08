import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

type TechsTab = 'education' | 'backtable' | 'mayo';

@Component({
  selector: 'app-techs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './techs.component.html',
  styleUrls: ['./techs.component.scss']
})
export class TechsComponent {
  activeTab: TechsTab = 'education';

  setTab(tab: TechsTab) {
    this.activeTab = tab;
  }

  isActive(tab: TechsTab): boolean {
    return this.activeTab === tab;
  }
}
