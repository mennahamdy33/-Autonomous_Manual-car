import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-saving',
  templateUrl: './saving.page.html',
  styleUrls: ['./saving.page.scss'],
})
export class SavingPage implements OnInit {

  constructor(public photoService: PhotoService) { }

  ngOnInit() {
  }

}
