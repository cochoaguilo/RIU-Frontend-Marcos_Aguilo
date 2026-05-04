import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appUppercase]',
  standalone: true
})
export class UppercaseDirective {
  constructor(private readonly elementRef: ElementRef<HTMLInputElement>) {}

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = target?.value ?? '';
    const uppercased = value.toUpperCase();
    const element = this.elementRef.nativeElement;

    if (element.value !== uppercased) {
      element.value = uppercased;
      element.dispatchEvent(new Event('input', { bubbles: true }));
    }
  }
}
