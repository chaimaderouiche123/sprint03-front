import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Genre } from '../model/genre.model';
import { OeuvreService } from '../services/oeuvre.service';

@Component({
  selector: 'app-update-oeuvre',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update-oeuvre.component.html',
  styles: ``
})
export class UpdateOeuvreComponent implements OnInit {
  currentOeuvre: any = {
    idOeuvre: 0,
    titreOeuvre: '',
    prixOeuvre: 0,
    dateCreation: new Date(),
    genre: null
  };
  genres: Genre[] = [];
  updatedIdGenre?: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private oeuvreService: OeuvreService
  ) {}

  ngOnInit(): void {
    const id = Number(this.activatedRoute.snapshot.params['id']);

    this.oeuvreService.listeGenres().subscribe({
      next: (cats) => {
        this.genres = cats._embedded.genres;
      },
      error: (err) => console.error('Erreur chargement genres :', err)
    });

    this.oeuvreService.consulterOeuvre(id).subscribe({
      next: (o) => {
        this.currentOeuvre = o;
        this.updatedIdGenre = o.genre?.idGenre;
      },
      error: (err) => console.error('Erreur consultation œuvre :', err)
    });
  }

  updateOeuvre(): void {
    if (this.updatedIdGenre) {
      this.currentOeuvre.genre = { idGenre: this.updatedIdGenre, nomGenre: '' };
    }
    this.oeuvreService.updateOeuvre(this.currentOeuvre).subscribe({
      next: () => {
        this.router.navigate(['oeuvres']);
      },
      error: (err) => console.error('Erreur modification œuvre :', err)
    });
  }
}