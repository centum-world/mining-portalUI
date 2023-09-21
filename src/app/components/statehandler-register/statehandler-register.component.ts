import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { allState } from '../common/states';

@Component({
  selector: 'app-statehandler-register',
  templateUrl: './statehandler-register.component.html',
  styleUrls: ['./statehandler-register.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class StatehandlerRegisterComponent implements OnInit {

  allStates = allState.states;
  
  constructor() { }
  
  

  ngOnInit() {
  console.log(allState.states)
  }

}
