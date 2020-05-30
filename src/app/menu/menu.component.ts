import { Component, OnInit } from '@angular/core';
import * as Typed from 'typed.js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private router: Router) { }
  public isCollapsed = true;
  ngOnInit(): void {
  }

  goRoadway(menu: string){
      this.router.navigate([menu]);
  }
}
