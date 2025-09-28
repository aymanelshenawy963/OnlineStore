import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notfoundproduct',
  standalone: true,
  imports: [],
  templateUrl: './notfoundproduct.component.html',
  styleUrl: './notfoundproduct.component.css'
})
export class NotfoundproductComponent {

  constructor(private router: Router) {}


  onclick(){
    this.router.navigate(['/products']);
  }

}
