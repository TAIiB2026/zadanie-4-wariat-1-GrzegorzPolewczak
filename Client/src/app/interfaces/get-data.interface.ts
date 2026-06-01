import { Observable } from "rxjs";
import { ProduktClass } from "../classes/produkt.class";

export interface GetDataInterface {
    Get(nazwa?: string, strona?: number, rozmiar?: number): Observable<ProduktClass[]>;
    GetByID(id: number): Observable<ProduktClass>;
    

}