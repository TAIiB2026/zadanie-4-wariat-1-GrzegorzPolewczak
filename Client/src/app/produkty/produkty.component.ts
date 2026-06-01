import { Component, inject } from '@angular/core';
import { GET_DATA_TOKEN } from '../tokens/get-data.token';
import { FORM_SUBMIT_TOKEN } from '../tokens/form-submit.token';

@Component({
  selector: 'taiib2-produkty',
  standalone: false,
  templateUrl: './produkty.component.html',
  styles: ``
})
export class ProduktyComponent {
  private readonly service = inject(GET_DATA_TOKEN);
  private readonly submitService = inject(FORM_SUBMIT_TOKEN);
  public data$ = this.service.Get();

  public searchName: string = '';

  public onSearch(): void { 
    this.data$ = this.service.Get(this.searchName);
  }


  public onDelete(id: number): void {
    if (confirm("Czy na pewno chcesz usunąć ten produkt?")) {
      this.submitService.Delete(id).subscribe({
        next: () => {
          this.data$ = this.service.Get();
        },
        error: (err) => alert("Błąd podczas usuwania: " + err.message)
      });
    }
  }
}
