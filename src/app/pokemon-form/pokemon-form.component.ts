import { Component, signal, inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonService } from '../pokemon.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-pokemon-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './pokemon-form.component.html',
  styleUrls: ['./pokemon-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PokemonFormComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  pokemonForm = this.formBuilder.nonNullable.group({
    name: ['', Validators.required],
    type: ['', Validators.required],
    level: [1, [Validators.required, Validators.min(1)]],
    nature: ['', Validators.required]
  });
  pokemonService = inject(PokemonService);

  ngOnInit() {
    this.pokemonService.fetchPokemon();
  }

  onSubmit() {
    if (this.pokemonForm.valid) {
      const pokemon = this.pokemonForm.getRawValue();
      this.pokemonService.savePokemon(pokemon).subscribe({
        next: () => {
          this.pokemonForm.reset({ name: '', type: '', level: 1, nature: '' });
          this.pokemonService.fetchPokemon();
        },
        error: (err) => console.error(err)
      });
    }
  }
}
