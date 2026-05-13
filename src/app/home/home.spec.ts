import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Home } from './home';
import { HeroService } from '../hero.service';

describe('Home', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;
  let heroServiceSpy: { getAll: any };
  let snackBarSpy: { open: any };
  let dialogSpy: { open: any };

  beforeEach(async () => {
    heroServiceSpy = {
      getAll: vi.fn().mockReturnValue([]),
    };
    snackBarSpy = { open: vi.fn() };
    dialogSpy = { open: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [Home],
      providers: [
        { provide: HeroService, useValue: heroServiceSpy },
        { provide: MatSnackBar, useValue: snackBarSpy },
        { provide: MatDialog, useValue: dialogSpy },
      ],
    }).compileComponents();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should create', () => {
    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should load heroes on init', async () => {
    const expectedHeroes = [
      { id: 1, name: 'Hero 1', power: 'Power 1', description: 'Description 1' },
      { id: 2, name: 'Hero 2', power: 'Power 2', description: 'Description 2' },
    ];

    heroServiceSpy.getAll.mockReturnValue(expectedHeroes);
    vi.useFakeTimers();

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;

    vi.advanceTimersByTime(1000);
    await Promise.resolve();

    expect(component.heroes()).toEqual(expectedHeroes);
  });
});
