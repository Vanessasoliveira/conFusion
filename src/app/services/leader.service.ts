import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }

  getLeaders(): Promise<Leader[]>{
    return new Promise(resolve => {
      //simulate server latency with 2 second delay
      setTimeout(() => resolve(LEADERS), 2000);
  });
}

  getLeader(id: string): Promise<Leader>{
    return new Promise(resolve => {
      //simulate server latency with 2 second delay
      setTimeout(() => resolve(LEADERS.filter((leader)=> (leader.id === id))[0]), 2000);
    });
  }
  getNameLeader(id: string): Promise<Leader>{
    return new Promise(resolve => {
      //simulate server latency with 2 second delay
      setTimeout(() => resolve(LEADERS.filter((leader)=> (leader.name))[0]), 2000);
    });
  }

  getImageLeader(): Promise<Leader>{
    return Promise.resolve(LEADERS.filter((leader)=> leader.image)[0]);
  }

  getDesignation(id: string): Promise<Leader>{
    return Promise.resolve(LEADERS.filter((leader)=> (leader.designation))[0]);
  }

  getAbbrLeader(): Promise<Leader>{
    return Promise.resolve(LEADERS.filter((leader)=> leader.image)[0]);
  }

  getFeaturedLeader(): Promise<Leader>{
    return new Promise(resolve => {
      //simulate server latency with 2 second delay
      setTimeout(() => resolve(LEADERS.filter((leader)=> leader.featured)[0]), 2000);
    });
  }

  getDescriptionLeader(): Promise<Leader>{
    return Promise.resolve(LEADERS.filter((leader)=> leader.image)[0]);
  }


}
