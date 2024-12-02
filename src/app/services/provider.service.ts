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
            logo: 'assets/LogoProvider1-2.png',
            whatsapp: '+51999999999',
            catalogId: 'cat1',
            socialMedia: {
                facebook: 'https://facebook.com/proveedor1',
                instagram: 'https://instagram.com/proveedor1'
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