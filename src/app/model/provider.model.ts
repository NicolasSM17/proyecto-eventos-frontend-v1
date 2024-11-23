export interface Provider {
    id: number;
    name: string;
    logo: string;
    whatsapp: string;
    catalogId: string;
    socialMedia?: {
        facebook?: string;
        instagram?: string;
    };
}