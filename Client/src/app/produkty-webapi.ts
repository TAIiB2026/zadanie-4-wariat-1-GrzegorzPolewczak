import { map, Observable } from "rxjs";
import { GetDataInterface } from "./interfaces/get-data.interface";
import { ProduktClass } from "./classes/produkt.class";
import { inject, Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { FormSubmitInterface } from "./interfaces/form-submit.interface";

@Injectable(
    
)
export class ProduktyWebapi implements GetDataInterface, FormSubmitInterface {
    private readonly url = 'http://localhost:5116/api/produkty';
    private readonly http = inject(HttpClient);

    Get(nazwa?: string, strona: number = 1, rozmiar: number = 10) : Observable<ProduktClass[]> {
        let params = new HttpParams()
            .set('strona', strona.toString())
            .set('rozmiar', rozmiar.toString());

        if(nazwa) {
            params = params.set('nazwa', nazwa);
        }
        return this.http.get<ProduktClass[]>(this.url, { params });
    }

    GetByID(id: number): Observable<ProduktClass> {
        return this.http.get<ProduktClass>(`${this.url}/${id}`);
    }

    Post(nazwa: string, cena: number, data: Date) : Observable<boolean> {
        return this.http.post<boolean>(this.url, {nazwa, cena, dataWaznosci: data}).pipe(
            map(() => true)
        );
    }

    Put(id: number, nazwa: string, cena: number, data: Date) : Observable<boolean> {
        return this.http.put<boolean>(`${this.url}/${id}`, { id, nazwa, cena, dataWaznosci: data }).pipe(
             map(() => true)
        );
    }

    Delete(id: number): Observable<boolean> {
        return this.http.delete<boolean>(`${this.url}/${id}`);
    }
}