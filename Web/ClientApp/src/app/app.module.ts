import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { HomeComponent } from './components/home/home.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { CdkTreeModule } from '@angular/cdk/tree';
import { MatTreeModule } from '@angular/material/tree';
import {
  MatTableModule,
  MatSortModule,
  MatIconModule,
  MatExpansionModule,
  MatCheckboxModule,
  MatSelectModule,
  MatPaginatorModule,
  MatAutocompleteModule,
  MatButtonModule,
  MatDialogModule,
  MatSnackBarModule,
  MatProgressSpinnerModule
} from '@angular/material';
import { StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreRootModule } from './store/storeRootModule';
import { CategoryEffects } from './store/category/category.effects';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductViewComponent } from './components/product-view/product-view.component';
import { environment } from 'src/environments/environment';
import { ProductListEffects } from './store/product-list/product-list.effects';
import { ProductEffects } from './store/product/product.effects';
import { CategoryTreeEffects } from './store/category-tree/category-tree.effects';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './components/common/loading/loading.component';
import { CategoryComponent } from './components/category/category.component';
import { PaginatorComponent } from './components/common/paginator/paginator.component';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CdkTableModule } from '@angular/cdk/table';
import { CloseDialogComponent } from './components/common/close-dialog/close-dialog.component';
import { ToastNotificationComponent } from './components/common/toast-notification/toast-notification.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CatalogComponent,
    ProductListComponent,
    ProductViewComponent,
    LoadingComponent,
    CategoryComponent,
    PaginatorComponent,
    CloseDialogComponent,
    ToastNotificationComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CdkTreeModule,
    MatTreeModule,
    MatIconModule,
    MatExpansionModule,
    MatTableModule,
    MatSortModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSelectModule,
    MatPaginatorModule,
    MatAutocompleteModule,
    BrowserAnimationsModule,
    CdkStepperModule,
    CdkTableModule,
    MatDialogModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    StoreModule.forRoot(StoreRootModule.model),
    EffectsModule.forRoot([
      CategoryEffects,
      CategoryTreeEffects,
      ProductEffects,
      ProductListEffects
    ]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    RouterModule.forRoot([
      { path: '', redirectTo: '/catalog', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      {
        path: 'catalog', component: CatalogComponent, children: [
          {
            path: 'category/:categoryId', component: CategoryComponent, children: [
              { path: 'product/:productId', component: ProductViewComponent },
              { path: 'product/create', component: ProductViewComponent }
            ]
          }
        ]
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [CloseDialogComponent, ToastNotificationComponent]
})
export class AppModule { }
