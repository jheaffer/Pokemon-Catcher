import { Component } from '@angular/core';
import { PokemonFormComponent } from './pokemon-form/pokemon-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PokemonFormComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'My-Application';
}
