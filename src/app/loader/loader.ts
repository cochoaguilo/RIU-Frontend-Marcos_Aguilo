import { Component, input } from '@angular/core';

@Component({
  selector: 'app-loader',
  imports: [],
  standalone: true,
  templateUrl: './loader.html',
  styleUrl: './loader.scss',
})
export class Loader {
  isLoading = input.required<boolean>();
}
