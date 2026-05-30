import { Component, inject } from '@angular/core';
import { GET_DATA_TOKEN } from '../tokens/get-data.token';

@Component({
  selector: 'taiib2-produkty',
  standalone: false,
  templateUrl: './produkty.component.html',
  styles: ``
})
export class ProduktyComponent {
  private readonly service = inject(GET_DATA_TOKEN);
  public readonly data$ = this.service.Get();
}
