import { Component } from "@angular/core";
import { Platform, NavParams, ViewController } from "ionic-angular";

@Component({
    selector: 'ModalVista',
    templateUrl: 'ModalVista.html'
  })
  export class ModalVista {
    constructor(public platform: Platform,
        public params: NavParams,
        public viewCtrl: ViewController) {
  
    }
    dismiss() {
        this.viewCtrl.dismiss();
      }
}