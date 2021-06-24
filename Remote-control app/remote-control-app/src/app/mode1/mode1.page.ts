import { Component, OnInit } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-mode1',
  templateUrl: './mode1.page.html',
  styleUrls: ['./mode1.page.scss'],
})

export class Mode1Page implements OnInit {

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
    public alertController: AlertController) {
  }
  ngOnInit() {

    setInterval(() => { this.ID(); }, 3600);

  }

  ID() {
    this.http.get(this.url + '/id').subscribe((data) => {
      const id = document.getElementById('id');
      id.textContent = data['id'];
      console.log("Data: ", data['id']);
    },
      (err) => {
        console.log("Error: ", err);
      },
      () => {
        console.log("completed");
      });
  }
  Stop() {
    console.log("Stop");
    this.presentToast("Stop");

    this.post(this.url, 's').subscribe((data) => {
    },
      (err) => {
        console.log("Error: ", err);
        this.presentToast(err);

      },
      () => {
        // console.log("completed");
        // this.presentToast("complete!");

      });

  }
  moveLeft() {
    console.log("Left");
    this.presentToast("left");

    this.post(this.url, 'l').subscribe((data) => {
    }, (err) => {
      console.log("Error: ", err);
      this.presentToast(err);

    },
      () => {
        // console.log("completed");
      });
    setTimeout(() => { this.Stop(); }, 280);
  }

  moveRight() {
    console.log("Right");
    this.presentToast("right");
    this.post(this.url, 'r').subscribe((data) => {
    },
      (err) => {
        console.log("Error: ", err);
        // this.presentToast(err);

      },
      () => {
        // console.log("completed");
        // this.presentToast("completed");

      });
    setTimeout(() => { this.Stop(); }, 280);

  }
  moveDown() {
    console.log("down");
    this.presentToast("down");

    this.post(this.url, 'b').subscribe((data) => {
    },
      (err) => {
        console.log("Error: ", JSON.stringify(err));
        this.presentToast(JSON.stringify(err));
      },
      () => {
        console.log("completed");
      });
    setTimeout(() => { this.Stop(); }, 800);

  }
  moveUp() {
    console.log("up");
    this.post(this.url, 'f').subscribe((data) => {
    },
      (err) => {
        console.log("Error: ", err);
      },
      () => {
        // console.log("completed");
      });
    setTimeout(() => { this.Stop(); }, 800);
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
  get(url) {

    return this.http.get<any>(url, this.httpOptions);
  }
}
