import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-navmenu',
  standalone: true,
  imports: [],
  templateUrl: './navmenu.html',
  styleUrl: './navmenu.css'
})
export class Navmenu implements OnInit {

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // this.http.get('/api/HelloWorld', { responseType: 'text' })
    //   .subscribe(resp => console.log(resp));
  }
}
