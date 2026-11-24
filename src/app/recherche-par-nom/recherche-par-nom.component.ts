import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Oeuvre } from '../model/oeuvre.model';
import { OeuvreService } from '../services/oeuvre.service';
import { SearchFilterPipe } from '../search-filter.pipe';

@Component({
  selector: 'app-recherche-par-nom',
  standalone: true,
  imports: [FormsModule, CommonModule, SearchFilterPipe],
  templateUrl: './recherche-par-nom.component.html'
})
export class RechercheParNomComponent implements OnInit {

  oeuvres: Oeuvre[] = [];
  allOeuvres: Oeuvre[] = [];
  searchTerm: string = '';

  constructor(private oeuvreService: OeuvreService) {}

  ngOnInit(): void {
    this.oeuvreService.listeOeuvres().subscribe({
      next: (data) => {
        this.allOeuvres = data;
        this.oeuvres = data;
      },
      error: (err) => console.error('Erreur chargement œuvres :', err)
    });
  }

  onKeyUp(filterText: string): void {
    const query = (filterText ?? '').toLowerCase();
    this.oeuvres = this.allOeuvres.filter(item => {
      const titre = item.nomOeuvre ?? item.titreOeuvre ?? '';
      return titre.toLowerCase().includes(query);
    });
  }
}