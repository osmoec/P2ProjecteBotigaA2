import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {ServeiUsuarisService} from '../../../Servicios/servei-usuaris.service';
import {ConnectorBDService} from '../../../Servicios/connector-bd.service';
import {Router} from '@angular/router';
// @ts-ignore
import {RecaptchaModule} from 'ng-recaptcha';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-enquesta-sadisfacio-clients',
  standalone: true,
  imports: [FormsModule, RecaptchaModule, NgIf],
  templateUrl: './enquesta-sadisfacio-clients.component.html',
  styleUrl: './enquesta-sadisfacio-clients.component.css'
})
export class EnquestaSadisfacioClientsComponent {
  grauSadisfacioProducte: number = 0;
  grauSadisfacioServei: number = 0;
  notaRecomenacio: number = 0;
  comentari: string = "";
  inici: number = 0;
  final: number = 0;
  exit: boolean | undefined | number;
  check1: boolean | undefined;
  check2: boolean | undefined;
  check3: boolean | undefined;

  // 🔐 Esta es la variable que te faltaba para que funcione el captcha
  captchaResolt: boolean = false;


  constructor(
    public http: HttpClient,
    public serveiUsuai: ServeiUsuarisService,
    public conectordb: ConnectorBDService,
    public router: Router
  ) {}
  ngOnInit(): void {
    if (!this.serveiUsuai.usuari_logat_bool) {
      this.serveiUsuai.noAdmin();
    }
    this.començarContador();
    console.log(this.inici);
  }

  ngAfterViewInit() {
    window.addEventListener("message", this.onCaptchaMessage.bind(this));
  }

  onCaptchaMessage(event: MessageEvent) {
    if (event.data === "captcha-passed") {
      console.log("¡Captcha completado!");
      this.captchaResolt = true;
    }
  }

  enviarEnquesta() {
    if (!this.captchaResolt) {
      console.warn("Captcha no completado");
      return;
    }

    if (this.grauSadisfacioServei == 0 && this.grauSadisfacioProducte == 0 && this.notaRecomenacio == 0) {
      this.exit = 1;

      if (this.check1) {
        if (this.comentari == "") {
          this.exit = 2;
          if (this.check2) {
            this.procesarEnquesta();
          }
        }
      }
    } else if (this.comentari == "") {
      this.exit = 3;
      if (this.check3) {
        this.procesarEnquesta();
      }
    } else if (this.grauSadisfacioServei > 0 && this.grauSadisfacioProducte > 0 && this.notaRecomenacio > 0) {
      this.procesarEnquesta();
    }
  }

  procesarEnquesta() {
    this.final = Date.now();
    let tempsDins = this.final - this.inici;
    console.log(tempsDins - 1000);

    let tempsDef = "";

    if ((tempsDins / 3600000) >= 1) {
      tempsDef = (tempsDins / 3600000) + ' h';
    } else if ((tempsDins / 60000) >= 1) {
      tempsDef = (tempsDins / 60000) + ' m';
    } else {
      tempsDef = (tempsDins / 1000) + ' s';
    }

    console.log(tempsDef);

    let enquesta = {
      usuari: this.serveiUsuai.usuari_logat?.usuario,
      nom: this.serveiUsuai.usuari_logat?.nombre,
      cognom: this.serveiUsuai.usuari_logat?.apellido,
      correu: this.serveiUsuai.usuari_logat?.correo,
      telefon: this.serveiUsuai.usuari_logat?.telefono,
      grauSadisfacio: this.grauSadisfacioProducte,
      grauSadisfacioServei: this.grauSadisfacioServei,
      notaRecomenacio: this.notaRecomenacio,
      comentari: this.comentari,
      tempsDins: tempsDef
    };

    this.check1 = undefined;
    this.check2 = undefined;
    this.check3 = undefined;

    this.conectordb.enviarFormulari(enquesta).subscribe(res => {
      this.exit = res;
    });
    this.conectordb.enviarFormulari(enquesta).subscribe(res=>{
        this.exit = res
    })

    if (this.exit) {
      setTimeout(() => {
        this.router.navigate(['/home']);
      }, 5000);
    }

  }

  començarContador() {
    this.inici = Date.now();
  }

  onChangeCheck(checkID: string, numeroCheck: number) {
    let check = document.getElementById(checkID) as HTMLInputElement;

    if (numeroCheck == 1) {
      this.check1 = check.checked;
    } else if (numeroCheck == 2) {
      this.check2 = check.checked;
    } else if (numeroCheck == 3) {
      this.check3 = check.checked;
    }
  }

  onNumberChange(id: number) {
    if (id === 1) {
      if (this.grauSadisfacioProducte == null || this.grauSadisfacioProducte < 0) {
        this.grauSadisfacioProducte = 0;
      } else if (this.grauSadisfacioProducte > 100) {
        this.grauSadisfacioProducte = 100;
      }
    }
    else if (id === 2) {
      if (this.grauSadisfacioServei == null || this.grauSadisfacioServei < 0) {
        this.grauSadisfacioServei = 0;
      } else if (this.grauSadisfacioServei > 100) {
        this.grauSadisfacioServei = 100;
      }
    }
    else if (id === 3) {
      if (this.notaRecomenacio == null || this.notaRecomenacio < 0) {
        this.notaRecomenacio = 0;
      } else if (this.notaRecomenacio > 100) {
        this.notaRecomenacio = 100;
      }
    }
    console.log(this.grauSadisfacioProducte + ' ' + this.grauSadisfacioServei + ' ' + this.notaRecomenacio);

  }
}
