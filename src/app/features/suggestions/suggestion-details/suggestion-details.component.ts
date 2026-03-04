import { Component } from '@angular/core';
import { ActivatedRoute , Router } from '@angular/router';
import {Suggestion} from '../../../models/suggestion';
import { SuggestionService } from '../../../core/services/suggestion.service';



@Component({
  selector: 'app-suggestion-details',
  templateUrl: './suggestion-details.component.html',
  styleUrl: './suggestion-details.component.css'
})
export class SuggestionDetailsComponent {
  id!: number;
  suggestion: Suggestion | undefined;

  suggestions: Suggestion[] = [];

  constructor(private route: ActivatedRoute , private router: Router,private suggestionService: SuggestionService) {} //injection de dependance

  ngOnInit(): void {

     this.suggestions = this.suggestionService.getSuggestionsList();

    const idParam = this.route.snapshot.params['id'];

    // on peut aussi utiliser this.route.params.subscribe avec subscribe est un ecouteur
    
    if (idParam) {
      this.id = Number(idParam);
      
      // 2. Utiliser la variable convertie pour la recherche
      this.suggestion = this.suggestions.find(s => s.id === this.id);
    }

    if (!this.suggestion) {
      alert("Suggestion introuvable !");
      this.router.navigate(['/suggestions']);
    }


  }


}
