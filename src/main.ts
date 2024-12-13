import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/Componentes/app.config';
import { AppComponent } from './app/Componentes/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
