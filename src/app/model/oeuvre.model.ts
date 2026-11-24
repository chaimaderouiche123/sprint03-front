import { Genre } from './genre.model';

export class Oeuvre {
  idOeuvre!: number;
  nomOeuvre?: string;
  titreOeuvre?: string;
  prixOeuvre!: number;
  dateCreation!: Date | string;
  genre?: Genre;
}