import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Genre } from '../model/genre.model';
import { OeuvreService } from '../services/oeuvre.service';

@Component({
  selector: 'app-add-oeuvre',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-oeuvre.component.html',
  styles: ``
})
export class AddOeuvreComponent implements OnInit {
  genres: Genre[] = [];
  newIdGenre!: number;
  newOeuvre: any = {
    titreOeuvre: '',
    prixOeuvre: 0,
    dateCreation: new Date().toISOString().split('T')[0],
    genre: null
  };

  constructor(
    private oeuvreService: OeuvreService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.oeuvreService.listeGenres().subscribe({
      next: (cats) => {
        this.genres = cats._embedded.genres;
        if (this.genres.length > 0) {
          this.newIdGenre = this.genres[0].idGenre;
        }
      },
      error: (err) => console.error('Erreur chargement genres :', err)
    });
  }

  addOeuvre(): void {
    this.newOeuvre.genre = { idGenre: this.newIdGenre, nomGenre: '' };
    this.oeuvreService.ajouterOeuvre(this.newOeuvre).subscribe({
      next: () => {
        this.router.navigate(['oeuvres']);
      },
      error: (err) => console.error('Erreur ajout œuvre :', err)
    });
  }
}