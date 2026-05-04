import { Component, inject, input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { HeroService } from '../hero.service';
import { Hero } from '../hero';
import { debounce, form, required, FormField, FormRoot } from '@angular/forms/signals';
import { UppercaseDirective } from '../uppercase.directive';

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
    FormField,
    FormRoot,
    UppercaseDirective
],
  templateUrl: './form.html',
  styleUrl: './form.scss',
})
export class Form implements OnInit{
  hero = input<Hero>();
  heroData = inject(MAT_DIALOG_DATA) as Hero | null;  // Recibir los datos

  heroesModel = signal<Hero>({ id: 0, name: '', power: '', description: '' });
  editingHeroId = signal<number | null>(null);
  displayedColumns: { name: string; label: string; placeholder: string }[] = [
    { name: 'id', label: 'ID', placeholder: 'ID' },
    { name: 'name', label: 'Nombre', placeholder: 'Nombre' },
    { name: 'power', label: 'Poder', placeholder: 'Poder' },
    { name: 'description', label: 'Descripción', placeholder: 'Descripción' },
    { name: 'actions', label: 'Acciones', placeholder: 'Acciones' }
  ];
  private heroService = inject(HeroService);
  private snackBar = inject(MatSnackBar);
  private dialogRef = inject(MatDialogRef<Form>, { optional: true });

  heroForm = form(this.heroesModel, (schemaPath) => {
      debounce(schemaPath.name, 500);
      required(schemaPath.name, { message: 'El nombre es obligatorio' });
      debounce(schemaPath.power, 500);
      required(schemaPath.power, { message: 'El poder es obligatorio' });
    },
    {
      submission: {
        action: async (field) => {
          console.log(field().value());
          this.onSubmit(field().value(), this.heroesModel().id > 0);
          
        },
      },
    },
  );

  ngOnInit(): void {    
    if (this.heroData) {
      this.heroesModel.set(this.heroData!);
    } else {
      this.heroesModel.set({ id: 0, name: '', power: '', description: '' });
    }
  }

 

  async onSubmit(formValue: Hero, editing: boolean): Promise<void> {

    try {
      if (editing) {
        await this.heroService.update(formValue);
        this.snackBar.open('Héroe actualizado exitosamente', 'Cerrar', { duration: 3000 });
      } else {
        await this.heroService.register(formValue);
        this.snackBar.open('Héroe registrado exitosamente', 'Cerrar', { duration: 3000 });
      }

      //this.heroForm.reset();
      this.dialogRef?.close();
    } catch (error) {
      this.snackBar.open('Error al procesar el héroe', 'Cerrar', { duration: 3000 });
    }
  }

  

  cancelEdit(): void {
    this.dialogRef?.close();
    //this.heroForm.reset();
  }


}
