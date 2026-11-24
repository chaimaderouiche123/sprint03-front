import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Oeuvre } from '../model/oeuvre.model';
import { Genre } from '../model/genre.model';
import { GenreWrapper } from '../model/genre-wrapped.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class OeuvreService {
  apiURLOeuvreBase: string = 'http://localhost:8090/oeuvres/rest';
  apiURLOeuvre: string = 'http://localhost:8090/oeuvres/rest?projection=fullOeuvre';
  apiURLGenre: string = 'http://localhost:8090/oeuvres/cat';

  constructor(private http: HttpClient) {}

  listeOeuvres(): Observable<Oeuvre[]> {
    return this.http.get<any>(this.apiURLOeuvre).pipe(
      map(res => res?._embedded?.oeuvres ?? (Array.isArray(res) ? res : []))
    );
  }

  ajouterOeuvre(o: any): Observable<Oeuvre> {
    const titre = o.nomOeuvre ?? o.titreOeuvre;
    const payload: any = {
      nomOeuvre: titre,
      titreOeuvre: titre,
      prixOeuvre: o.prixOeuvre,
      dateCreation: o.dateCreation
    };
    if (o.genre?.idGenre) {
      payload.genre = `${this.apiURLGenre}/${o.genre.idGenre}`;
    }
    return this.http.post<Oeuvre>(this.apiURLOeuvreBase, payload, httpOptions);
  }

  supprimerOeuvre(id: number): Observable<any> {
    const url = `${this.apiURLOeuvreBase}/${id}`;
    return this.http.delete(url, httpOptions);
  }

  consulterOeuvre(id: number): Observable<Oeuvre> {
    const url = `${this.apiURLOeuvreBase}/${id}`;
    return this.http.get<Oeuvre>(url);
  }

  updateOeuvre(o: any): Observable<Oeuvre> {
    const url = `${this.apiURLOeuvreBase}/${o.idOeuvre}`;
    const titre = o.nomOeuvre ?? o.titreOeuvre;
    const payload: any = {
      nomOeuvre: titre,
      titreOeuvre: titre,
      prixOeuvre: o.prixOeuvre,
      dateCreation: o.dateCreation
    };
    if (o.genre?.idGenre) {
      payload.genre = `${this.apiURLGenre}/${o.genre.idGenre}`;
    }
    return this.http.patch<Oeuvre>(url, payload, httpOptions);
  }

  rechercherParGenre(idGenre: number): Observable<Oeuvre[]> {
    return this.listeOeuvres().pipe(
      map(list => list.filter((o: any) => (o.genre?.idGenre ?? o.idGenre) == idGenre))
    );
  }

  listeGenres(): Observable<GenreWrapper> {
    return this.http.get<GenreWrapper>(this.apiURLGenre);
  }

  ajouterGenreHTTP(genre: Genre): Observable<Genre> {
    const payload = { nomGenre: genre.nomGenre };
    return this.http.post<Genre>(this.apiURLGenre, payload, httpOptions);
  }

  modifierGenreHTTP(genre: Genre): Observable<Genre> {
    const url = `${this.apiURLGenre}/${genre.idGenre}`;
    return this.http.patch<Genre>(url, { nomGenre: genre.nomGenre }, httpOptions);
  }

  supprimerGenreHTTP(id: number): Observable<any> {
    const url = `${this.apiURLGenre}/${id}`;
    return this.http.delete(url, httpOptions);
  }
}