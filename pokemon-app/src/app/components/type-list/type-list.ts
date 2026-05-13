import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { PokemonService } from '../../services/pokemon';
import { Pokemon, TypeDetail } from '../../models/pokemon.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-type-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './type-list.html'
})
export class TypeListComponent implements OnInit, OnDestroy {
  typeName = '';       // nome del tipo (es: fire)
  pokemons: Pokemon[] = [];  // lista dei pokemon da mostrare
  private sub!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private service: PokemonService,
    private cr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    // leggo il parametro :name dall'URL (es: /type/fire)
    this.typeName = this.route.snapshot.paramMap.get('name')!;

    // chiamo il service che ritorna un Observable
    const observable = this.service.getTypeDetail(this.typeName);
    this.sub = observable.subscribe((data: TypeDetail) => this.onDataReceived(data));
  }

  onDataReceived(data: TypeDetail) {
    // prendo solo i primi 20 pokemon e li mappo all'oggetto pokemon
    this.pokemons = data.pokemon.slice(0, 20).map(p => p.pokemon);
    // forzo Angular a ridisegnare il template con i nuovi dati
    this.cr.detectChanges();
  }

  ngOnDestroy() {
    // cancello la subscription per evitare memory leak
    this.sub.unsubscribe();
  }
}