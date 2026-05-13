import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { PokemonService } from '../../services/pokemon';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-type-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './type-detail.html'
})
export class TypeDetailComponent implements OnInit, OnDestroy {
  pokemon: any = null;  // dati del pokemon selezionato
  typeName = '';        // nome del tipo per il link "torna alla lista"
  private sub!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private service: PokemonService,
    private cr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    // leggo il parametro :name dall'URL (es: /type/fire/detail)
    this.typeName = this.route.snapshot.paramMap.get('name')!;

    // leggo l'url del pokemon passato come query parameter
    const url = this.route.snapshot.queryParamMap.get('url')!;

    // chiamo il service che ritorna un Observable
    const observable = this.service.getPokemonByUrl(url);
    this.sub = observable.subscribe((data: any) => this.onPokemonReceived(data));
  }

  onPokemonReceived(data: any) {
    // salvo i dati del pokemon ricevuti dall'API
    this.pokemon = data;
    // forzo Angular a ridisegnare il template con i nuovi dati
    this.cr.detectChanges();
  }

  ngOnDestroy() {
    // cancello la subscription per evitare memory leak
    this.sub.unsubscribe();
  }
}