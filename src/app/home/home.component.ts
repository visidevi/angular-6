import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() {
    console.log('oks')
    let c: number = 1;
    let b: number = 2;
    let e: string = '1';
    let f: string = '2';
    let i = [c, b, e, f];
    console.log(c + b, e + f)
    let j: boolean[] = [true, false]
    let n : any[] = [1,2,'tres', false, {}]
    console.log(n)
  }

  ngOnInit(): void {
  }

}
