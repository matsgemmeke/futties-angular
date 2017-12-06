import {environment} from '../../environments/environment.prod';
import {Http, Headers} from '@angular/http';

import {Player} from './player.model';
import {Injectable} from '@angular/core';
import {FuttiesPlayer} from './futtiesplayer.model';

@Injectable()
export class PlayerService {

  private headers: Headers;
  private players: Player[];
  private serverUrl: string;

  constructor(private http: Http) {
    this.headers = new Headers({'Content-Type': 'application/json'});
    this.serverUrl = environment.serverUrl + '/players';

    console.log(this.http);
  }

  // Het ophalen van bestaande players uit de database
  fetchPlayers(): void {
    this.http.get(this.serverUrl, {headers: this.headers})
      .toPromise()
      .then(players => {
        console.log(players.json());
        this.players = players.json() as FuttiesPlayer[];
      })
      .catch(error => {
        console.log(error.message);
      });
  }

  public getPlayerByIndex(index: number): Player {
    return this.players[index];
  }

  public getPlayerByName(name: string): Player {
    return this.players.find({name: name}[0]);
  }

  public getPlayers(): Player[] {
    return this.players;
  }
}