import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { Loader } from './loader';

@Component({
  standalone: true,
  selector: 'test-host',
  template: '<app-loader [isLoading]="isLoading()"></app-loader>',
  imports: [Loader],
})
class TestHostComponent {
  isLoading = signal(true);
}

describe('Loader', () => {
  let hostFixture: ComponentFixture<TestHostComponent>;
  let hostComponent: TestHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    hostFixture = TestBed.createComponent(TestHostComponent);
    hostComponent = hostFixture.componentInstance;
    hostFixture.detectChanges();
    await hostFixture.whenStable();
  });

  it('should create', () => {
    expect(hostComponent).toBeTruthy();
  });

  it('should show the loader overlay when isLoading is true', () => {
    const overlay = hostFixture.debugElement.query(By.css('.loading-overlay'));
    expect(overlay).toBeTruthy();
    expect(hostFixture.nativeElement.textContent).toContain('Cargando...');
  });

  it('should hide the loader overlay when isLoading is false', async () => {
    hostComponent.isLoading.set(false);
    hostFixture.detectChanges();
    await hostFixture.whenStable();

    const overlay = hostFixture.debugElement.query(By.css('.loading-overlay'));
    expect(overlay).toBeNull();
  });
});
