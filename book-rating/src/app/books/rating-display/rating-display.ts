import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-rating-display',
  imports: [],
  templateUrl: './rating-display.html',
  styleUrl: './rating-display.scss',
})
export class RatingDisplay {
  readonly value = input.required<number>();
  readonly starsArray = computed(() => new Array(Math.max(0, this.value())));
}
