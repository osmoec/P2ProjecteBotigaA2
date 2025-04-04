import { Routes } from '@angular/router';

import {ContactoComponent} from './usuario/contacto/contacto.component';
import {LoginComponent} from './usuario/login/login.component';
import {CestaComponent} from './usuario/cesta/cesta.component';
import {CondicionesComponent} from './usuario/condiciones/condiciones.component';
import {IndiceComponent} from './usuario/indice/indice.component';
import {SignInComponent} from './usuario/sign-in/sign-in.component';
import {CatalogoComponent} from './usuario/catalogo/catalogo.component';
import {SobrenosotrosComponent} from './usuario/sobrenosotros/sobrenosotros.component';
import {RecuperaciocontComponent} from './usuario/recuperaciocont/recuperaciocont.component';
import {RecuperaciousuariComponent} from './usuario/recuperaciousuari/recuperaciousuari.component';
import {CanvicontrasenyaComponent} from './usuario/canvicontrasenya/canvicontrasenya.component';
import {ConfirmarCompteComponent} from './usuario/confirmar-compte/confirmar-compte.component';
import {ModificarDadesComponent} from './usuario/modificar-dades/modificar-dades.component';
import {AfeguirProducteComponent} from './Administrador/afeguir-producte/afeguir-producte.component';
import {
  EnquestaSadisfacioClientsComponent
} from './usuario/enquesta-sadisfacio-clients/enquesta-sadisfacio-clients.component';
import {AdministradorComponent} from './Administrador/administrador.component';
import {OfertasComponent} from './Administrador/ofertas/ofertas.component';
import {HistorialProductesComponent} from './Administrador/historial-productes/historial-productes.component';

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
  {path: 'confirmacioCompte', component: ConfirmarCompteComponent},
  {path: 'modificarDades',component: ModificarDadesComponent},
  {path: 'sobrenosotros', component: SobrenosotrosComponent},
  {path: 'afeguirCotxe', component: AfeguirProducteComponent},
  {path: 'enquestaClient', component: EnquestaSadisfacioClientsComponent},
  {path: 'ofertas', component: OfertasComponent},
  {path: 'enquestaClient', component: EnquestaSadisfacioClientsComponent},
  {path:'er6oo890$pwkjry!g78feoe3krju89o890$pwkjfedw44ler6oo890$pwkjry!g78fere=irgj¨ewdl', component: AdministradorComponent},
  {path:'historialProductes',component: HistorialProductesComponent}
];


