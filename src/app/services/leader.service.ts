import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }

  getLeaders(): Observable<Leader[]>{
    return of(LEADERS).pipe(delay(2000));

}

  getLeader(id: string): Observable<Leader>{
    return of(LEADERS.filter((leader)=> (leader.id === id))[0]).pipe(delay (2000));
  }
  getNameLeader(id: string): Observable<Leader>{
    return of(LEADERS.filter((leader)=> (leader.name))[0]).pipe(delay (2000));
  }

  getImageLeader(): Observable<Leader>{
    return of(LEADERS.filter((leader)=> leader.image)[0]).pipe(delay (2000));
  }

  getDesignation(id: string): Observable<Leader>{
    return of(LEADERS.filter((leader)=> (leader.designation))[0]).pipe(delay (2000));
  }

  getAbbrLeader(): Observable<Leader>{
    return of(LEADERS.filter((leader)=> leader.image)[0]).pipe(delay (2000));
  }

  getFeaturedLeader(): Observable<Leader>{
    return of(LEADERS.filter((leader)=> leader.featured)[0]).pipe(delay (2000));
  }

  getDescriptionLeader(): Observable<Leader>{
    return of(LEADERS.filter((leader)=> leader.image)[0]).pipe(delay (2000));
  }


}
