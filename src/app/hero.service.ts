import { Injectable, linkedSignal, signal } from '@angular/core';
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

  heroId = signal<number >(4); // Inicializamos el ID en 4, ya que tenemos 3 héroes predefinidos
  heroesList = linkedSignal(this._heroes);


  register(hero: Hero): Hero {
    
    const nextId = this.heroId();
    const newHero: Hero = { ...hero, id: nextId };// Asignamos el ID generado al nuevo héroe
    
    this._heroes.update((current) => [...current, newHero]);
    this.heroId.set(nextId + 1);
    return newHero;
  }

  getAll(): Hero[] {
    return this.heroesList();
  }


  searchByName(query: string): Hero[] {
    const normalized = query?.trim().toLowerCase();
    if (!normalized) {
      return this.heroesList();
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


}
