import { PhotoService } from '../services/photo.service';
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview/ngx';
import { ToastController, AlertController } from '@ionic/angular';
import { Component, OnInit, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {
  image = null;
  camerActive = false;
  picture: any;
  IMAGE_PATH: any;
  isToBack = true;


  constructor(public photoService: PhotoService,
    public cameraPreview: CameraPreview,
    public toastController: ToastController,
    public alertController: AlertController) { }
  ngOnInit() {
    // require("https://unpkg.com/peerjs@1.3.1/dist/peerjs.min.js");
    require('./test.js');

  }

  // camera options (Size and location). In the following example, the preview uses the rear camera and display the preview in the back of the webview
  openCamera() {
    const cameraPreviewOpts: CameraPreviewOptions = {
      x: 80,
      y: 450,
      camera: 'rear',
      tapPhoto: true,
      previewDrag: true,
      toBack: false,
      alpha: 1,
      // storeToFile: true
    }
    this.cameraPreview.startCamera(cameraPreviewOpts);
    // setInterval(this.takePhoto, 2000);
    // this.takePhoto();
  }


  // Set the handler to run every time we take a picture
  // this.cameraPreview.setOnPictureTakenHandler().subscribe((result) => {
  //     console.log(result);
  //     // do something with the result
  //   });

  takePhoto() {
    // // picture options
    const pictureOpts: CameraPreviewPictureOptions = {
      width: 500,
      height: 500,
      quality: 85
    }
    this.showToast("taking..");

    // take a picture
    this.cameraPreview.takePicture(pictureOpts).then((imageData) => {
      // this.showToast("imageTaken");
      this.picture = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      console.log(err);
      this.picture = 'assets/img/test.jpg';
    });


  }
  // Stop the camera preview
  // this.cameraPreview.stopCamera();

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }
  async showToast(msj) {
    const toast = await this.toastController.create({
      message: msj,
      duration: 1000
    });
    toast.present();

  }
  async showError(error) {
    let alert = await this.alertController.create({
      header: 'Error',
      subHeader: error,
      buttons: ['Dismiss']
    });
    await alert.present();
  }
}
