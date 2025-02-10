import { Routes } from '@angular/router';

import {ContactoComponent} from './contacto/contacto.component';
import {LoginComponent} from './login/login.component';
import {CestaComponent} from './cesta/cesta.component';
import {CondicionesComponent} from './condiciones/condiciones.component';
import {IndiceComponent} from './indice/indice.component';
import {SignInComponent} from './sign-in/sign-in.component';
import {CatalogoComponent} from './catalogo/catalogo.component';
import {SobrenosotrosComponent} from './sobrenosotros/sobrenosotros.component';
import {RecuperaciocontComponent} from './recuperaciocont/recuperaciocont.component';
import {RecuperaciousuariComponent} from './recuperaciousuari/recuperaciousuari.component';
import {CanvicontrasenyaComponent} from './canvicontrasenya/canvicontrasenya.component';
import {ConfirmarCompteComponent} from '../confirmar-compte/confirmar-compte.component';

export const routes: Routes = [
  {path: '', component: IndiceComponent},
  {path: 'contacto', component: ContactoComponent},
  {path: 'login', component: LoginComponent},
  {path: 'cesta', component: CestaComponent},
  {path: 'condiciones', component: CondicionesComponent},
  {path: 'home', component: IndiceComponent},
  {path: 'signin', component: SignInComponent},
  {path: 'catalogo', component: CatalogoComponent},
  {path: 'sobrenosotros', component: SobrenosotrosComponent},
  {path: 'recuperacioCompte', component: RecuperaciocontComponent},
  {path: 'recuperacio', component: RecuperaciousuariComponent},
  {path: '3z03u2Yn/:usuari', component: CanvicontrasenyaComponent},
  {path: 'confirmacioCompte', component: ConfirmarCompteComponent}
];
