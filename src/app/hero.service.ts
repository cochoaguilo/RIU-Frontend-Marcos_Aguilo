import { Injectable, signal } from '@angular/core';
import { Hero } from './hero';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private readonly _heroes = signal<Hero[]>([
    { id: 1, name: 'Spiderman', power: 'Araña', description: 'Lanza telarañas y se balancea entre edificios' },
    { id: 2, name: 'Superman', power: 'Superfuerza', description: 'Vuela y tiene visión de rayos X' },
    { id: 3, name: 'Manolito el fuerte', power: 'Resistencia', description: 'Un héroe local con gran fuerza' }
  ]);

  get heroes(): Hero[] {
    return [...this._heroes()];
  }

  register(hero: Omit<Hero, 'id'>): Hero {
    const nextId = this.generateNextId();
    const newHero: Hero = { id: nextId, ...hero };
    this._heroes.update((current) => [...current, newHero]);
    return newHero;
  }

  getAll(): Hero[] {
    return this.heroes;
  }

  getById(id: number): Hero | undefined {
    return this._heroes().find((hero) => hero.id === id);
  }

  searchByName(query: string): Hero[] {
    const normalized = query?.trim().toLowerCase();
    if (!normalized) {
      return this.heroes;
    }
    return this._heroes().filter((hero) => hero.name.toLowerCase().includes(normalized));
  }

  update(hero: Hero): Hero | undefined {
    let updatedHero: Hero | undefined;
    this._heroes.update((current) =>
      current.map((item) => {
        if (item.id === hero.id) {
          updatedHero = { ...item, ...hero };
          return updatedHero;
        }
        return item;
      })
    );
    return updatedHero;
  }

  delete(id: number): boolean {
    const beforeCount = this._heroes().length;
    this._heroes.update((current) => current.filter((hero) => hero.id !== id));
    return this._heroes().length < beforeCount;
  }

  private generateNextId(): number {
    const heroes = this._heroes();
    return heroes.length ? Math.max(...heroes.map((hero) => hero.id)) + 1 : 1;
  }
}
