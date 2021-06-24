import { Component, OnInit } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
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

  constructor(private http: HttpClient,
    public toastController: ToastController,
    public alertController: AlertController) { }
  ngOnInit() { }
  One() {
    this.presentToast("One");

    this.post(this.url, 'o').subscribe((data) => {
    },
      (err) => {
        // console.log("Error: ", err);
        this.presentToast(err);

      },
      () => {
        // console.log("completed");

      });


  }
  Two() {
    this.presentToast("Two");

    this.post(this.url, 't').subscribe((data) => {
    },
      (err) => {
        console.log("Error: ", err);
        this.presentToast(err);

      },
      () => {
        // console.log("completed");

      });


  }
  async presentToast(data) {
    const toast = await this.toastController.create({
      message: data,
      duration: 2000
    });
    toast.present();
  }

  post(url, dir) {

    return this.http.post<any>(url, { dir }, this.httpOptions);

  }
}