import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-home',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatSnackBarModule,
    MatToolbarModule
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
  editHero(hero: Hero): void {
    // this.heroForm.patchValue({
    //   name: hero.name,
    //   power: hero.power,
    //   description: hero.description
    // });
    // this.editingHeroId.set(hero.id);
  }

  deleteHero(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este héroe?')) {
      this.heroService.delete(id);
      this.snackBar.open('Héroe eliminado exitosamente', 'Cerrar', { duration: 3000 });
      //this.loadHeroes();
    }
  }
}
