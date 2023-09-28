import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

interface Franchise {
  id: number;
  name: string;
  city: string;
}

@Component({
  selector: 'app-franchise-list',
  templateUrl: './franchise-list.component.html',
  styleUrls: ['./franchise-list.component.css']
})
export class FranchiseListComponent implements OnInit {


  displayedColumns: string[] = ['id', 'name', 'city'];
  dataSource: MatTableDataSource<Franchise>;
  constructor() {
    // Dummy data
    const dummyData: Franchise[] = [
      { id: 1, name: 'Franchise 1', city: 'City A' },
      { id: 2, name: 'Franchise 2', city: 'City B' },
      { id: 3, name: 'Franchise 3', city: 'City C' }
    ];

    this.dataSource = new MatTableDataSource(dummyData);
  }

  ngOnInit() {
  }

}
