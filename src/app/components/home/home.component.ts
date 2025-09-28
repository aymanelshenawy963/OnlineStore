import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  featuredProducts: any[] = [];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getProducts().subscribe(data => {
      this.featuredProducts = data.slice(0, 3); 
    });
  }
}
