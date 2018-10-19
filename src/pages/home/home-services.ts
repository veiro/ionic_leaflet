import { ModalVista } from "../modal/ModalVista";
import leaflet from 'leaflet';
import { Injectable } from "@angular/core";

@Injectable()
export class HomeServices {
    constructor() { }

    public marcarPosicionInicial(lat, long){
        let marker: any = leaflet.marker([lat, long]);
        return marker
    }

    public obtenerMarkers(lat, long, modalCtrl): any[] {
        let latitude = lat;
        let longitude = long;
        let listaMarkers = [];
        for (let j = 0; j < 10; j++) {
            latitude = latitude + 0.005;
            longitude = long;
            for (let index = 0; index < 10; index++) {
                longitude = longitude + 0.005;

                let marker: any = leaflet.marker([latitude, longitude]).on('click', () => {
                    //accion al tocar el marker        
                    const modal = modalCtrl.create(ModalVista);
                    modal.present();
                })
                listaMarkers.push(marker);
            }
        }
        return listaMarkers;
    }
}