import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import leaflet from 'leaflet';
import { HomeServices } from './home-services';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('map') mapContainer: ElementRef;
  map: any;
  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public homeService: HomeServices) {

  }

  ionViewDidEnter() {
    this.loadmap();
  }
  
  loadmap() {
    this.map = leaflet.map("map").fitWorld();
    leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attributions: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18
    }).addTo(this.map);
    this.map.locate({
      setView: true,
      maxZoom: 10
    }).on('locationfound', (e) => {
      this.map.setZoom(15);
      let markerGroup = leaflet.featureGroup();
      let marcaInicial= this.homeService.marcarPosicionInicial(e.latitude, e.longitude);
      markerGroup.addLayer(marcaInicial);
      
      let listaMarkers = this.homeService.obtenerMarkers(e.latitude, e.longitude, this.modalCtrl);
      listaMarkers.forEach(element => {
        markerGroup.addLayer(element);
      });
      this.map.addLayer(markerGroup);
    }).on('locationerror', (err) => {
      alert(err.message);
    })

  }

}