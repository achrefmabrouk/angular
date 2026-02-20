import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-suggestion-details',
  templateUrl: './suggestion-details.component.html',
  styleUrl: './suggestion-details.component.css'
})
export class SuggestionDetailsComponent {
  id!: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Récupération de l'ID depuis l'URL
    this.id = this.route.snapshot.params['id'];
    
  }

}
