import { Injectable } from '@angular/core';
import {
  Plugins, CameraResultType, Capacitor, FilesystemDirectory,
  CameraPhoto, CameraSource, FilesystemEncoding
} from '@capacitor/core';
// import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
// import { File } from '@ionic-native/file/ngx';
import { ToastController } from '@ionic/angular';

const { Camera, Filesystem, Storage } = Plugins;
@Injectable({
  providedIn: 'root'
})

export class PhotoService {
  public photos: Photo[] = [];

  // fileTransfer: FileTransferObject = this.transfer.create();
  // Upload a file:

  constructor(public toastController: ToastController,
  ) { }

  // private async readAsBase64(cameraPhoto: CameraPhoto) {
  //   // Fetch the photo, read as a blob, then convert to base64 format
  //   const response = await fetch(cameraPhoto.webPath!);
  //   const blob = await response.blob();

  //   return await this.convertBlobToBase64(blob) as string;
  // }

  // convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
  //   const reader = new FileReader;
  //   reader.onerror = reject;
  //   reader.onload = () => {
  //     resolve(reader.result);
  //   };
  //   reader.readAsDataURL(blob);
  // });

  private async savePicture(cameraPhoto: CameraPhoto) {
    // Convert photo to base64 format, required by Filesystem API to save
    // const base64Data = await this.readAsBase64(cameraPhoto);

    console.log(cameraPhoto);

    // Write the file to the data directory
    const fileName = new Date().getTime() + '.jpeg';
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: cameraPhoto.base64String,
      directory: FilesystemDirectory.Data
    });

    this.showToast(FilesystemDirectory.Data);
    //uploading
    // let options: FileUploadOptions = {
    //   fileKey: 'file',
    //   fileName: 'name.jpg',
    //   headers: {}
    // }

    // this.fileTransfer.upload(fileName, 'ws://192.168.43.145:8080', options)
    //   .then((data) => {
    //     // success
    //     console.log("success");
    //   }, (err) => {
    //     // error
    //     console.log(err);
    //   })
    // Use webPath to display the new image instead of base64 since it's
    // already loaded into memory
    return {
      filepath: fileName,
      webviewPath: cameraPhoto.webPath
    };

  }

  public async addNewToGallery() {
    // Take a photo haha
    Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
      quality: 80,
      saveToGallery: true,

    }).then(() => { });
    // Save the picture and add it to photo collection
    // const savedImageFile = await this.savePicture(capturedPhoto);
    // this.photos.unshift(savedImageFile);


  }

  async showToast(msj) {
    const toast = await this.toastController.create({
      message: msj,
      duration: 1000
    });
    toast.present();

  }
}
export interface Photo {
  filepath: string;
  webviewPath: string;
}
