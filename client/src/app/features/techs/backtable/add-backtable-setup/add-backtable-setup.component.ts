/*
import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Router, RouterLink } from '@angular/router';

import { BacktableSetupService } from "../../../../core/services/backtable-setup.service";

@Component({
    selector: 'app-add-backtable-setup',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterLink],
    templateUrl: './add-backtable-setup.component.html',
    styleUrls: ['./add-backtable-setup.component.scss']
})

export class AddBacktableSetupComponent {
    saving = false;
    error = '';

    model = {
        caseName: '',
        surgeonName: '',
        gownsAndGlovesText: '',
        drapesText: '',
        instrumentTraysText: '',
        medicationsText: ''
    };

    // ✅ actual File objects to send to backend
    files: File[] = [];

    // ✅ local preview URLs (not stored)
    previews: { name: string; url: string }[] = [];

    constructor(
        private router: Router,
        private backtable: BacktableSetupService
    ) {}

    onFileSelected(input: HTMLInputElement) {
        const list = input.files;
        if (!list || list.length === 0) return;

        Array.from(list).forEach(file => {
            this.files.push(file);
            const url = URL.createObjectURL(file);
            this.previews.push({ name: file.name, url });
        });

        input.value = '';
    }

    removeFile(i: number) {
        const preview = this.previews[i];
        if (preview?.url) URL.revokeObjectURL(preview.url);

        this.previews.splice(i, 1);
        this.files.splice(i, 1);
    }

    cancel() {
        this.router.navigate(['/techs']);
    }

    submit() {
        this.error = '';

        const caseName = this.model.caseName.trim();
        if (!caseName) {
            this.error = 'Case name is required.';
            return;
        }

        const payload = {
            caseName,
            surgeonName: this.model.surgeonName.trim(),
            gownsAndGloves: this.toLines(this.model.gownsAndGlovesText),
            drapes: this.toLines(this.model.drapesText),
            instrumentTrays: this.toLines(this.model.instrumentTraysText),
            medications: this.toLines(this.model.medicationsText)
        };

        this.saving = true;

        this.backtable.create(payload, this.files).subscribe({
            next: () => {
                this.saving = false;
                this.router.navigate(['/techs']);
            },
            error: (err) => {
                this.saving = false;
                this.error = err?.error?.message || 'Failed to save back table setup.';
            }
        });
    }

    private toLines(text: string): string[] {
        return (text || '')
            .split('/n')
            .map(s => s.trim())
            .filter(Boolean);
    }
    
}
*/

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { BacktableSetupService } from '../../../../core/services/backtable-setup.service';

@Component({
  selector: 'app-add-backtable-setup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './add-backtable-setup.component.html',
  styleUrls: ['./add-backtable-setup.component.scss']
})
export class AddBacktableSetupComponent {
  saving = false;
  error = '';

  // These match the form fields in the HTML
  model = {
    caseName: '',
    surgeonName: ''
  };

  // These match the textarea ngModels in the HTML
  gownsAndGlovesText = '';
  drapesText = '';
  instrumentTraysText = '';
  medicationsText = '';

  // File UI in the HTML expects selectedFiles
  selectedFiles: File[] = [];

  // Optional: previews (if you want them later)
  previews: { name: string; url: string }[] = [];

  constructor(
    private router: Router,
    private backtable: BacktableSetupService
  ) {}

  // ✅ Matches HTML: (change)="onFilesSelected($event)"
  onFilesSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const list = input.files;

    if (!list || list.length === 0) return;

    Array.from(list).forEach(file => {
      this.selectedFiles.push(file);

      // Optional preview URL
      const url = URL.createObjectURL(file);
      this.previews.push({ name: file.name, url });
    });

    // allow selecting the same file again later
    input.value = '';
  }

  removeFile(i: number) {
    const preview = this.previews[i];
    if (preview?.url) URL.revokeObjectURL(preview.url);

    this.previews.splice(i, 1);
    this.selectedFiles.splice(i, 1);
  }

  cancel() {
    this.router.navigate(['/techs/backtable']);
  }

  submit() {
    this.error = '';

    const caseName = (this.model.caseName || '').trim();
    if (!caseName) {
      this.error = 'Case name is required.';
      return;
    }

    const payload = {
      caseName,
      surgeonName: (this.model.surgeonName || '').trim(),
      gownsAndGloves: this.toLines(this.gownsAndGlovesText),
      drapes: this.toLines(this.drapesText),
      instrumentTrays: this.toLines(this.instrumentTraysText),
      medications: this.toLines(this.medicationsText)
    };

    this.saving = true;

    this.backtable.create(payload, this.selectedFiles).subscribe({
      next: () => {
        this.saving = false;
        this.router.navigate(['/techs/backtable']);
      },
      error: (err) => {
        this.saving = false;
        this.error = err?.error?.message || 'Failed to save back table setup.';
      }
    });
  }

  private toLines(text: string): string[] {
    return (text || '')
      .split('\n') // ✅ correct newline split
      .map(s => s.trim())
      .filter(Boolean);
  }
}
