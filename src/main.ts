

import './aws-polyfills';  // Importa los polyfills primero
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import {Amplify} from 'aws-amplify';
import awsConfig from './aws-exports';
import config from './aws-exports.js';



platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
