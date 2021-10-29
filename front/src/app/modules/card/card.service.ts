import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {UntilDestroy} from '@ngneat/until-destroy';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Card} from "./card";
import {PaginationInterface} from "@shared/interfaces";
import {stringify} from 'query-string';


export interface CardRequest {
  page?: number;
  size?: number;
}

@UntilDestroy()
@Injectable({
  providedIn: 'root',
})
export class CardService {
  constructor(private http: HttpClient) {}

  list(
    params?: CardRequest,
  ): Observable<PaginationInterface<Card>> {
    let parsedParams = '';
    if (params) {
      parsedParams += '?' + stringify(params, {arrayFormat: 'none'});
    }
    return this.http
      .get<PaginationInterface<Card>>(
        'api/v1/card' + parsedParams,
      )
      .pipe(map(rest => ({...rest, data: rest.data.map(l => new Card(l))})));
  }

  getCardById(id: number): Observable<Card> {
    return this.http.get<Card>(`api/v1/card/${id}`).pipe(map(a => new Card(a)));
  }
}
