import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Oeuvre } from '../model/oeuvre.model';
import { Genre } from '../model/genre.model';
import { OeuvreService } from '../services/oeuvre.service';

@Component({
  selector: 'app-recherche-par-genre',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './recherche-par-genre.component.html',
  styles: ``
})
export class RechercheParGenreComponent implements OnInit {
  oeuvres: Oeuvre[] = [];
  genres: Genre[] = [];
  idGenre!: number;

  constructor(private oeuvreService: OeuvreService) {}

  ngOnInit(): void {
    this.oeuvreService.listeGenres().subscribe({
      next: (cats) => {
        this.genres = cats._embedded.genres;
      },
      error: (err) => console.error('Erreur chargement genres :', err)
    });

    this.oeuvreService.listeOeuvres().subscribe({
      next: (data) => {
        this.oeuvres = data;
      },
      error: (err) => console.error('Erreur chargement œuvres :', err)
    });
  }

  onChange(): void {
    if (this.idGenre) {
      this.oeuvreService.rechercherParGenre(this.idGenre).subscribe({
        next: (data) => {
          this.oeuvres = data;
        },
        error: (err) => console.error('Erreur recherche par genre :', err)
      });
    } else {
      this.oeuvreService.listeOeuvres().subscribe({
        next: (data) => {
          this.oeuvres = data;
        }
      });
    }
  }
}