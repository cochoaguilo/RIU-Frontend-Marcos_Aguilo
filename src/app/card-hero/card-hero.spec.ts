import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, linkedSignal, signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { CardHero } from './card-hero';
import { Hero } from '../hero';

const testHero: Hero = {
  id: 1,
  name: 'Test Hero',
  power: 'Speed',
  description: 'El mejor héroe de prueba',
};
@Component({
  selector: 'test-host',
  template: '<app-card-hero [hero]="hero()" (edit)="onEdit($event)" (delete)="onDelete($event)"></app-card-hero>',
  imports: [CardHero],
})
class TestHostComponent {
  hero = signal<Hero>(testHero);
  editedHero: Hero | null = null;
  deletedId: number | null = null;

  onEdit(hero: Hero): void {
    this.editedHero = hero;
  }

  onDelete(id: number): void {
    this.deletedId = id;
  }
}

describe('CardHero', () => {
  let hostComponent: TestHostComponent;
  let hostFixture: ComponentFixture<TestHostComponent>;
  let cardHeroComponent: CardHero;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardHero, TestHostComponent],
    }).compileComponents();

    hostFixture = TestBed.createComponent(TestHostComponent);
    hostComponent = hostFixture.componentInstance;
    hostComponent.hero.set(testHero);
    hostFixture.detectChanges();

    const cardHeroDebugElement = hostFixture.debugElement.query(By.directive(CardHero));
    cardHeroComponent = cardHeroDebugElement.componentInstance;
  });

  it('should create when the required hero input is provided', () => {
    expect(cardHeroComponent).toBeTruthy();
  });

  it('should render hero details when the input is set', () => {
    const title = hostFixture.debugElement.query(By.css('mat-card-title'))?.nativeElement as HTMLElement;
    const contentText = hostFixture.debugElement.nativeElement.textContent;

    expect(title.textContent?.trim()).toBe('Test Hero');
    expect(contentText).toContain('ID: 1');
    expect(contentText).toContain('Poder: Speed');
    expect(contentText).toContain('Descripción: El mejor héroe de prueba');
  });

  it('should emit edit event when edit button is clicked', () => {
    const editButton = hostFixture.debugElement.query(By.css('button[title="Editar"]'));
    editButton.nativeElement.click();

    expect(hostComponent.editedHero).toEqual(testHero);
  });

  it('should emit delete event when delete button is clicked', () => {
    const deleteButton = hostFixture.debugElement.query(By.css('button[title="Eliminar"]'));
    deleteButton.nativeElement.click();

    expect(hostComponent.deletedId).toBe(testHero.id);
  });
});
