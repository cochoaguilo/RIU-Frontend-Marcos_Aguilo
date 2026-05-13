import { AfterViewInit, Component, effect, inject, Injector, input, linkedSignal, output, ViewChild } from '@angular/core';
import { Hero } from '../hero';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  standalone: true,
  selector: 'app-table',
  imports: [
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule
  ],
  templateUrl: './table.html',
  styleUrl: './table.scss',
})
export class Table implements AfterViewInit {
  heroes = input<Hero[]>([]);
  editHero = output<Hero>();
  deleteHero = output<number>();
  displayedColumns: string[] = ['id', 'name', 'power', 'description', 'actions'];
  dataSource = new MatTableDataSource<Hero>([]);
  linkedHeroes = linkedSignal(() => this.heroes());

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  private injector = inject(Injector);

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource(this.linkedHeroes());
    this.dataSource.paginator = this.paginator;

    effect(() => {
      if (this.dataSource) {
        this.dataSource.data = this.linkedHeroes();
      }
    }, { injector: this.injector });
  }

}
