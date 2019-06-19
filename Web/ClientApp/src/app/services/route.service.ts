import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class RouteService {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }

  navigateToCatalog() {
    this.router.navigate(['catalog']);
  }

  navigateToCategory(categoryId: number) {
    this.router.navigate(['catalog', 'category', categoryId]);
  }

  navigateToProduct(categoryId: number, productId: number) {
    this.router.navigate(['catalog', 'category', categoryId, 'product', productId]);
  }

  navigateToCreateProduct(categoryId: number) {
    this.router.navigate(['catalog', 'category', categoryId, 'product', 'create']);
  }
}
