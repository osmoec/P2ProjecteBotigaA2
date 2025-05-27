import { Component, OnInit } from '@angular/core';
import * as tf from '@tensorflow/tfjs';
import {NgForOf, NgIf} from '@angular/common';
import {LayersModel} from '@tensorflow/tfjs';
import {ServeiUsuarisService} from '../../Servicios/servei-usuaris.service';

@Component({
  selector: 'app-camara-espia',
  standalone: true,
  imports: [NgForOf, NgIf],
  templateUrl: './camara-espia.component.html',
  styleUrls: ['./camara-espia.component.css']
})
export class CamaraEspiaComponent {
  model: tf.LayersModel | undefined;
  maxPredictions = 0;
  labelContainer: string[] = [];
  video!: HTMLVideoElement;
  labels: string[] = [];
  prediction : any

  constructor(protected serveiUsuaris: ServeiUsuarisService) {
  }

  async initModel() {
    try {
      console.log("Carregant model...");

      const modelURL = '/model-IA/model.json';
      const metadataURL = '/model-IA/metadata.json';

      this.model = await tf.loadLayersModel(modelURL);

      const metadata = await fetch(metadataURL).then(res => res.json());
      this.labels = metadata.labels;
      this.maxPredictions = this.labels.length;
      this.labelContainer = new Array(this.maxPredictions).fill('');

      console.log("Iniciant càmera...");
      await this.setupCamera();
      this.loop();
    } catch (error) {
      console.error("Error iniciant model o càmera:", error);
      alert("Error carregant model o càmera.");
    }
  }

  async setupCamera() {
    this.video = document.createElement('video');
    this.video.width = 200;
    this.video.height = 200;
    this.video.autoplay = true;
    this.video.style.transform = 'scaleX(-1)'; // Flip horizontal

    const container = document.getElementById('webcam-container');
    if (container) {
      container.innerHTML = ''; // neteja
      container.appendChild(this.video);
    }

    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    this.video.srcObject = stream;

    return new Promise<void>((resolve) => {
      this.video.onloadedmetadata = () => resolve();
    });
  }

  async loop() {
    if (this.model && this.video.readyState === this.video.HAVE_ENOUGH_DATA) {
      await this.predict();
      await this.delay(1000)
    }
    requestAnimationFrame(() => this.loop());
  }

  async predict() {
    const tensor = tf.browser
      .fromPixels(this.video)
      .resizeNearestNeighbor([224, 224])
      .toFloat()
      .div(255.0)
      .expandDims(0);

    this.prediction = this.model!.predict(tensor) as tf.Tensor;
    if (Array.isArray(this.prediction)) {
      throw new Error("Prediction returned multiple tensors, expected single output tensor.");
    }

    const values = await this.prediction.data();
    for (let i = 0; i < this.maxPredictions; i++) {
      this.labelContainer[i] = `${this.labels[i]}: ${values[i].toFixed(2)}`;
    }

    console.log(values[0])

    if (values[0] < 0.2){
      if(this.serveiUsuaris.usuari_logat_bool) {
        setTimeout(() => {
          if (values[0] < 0.2){
            this.serveiUsuaris.olvidarUsuario()
            window.location.reload();
          }
        }, 2000);

      }
    }


    tf.dispose(tensor);

  }
  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }



}
