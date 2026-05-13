import { Component, input, output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Hero } from '../hero';

@Component({
  selector: 'app-card-hero',
  imports: [MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './card-hero.html',
  styleUrl: './card-hero.scss',
})
export class CardHero {
  hero = input.required<Hero >();
  edit = output<Hero>();
  delete = output<number>();

  onEdit(): void {
    this.edit.emit(this.hero());
  }

  onDelete(): void {
    this.delete.emit(this.hero().id);
  }
}

