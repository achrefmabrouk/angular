import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'; // Import de ActivatedRoute
import { SuggestionService } from '../../../core/services/suggestion.service';
import { Suggestion } from '../../../models/suggestion';

@Component({
  selector: 'app-suggestion-form',
  templateUrl: './suggestion-form.component.html',
  styleUrl: './suggestion-form.component.css'
})
export class SuggestionFormComponent implements OnInit {

  suggestionForm!: FormGroup;
  id!: number; // Pour stocker l'ID si on est en mode modification
  isUpdateMode: boolean = false;
  
  categories: string[] = [
    'Infrastructure et bâtiments', 'Technologie et services numériques',
    'Restauration et cafétéria', 'Hygiène et environnement',
    'Transport et mobilité', 'Activités et événements',
    'Sécurité', 'Communication interne', 'Accessibilité', 'Autre'
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute, // Injecter pour lire l'ID dans l'URL
    private suggestionService: SuggestionService
  ) {}

  ngOnInit(): void {
    // 1. Initialisation du formulaire
    this.suggestionForm = this.fb.group({
      title: ['', [
        Validators.required, 
        Validators.minLength(5), 
        Validators.pattern('^[A-Z][a-zA-Z ]*$')
      ]],
      description: ['', [Validators.required, Validators.minLength(30)]],
      category: ['', Validators.required],
      // On met disabled: true car ces champs sont en lecture seule selon le workshop
      date: [{ value: new Date().toLocaleDateString(), disabled: true }, Validators.required],
      status: [{ value: 'en attente', disabled: true }, Validators.required]
    });

    // 2. Vérifier si on a un ID dans l'URL (Point 13 du Workshop)
    this.id = this.route.snapshot.params['id'];

    if (this.id) {
      this.isUpdateMode = true;
      // Récupérer les anciennes données et remplir le formulaire
      this.suggestionService.getSuggestionById(this.id).subscribe((data: Suggestion) => {
        // patchValue remplit automatiquement les champs du formulaire avec l'objet data
        this.suggestionForm.patchValue(data); 
      });
    }
  }

  onSubmit() {
    if (this.suggestionForm.valid) {
      // getRawValue() est important pour récupérer les champs disabled (date/status)
      const suggestionData = this.suggestionForm.getRawValue();

      if (this.isUpdateMode) {
        // 3. Mode UPDATE (Point 14 du Workshop)
        this.suggestionService.updateSuggestion(this.id, suggestionData).subscribe({
          next: () => {
            alert('Suggestion mise à jour avec succès !');
            this.router.navigate(['/suggestions']);
          },
          error: (err) => console.error("Erreur lors de la mise à jour", err)
        });
      } else {
        // 4. Mode AJOUT
        const newSuggestion = {
          ...suggestionData,
          nbLikes: 0, 
          date: new Date() // Date actuelle pour l'ajout
        };

        this.suggestionService.addSuggestion(newSuggestion).subscribe({
          next: () => {
            this.router.navigate(['/suggestions']); 
          },
          error: (err) => console.error("Erreur lors de l'ajout", err)
        });
      }
    }
  }
}