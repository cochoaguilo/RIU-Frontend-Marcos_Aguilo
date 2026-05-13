import { Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { Form } from '../form/form';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CardHero } from '../card-hero/card-hero';
import { Toolbar } from '../toolbar/toolbar';
import { ConfirmDialog, ConfirmDialogData } from '../confirm-dialog/confirm-dialog';
import { Table } from '../table/table';
import { Loader } from '../loader/loader';



@Component({
  standalone: true,
  selector: 'app-home',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatTableModule,
    MatIconModule,
    MatSnackBarModule,
    MatCheckboxModule,
    CardHero,
    Toolbar,
    Table,
    Loader
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  heroes = signal<Hero[]>([]);
  heroesModel = signal<Hero>({ id: 0, name: '', power: '', description: '' });
  editingHeroId = signal<number | null>(null);
  displayedColumns: string[] = ['id', 'name', 'power', 'description', 'actions'];
  private heroService = inject(HeroService);
  private snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog);
  private dialogRef = viewChild<ElementRef>('heroForm');
  viewMode = signal<'table' | 'card'>('table');
  windowWidth = signal<number>(window.innerWidth);
  isLoading = signal<boolean>(false);

  constructor(
  ) {
    this.loadHeroes();
  }

  private loadHeroes(): void {
    this.isLoading.set(true);
    setTimeout(() => {
      this.heroes.set(this.heroService.getAll());
      this.isLoading.set(false);
    }, 1000);
    
  }

  deleteHero(id: number): void {
    const hero = this.heroes().find(h => h.id === id);
    if (!hero) return;

    const dialogData: ConfirmDialogData = {
      title: 'Eliminar Héroe',
      message: `¿Estás seguro de que deseas eliminar al héroe "${hero.name}"? Esta acción no se puede deshacer.`,
      confirmText: 'Eliminar',
      cancelText: 'Cancelar',
      icon: 'delete_forever'
    };

    const dialogRef = this.dialog.open(ConfirmDialog, {
      data: dialogData,
      width: '400px',
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.heroService.delete(id);
        this.snackBar.open('Héroe eliminado exitosamente', 'Cerrar', { duration: 3000 });
        this.loadHeroes();
      }
    });
  }

  addEditHero(hero?: Hero): void {
    const dialogRef = this.dialog.open(Form, {
      width: '720px',
      autoFocus: false,
      data: hero ? { ...hero } : null, // Pasar una copia del héroe para evitar mutaciones
    });

    dialogRef.afterClosed().subscribe(() => {
      this.loadHeroes();
    });
  }

  searchHeroes(query: string): void {
    if (query.trim()) {
      this.heroes.set(this.heroService.searchByName(query));
    } else {
      this.loadHeroes();
    }
  }


}
