import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Oeuvre } from '../model/oeuvre.model';
import { OeuvreService } from '../services/oeuvre.service';
import { AuthService } from '../services/auth.service'; // <-- Importation du service d'authentification

@Component({
  selector: 'app-oeuvres',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './oeuvres.component.html',
  styleUrl: './oeuvres.component.css'
})
export class OeuvresComponent implements OnInit {

  oeuvres!: Oeuvre[];

  // Injection de AuthService en public pour l'utiliser dans le fichier HTML
  constructor(private oeuvreService: OeuvreService, public authService: AuthService) {}

  ngOnInit(): void {
    this.chargerOeuvres();
  }

  chargerOeuvres(): void {
    this.oeuvreService.listeOeuvres().subscribe({
      next: (data) => {
        this.oeuvres = data;
      },
      error: (err) => console.error('Erreur chargement œuvres :', err)
    });
  }

  supprimerOeuvre(p: Oeuvre): void {
    const conf = confirm("Etes-vous sûr ?");
    if (conf && p.idOeuvre != null) {
      this.oeuvreService.supprimerOeuvre(p.idOeuvre).subscribe({
        next: () => {
          this.chargerOeuvres();
        },
        error: (err) => console.error('Erreur suppression œuvre :', err)
      });
    }
  }
}