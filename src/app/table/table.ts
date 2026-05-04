import { Component, input, output } from '@angular/core';
import { Hero } from '../hero';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-table',
  imports: [
    MatTableModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './table.html',
  styleUrl: './table.scss',
})
export class Table {
  heroes = input<Hero[]>([]);
  editHero = output<Hero>();
  deleteHero = output<number>();
  displayedColumns: string[] = ['id', 'name', 'power', 'description', 'actions'];

}
