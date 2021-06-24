import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
//import { HTTP } from '@ionic-native/http/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HttpClientModule  } from '@angular/common/http';
//import { map } from 'rxjs/operators';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
// import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
// const config: SocketIoConfig = { url: 'http://localhost:3001', options: {} };
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule ],
  providers: [
    StatusBar,
    SplashScreen,
      BluetoothSerial,
      
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
