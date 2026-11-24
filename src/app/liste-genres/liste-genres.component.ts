import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Genre } from '../model/genre.model';
import { OeuvreService } from '../services/oeuvre.service';
import { UpdateGenreComponent } from '../update-genre/update-genre.component';
import { AuthService } from '../services/auth.service'; // <-- Importation du service d'auth

@Component({
  selector: 'app-liste-genres',
  standalone: true,
  imports: [CommonModule, UpdateGenreComponent],
  templateUrl: './liste-genres.component.html',
  styles: ``
})
export class ListeGenresComponent implements OnInit {
  genres!: Genre[];

  updatedGenre: Genre = { idGenre: 0, nomGenre: '' };
  ajout: boolean = true;

  // Injection de AuthService en public pour l'utiliser dans le HTML
  constructor(private oeuvreService: OeuvreService, public authService: AuthService) {}

  ngOnInit(): void {
    this.chargerGenres();
  }

  chargerGenres() {
    this.oeuvreService.listeGenres().subscribe(cats => {
      console.log(cats);
      this.genres = cats._embedded.genres;
    });
  }

  updateGenre(cat: Genre) {
    this.updatedGenre = { ...cat };
    this.ajout = false;
  }

  genreUpdated(cat: Genre) {
    if (this.ajout) {
      this.oeuvreService.ajouterGenreHTTP(cat).subscribe(() => {
        this.chargerGenres();
        this.updatedGenre = { idGenre: 0, nomGenre: '' };
        this.ajout = true;
      });
    } else {
      this.oeuvreService.modifierGenreHTTP(cat).subscribe(() => {
        this.chargerGenres();
        this.updatedGenre = { idGenre: 0, nomGenre: '' };
        this.ajout = true;
      });
    }
  }

  supprimerGenre(cat: Genre) {
    let conf = confirm("Etes-vous sûr de vouloir supprimer ce genre ?");
    if (conf) {
      this.oeuvreService.supprimerGenreHTTP(cat.idGenre).subscribe(() => {
        console.log("genre supprimé");
        this.chargerGenres();
      });
    }
  }
}