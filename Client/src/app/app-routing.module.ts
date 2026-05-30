import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProduktyComponent } from './produkty/produkty.component';
import { FormularzComponent } from './formularz/formularz.component';

const routes: Routes = [
  { path: 'produkty', component: ProduktyComponent },
  { path: 'dodawanie', component: FormularzComponent },
  { path: 'produkty/:id', component: FormularzComponent },
  { path: '', redirectTo: 'produkty', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
