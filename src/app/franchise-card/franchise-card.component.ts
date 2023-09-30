import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-franchise-card',
  templateUrl: './franchise-card.component.html',
  styleUrls: ['./franchise-card.component.css']
})
export class FranchiseCardComponent implements OnInit {
  displayFranchiseId = localStorage.getItem('franchiseId');
  displayFranchiseReferralId = localStorage.getItem('franchiseReferralId')

  constructor(private userService:UserService) { }

  ngOnInit() {
  }

}
