import { Injectable } from '@angular/core';
import { Provider } from '../model/provider.model';
import { ProviderUtils } from '../utils/provider-utils';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {
  private providers: Provider[] = [
      {
          id: 1,
          name: 'OPEN',
          logo: 'assets/images/provider1-logo.jpg',
          whatsapp: '+51999999999',
          catalogId: 'cat1',
          socialMedia: {
              facebook: 'https://facebook.com/proveedor1',
              instagram: 'https://instagram.com/proveedor1'
          }
      },
      {
          id: 2,
          name: 'Proveedor 2',
          logo: 'assets/images/provider2-logo.jpg',
          whatsapp: '+51999999998',
          catalogId: 'cat2',
          socialMedia: {
              facebook: 'https://facebook.com/proveedor2',
              instagram: 'https://instagram.com/proveedor2'
          }
      }
  ];

  getProviders(): Provider[] {
      return this.providers;
  }

  getProviderById(id: number): Provider | undefined {
      return this.providers.find(provider => provider.id === id);
  }

  getWhatsAppLink(provider: Provider, message?: string): string {
      return ProviderUtils.generateWhatsAppLink(provider.whatsapp, message);
  }
}