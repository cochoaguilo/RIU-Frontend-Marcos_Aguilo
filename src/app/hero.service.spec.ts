import { TestBed } from '@angular/core/testing';
import { HeroService } from './hero.service';
import { Hero } from './hero';

describe('HeroService', () => {
  let service: HeroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('register', () => {
    it('should register a new hero with generated ID', () => {
      const heroData: Hero = {
        id: 4,
        name: 'Batman',
        power: 'Inteligencia',
        description: 'El caballero de la noche'
      };

      const result = service.register(heroData);
      expect(result.id).toBe(4); // Next ID after initial 3
      expect(result.name).toBe('Batman');
      expect(result.power).toBe('Inteligencia');
      expect(result.description).toBe('El caballero de la noche');
    });

    it('should add the hero to the list', () => {
      const initialCount = service.getAll().length;
      const heroData: Hero = {
        id: 4,
        name: 'Wonder Woman',
        power: 'Fuerza',
        description: 'Princesa amazona'
      };

      service.register(heroData);

      expect(service.getAll().length).toBe(initialCount + 1);
      const addedHero = service.getAll().find(h => h.name === 'Wonder Woman');
      expect(addedHero).toBeTruthy();
    });
  });


  describe('searchByName', () => {
    it('should return all heroes when query is empty', () => {
      const results = service.searchByName('');
      expect(results.length).toBe(service.getAll().length);
    });

    it('should filter heroes by name (case insensitive)', () => {
      const results = service.searchByName('man');
      expect(results.length).toBeGreaterThan(0);
      results.forEach(hero => {
        expect(hero.name.toLowerCase()).toContain('man');
      });
    });

    it('should return empty array when no matches found', () => {
      const results = service.searchByName('xyz');
      expect(results).toEqual([]);
    });
  });

  describe('update', () => {
    it('should update an existing hero', () => {
      const existingHero = service.getAll().find(h => h.id === 1);
      expect(existingHero).toBeTruthy();

      const updatedHero: Hero = {
        id: 1,
        name: 'Spider-Man',
        power: 'Araña mejorada',
        description: 'Lanza telarañas y se balancea entre edificios (versión mejorada)'
      };

      const result = service.update(updatedHero);
    
      expect(result).toBeTruthy();
      expect(result?.name).toBe('Spider-Man');
      expect(result?.power).toBe('Araña mejorada');
    });

    it('should return undefined for non-existent hero', () => {
      const nonExistentHero: Hero = {
        id: 999,
        name: 'Ghost',
        power: 'Invisibilidad',
        description: 'No existe'
      };

      const result = service.update(nonExistentHero);
      expect(result).toBeUndefined();
    });
  });

  describe('delete', () => {
    it('should delete an existing hero', () => {
      const initialCount = service.getAll().length;
      const result = service.delete(1);

      expect(result).toBe(true);
      expect(service.getAll().length).toBe(initialCount - 1);
    });

    it('should return false for non-existent hero', () => {
      const initialCount = service.getAll().length;
      const result = service.delete(999);

      expect(result).toBe(false);
      expect(service.getAll().length).toBe(initialCount);
    });
  });

  describe('getAll linkedSignal', () => {
    it('should reflect changes in the underlying signal', () => {
      const initialCount = service.getAll().length;

      // Register a new hero
      service.register({
        id: 4,
        name: 'Flash',
        power: 'Velocidad',
        description: 'El hombre más rápido'
      });

      expect(service.getAll().length).toBe(initialCount + 1);

      // Delete a hero
      service.delete(2);
      expect(service.getAll().length).toBe(initialCount);
    });
  });
});
