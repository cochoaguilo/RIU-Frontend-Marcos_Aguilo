import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { vi } from 'vitest';

import { Table } from './table';
import { Hero } from '../hero';

@Component({
  standalone: true,
  selector: 'test-host',
  template: '<app-table [heroes]="heroes()" (editHero)="onEdit($event)" (deleteHero)="onDelete($event)"></app-table>',
  imports: [Table],
})
class TestHostComponent {
  heroes = signal<Hero[]>([]);
  editedHero: Hero | null = null;
  deletedId: number | null = null;

  onEdit(hero: Hero): void {
    this.editedHero = hero;
  }

  onDelete(id: number): void {
    this.deletedId = id;
  }
}

describe('Table', () => {
  let hostFixture: ComponentFixture<TestHostComponent>;
  let hostComponent: TestHostComponent;
  const heroes: Hero[] = [
    {
      id: 1,
      name: 'Test Hero',
      power: 'Speed',
      description: 'Demo hero for testing',
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    hostFixture = TestBed.createComponent(TestHostComponent);
    hostComponent = hostFixture.componentInstance;
    hostComponent.heroes.set(heroes);
    hostFixture.detectChanges();
    await hostFixture.whenStable();
  });

  it('should create', () => {
    expect(hostComponent).toBeTruthy();
  });

  it('should render edit and delete buttons for each hero row', () => {
    const editButtons = hostFixture.debugElement.queryAll(By.css('button[title="Editar"]'));
    const deleteButtons = hostFixture.debugElement.queryAll(By.css('button[title="Eliminar"]'));

    expect(editButtons.length).toBe(1);
    expect(deleteButtons.length).toBe(1);
  });

  it('should emit editHero when edit button is clicked', () => {
    const editButton = hostFixture.debugElement.query(By.css('button[title="Editar"]'))?.nativeElement as HTMLElement;

    editButton.click();

    expect(hostComponent.editedHero).toEqual(heroes[0]);
  });

  it('should emit deleteHero when delete button is clicked', () => {
    const deleteButton = hostFixture.debugElement.query(By.css('button[title="Eliminar"]'))?.nativeElement as HTMLElement;

    deleteButton.click();

    expect(hostComponent.deletedId).toBe(heroes[0].id);
  });
});
