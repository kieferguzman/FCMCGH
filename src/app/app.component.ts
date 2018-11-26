import { Component } from '@angular/core';
import { Platform, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { FcmProvider } from '../providers/fcm/fcm';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(public platform: Platform,
     statusBar: StatusBar,
     splashScreen: SplashScreen, public fcm : FcmProvider, public toastCrtl : ToastController) {
    platform.ready().then(() => {
      //fcm.getToken();
      statusBar.styleDefault();
      splashScreen.hide();
     this.notificationSetup();
    });
    
    }
    private async presentToast(message) {
      const toast = await this.toastCrtl.create({
        message,
        duration: 3000
      });
      toast.present();
    }
    private notificationSetup() {
      this.fcm.getToken();
      this.fcm.onNotifications().subscribe(
        (msg) => {
          if (this.platform.is('ios')) {
            this.presentToast(msg.aps.alert);
          } else {
            this.presentToast(msg.body);
          }
        });
    }
   }
  
 



