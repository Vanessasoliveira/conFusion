import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }

  getLeaders():Leader[]{
    return LEADERS;
  }

  getLeader(id: string): Leader{
    return LEADERS.filter((leader)=> (leader.id === id))[0];
  }
  getNameLeader(id: string): Leader{
    return LEADERS.filter((leader)=> (leader.name))[0];
  }

  getImageLeader(): Leader{
    return LEADERS.filter((leader)=> leader.image)[0];
  }

  getDesignation(id: string): Leader{
    return LEADERS.filter((leader)=> (leader.designation))[0];
  }

  getAbbrLeader(): Leader{
    return LEADERS.filter((leader)=> leader.image)[0];
  }

  getFeaturedLeader(): Leader{
    return LEADERS.filter((leader)=> leader.featured)[0];
  }

  getDescriptionLeader(): Leader{
    return LEADERS.filter((leader)=> leader.image)[0];
  }


}
