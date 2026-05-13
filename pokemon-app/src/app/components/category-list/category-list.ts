import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './category-list.html'
})
export class CategoryList {
  // categorie fisse da mostrare nella home
  categories = [
    { name: 'fire' },
    { name: 'water' },
    { name: 'grass' }
  ];
}