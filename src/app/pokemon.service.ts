import { HttpClient } from '@angular/common/http';
import { Injectable, signal, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/pokemon';
  
  pokemonList = signal<any[]>([]);
  
  fetchPokemon(){
    this.http.get<any[]>(this.apiUrl).subscribe(data => this.pokemonList.set(data));
  }

  savePokemon(pokemon: any){
    return this.http.post(this.apiUrl, pokemon);
  }
}
