import { Component } from '@angular/core';
import { Suggestion } from '../../../models/suggestion';
import { SuggestionService } from '../../../core/services/suggestion.service';

@Component({
  selector: 'app-list-suggestion',
  templateUrl: './list-suggestion.component.html',
  styleUrl: './list-suggestion.component.css'
})
export class ListSuggestionComponent {

favorites: Suggestion[] = [];
suggestions: Suggestion[] = [];
constructor(private suggestionService: SuggestionService) {}

  addLike(suggestion: Suggestion) {
    suggestion.nbLikes += 1;
  }

  addToFavorites(suggestion: Suggestion) {
    const exists = this.favorites.find(fav => fav.id === suggestion.id);
    if (!exists) {
      this.favorites.push(suggestion);
    }
  }

  ngOnInit() {
    // On récupère la liste centralisée qui contient vos nouveaux ajouts
    this.suggestions = this.suggestionService.getSuggestionsList();

    this.suggestionService.getSuggestionsListpartie2().subscribe(data => {this.suggestions = data; });
  }

  // 9. Méthode de suppression [cite: 129, 130]
onDelete(id: number) {
  this.suggestionService.deleteSuggestion(id).subscribe(() => {
    this.suggestions = this.suggestions.filter(s => s.id !== id);
  });
}

// 15. Gestion des likes [cite: 146]
onLike(suggestion: Suggestion) {
  const newLikes = suggestion.nbLikes + 1;
  this.suggestionService.updateLikes(suggestion.id, newLikes).subscribe(() => {
    suggestion.nbLikes = newLikes;
  });
}

}
