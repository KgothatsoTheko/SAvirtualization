import { Component } from '@angular/core';


@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent {
  panelOpenState = false;
  date:any = new Date().getDate() + '/' + new Date().getMonth() + '/' + new Date().getFullYear()
  value:any = new Date().getTime()
  width:any = 0.4
  height:any = 20
  value2:any = new Date().getTime()
  width2:any = 1.32
  height2:any = 40
  
}
