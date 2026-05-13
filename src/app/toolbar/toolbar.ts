import { Component, OnDestroy, output, signal, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-toolbar',
  imports: [
    MatToolbarModule,
    MatButtonToggleModule, 
    MatIcon,
    MatLabel,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './toolbar.html',
  styleUrl: './toolbar.scss',
  encapsulation: ViewEncapsulation.None
})
export class Toolbar implements OnDestroy {
  windowWidth = signal<number>(window.innerWidth);
  viewMode = signal<'table' | 'card'>('table');
  viewModeChange = output<'table' | 'card'>();
  search = output<string>();
  heroValue = signal<string>('');
  addHero = output<void>();


  constructor() {
    window.addEventListener('resize', () => {
      this.windowWidth.set(window.innerWidth);
      this.viewMode.set(this.windowWidth() <= 768 ? 'card' : 'table');
    });

  }

  searchHeroes(query: string): void {
    this.heroValue.set(query);
  }

  onViewModeChange(value: string): void {
    this.viewMode.set(value as 'table' | 'card');
    this.viewModeChange.emit(this.viewMode());
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', () => {
      this.windowWidth.set(window.innerWidth);
      this.viewMode.set(this.windowWidth() <= 768 ? 'card' : 'table');
    });
  }
}
