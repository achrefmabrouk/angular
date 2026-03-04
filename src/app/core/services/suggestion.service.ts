import { Injectable } from '@angular/core';
import { Suggestion } from '../../models/suggestion';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SuggestionService {
  private suggestionUrl = 'http://localhost:3000/suggestions';
    suggestions: Suggestion[] = [
    {
      id: 1,
      title: 'Organiser une journée team building',
      description: "Suggestion pour organiser une journée de team building pour renforcer les liens entre les membres de l'équipe.",
      category: 'Événements',
      date: new Date('2025-01-20'),
      status: 'acceptee',
      nbLikes: 10
    },
    {
      id: 2,
      title: 'Améliorer le système de réservation',
      description: "Proposition pour améliorer la gestion des réservations en ligne avec un système de confirmation automatique.",
      category: 'Technologie',
      date: new Date('2025-01-15'),
      status: 'refusee',
      nbLikes: 0
    },
    {
      id: 3,
      title: 'Créer un système de récompenses',
      description: "Mise en place d'un programme de récompenses pour motiver les employés et reconnaître leurs efforts.",
      category: 'Ressources Humaines',
      date: new Date('2025-01-25'),
      status: 'refusee',
      nbLikes: 0
    },
    {
      id: 4,
      title: "Moderniser l'interface utilisateur",
      description: "Refonte complète de l'interface utilisateur pour une meilleure expérience utilisateur.",
      category: 'Technologie',
      date: new Date('2025-01-30'),
      status: 'en_attente',
      nbLikes: 0
    }
  ];

  getSuggestionsList(): Suggestion[] {
    return this.suggestions;
  }

  constructor(private http: HttpClient) { }

  // 4. Retourner la liste [cite: 121]
  getSuggestionsListpartie2(): Observable<Suggestion[]> {
    return this.http.get<Suggestion[]>(this.suggestionUrl);
  }

  // 6. Retourner par ID [cite: 125]
  getSuggestionById(id: number): Observable<Suggestion> {
    return this.http.get<Suggestion>(`${this.suggestionUrl}/${id}`);
  }

  // 8. Supprimer [cite: 128]
  deleteSuggestion(id: number): Observable<any> {
    return this.http.delete(`${this.suggestionUrl}/${id}`);
  }

  // 10. Ajouter [cite: 131]
  addSuggestion(suggestion: Suggestion): Observable<Suggestion> {
    return this.http.post<Suggestion>(this.suggestionUrl, suggestion);
  }

  // 12. Modifier [cite: 133]
  updateSuggestion(id: number, suggestion: Suggestion): Observable<Suggestion> {
    return this.http.put<Suggestion>(`${this.suggestionUrl}/${id}`, suggestion);
  }

  // 15. Mettre à jour les likes [cite: 146]
  updateLikes(id: number, nbLikes: number): Observable<any> {
    return this.http.put(`${this.suggestionUrl}/${id}`, { nbLikes });
  }
}
