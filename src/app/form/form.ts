import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { HeroService } from '../hero.service';
import { Hero } from '../hero';
import { debounce, form, required, FormField } from '@angular/forms/signals';

@Component({
  selector: 'app-form',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatSnackBarModule,
    FormField
],
  templateUrl: './form.html',
  styleUrl: './form.scss',
})
export class Form {
  heroes = signal<Hero[]>([]);
  heroesModel = signal<Hero>({ id: 0, name: '', power: '', description: '' });
  editingHeroId = signal<number | null>(null);
  displayedColumns: string[] = ['id', 'name', 'power', 'description', 'actions'];
  private heroService = inject(HeroService);
  private snackBar = inject(MatSnackBar);

  heroForm = form(this.heroesModel, (schemaPath) => {
  debounce(schemaPath.name, 500);
  required(schemaPath.name, { message: 'El nombre es obligatorio' });
  debounce(schemaPath.power, 500);
  required(schemaPath.power, { message: 'El poder es obligatorio' });
})

  constructor(
  ) {
    this.loadHeroes();
  }

  private loadHeroes(): void {
    this.heroes.set(this.heroService.getAll());
  }

  onSubmit(): void {
    // if (this.heroForm.) {
    //   this.snackBar.open('Por favor completa el formulario correctamente', 'Cerrar', { duration: 3000 });
    //   return;
    // }

    // const formValue = this.heroForm.getRawValue();

    // if (this.editingHeroId()) {
    //   const updatedHero: Hero = {
    //     id: this.editingHeroId()!,
    //     ...formValue
    //   };
    //   this.heroService.update(updatedHero);
    //   this.snackBar.open('Héroe actualizado exitosamente', 'Cerrar', { duration: 3000 });
    //   this.editingHeroId.set(null);
    // } else {
    //   this.heroService.register(formValue);
    //   this.snackBar.open('Héroe registrado exitosamente', 'Cerrar', { duration: 3000 });
    // }

    // this.loadHeroes();
    // this.heroForm.reset();
  }

  

  cancelEdit(): void {
    this.editingHeroId.set(null);
    //this.heroForm.reset();
  }

  searchHeroes(query: string): void {
    if (query.trim()) {
      this.heroes.set(this.heroService.searchByName(query));
    } else {
      this.loadHeroes();
    }
  }
}
