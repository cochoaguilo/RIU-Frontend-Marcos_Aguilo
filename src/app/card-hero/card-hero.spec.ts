import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardHero } from './card-hero';

describe('CardHero', () => {
  let component: CardHero;
  let fixture: ComponentFixture<CardHero>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardHero],
    }).compileComponents();

    fixture = TestBed.createComponent(CardHero);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
