import { Routes } from '@angular/router';

import {ContactoComponent} from './contacto/contacto.component';
import {LoginComponent} from './login/login.component';
import {CestaComponent} from './cesta/cesta.component';
import {CondicionesComponent} from './condiciones/condiciones.component';
import {IndiceComponent} from './indice/indice.component';
import {SignInComponent} from './sign-in/sign-in.component';
import {CatalogoComponent} from './catalogo/catalogo.component';
import {SobrenosotrosComponent} from './sobrenosotros/sobrenosotros.component';

export const routes: Routes = [
  {path: '', component: IndiceComponent},
  {path: 'contacto', component: ContactoComponent},
  {path: 'login', component: LoginComponent},
  {path: 'cesta', component: CestaComponent},
  {path: 'condiciones', component: CondicionesComponent},
  {path: 'home', component: IndiceComponent},
  {path: 'signin', component: SignInComponent},
  {path: 'catalogo', component: CatalogoComponent},
  {path: 'sobrenosotros', component: SobrenosotrosComponent}];
