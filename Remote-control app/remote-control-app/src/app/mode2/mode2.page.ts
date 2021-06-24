import { Component, OnInit } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-mode2',
  templateUrl: './mode2.page.html',
  styleUrls: ['./mode2.page.scss'],
})
export class Mode2Page implements OnInit {
  url: any = "http://172.28.133.173:5000";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'

    })
  };
  @Injectable({
    providedIn: 'root'
  })
  output: string;
  dataSend: string = "";

  constructor(
    private http: HttpClient,
    public toastController: ToastController,
    public alertController: AlertController) { }

  ngOnInit() {
  }
  Mobile() {
    console.log("mobile");
    this.post(this.url, 'm').subscribe((data) => {
    },
      (err) => {
        console.log("Error: ", err);
      },
      () => {
        console.log("completed");
      });

  }
  Laptop() {
    console.log("laptop");
    this.post(this.url, 'p').subscribe((data) => {
    },
      (err) => {
        console.log("Error: ", err);
      },
      () => {
        console.log("completed");
      });

  }

  post(url, dir) {
    return this.http.post<any>(url, { dir }, this.httpOptions);
  }
  get(url) {
    return this.http.get<any>(url, this.httpOptions);
  }
}
