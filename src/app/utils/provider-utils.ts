export class ProviderUtils {
    /**
     * Genera un enlace de WhatsApp con un mensaje predefinido
     * @param phoneNumber Número de teléfono incluyendo código de país
     * @param message Mensaje opcional (por defecto "Estoy interesado en sus productos")
     * @returns URL de WhatsApp formateada
     */
    static generateWhatsAppLink(phoneNumber: string, message: string = 'Estoy interesado en sus productos'): string {
        try {
            // Limpiamos el número de teléfono de cualquier caracter no numérico
            const cleanNumber = phoneNumber.replace(/\D/g, '');
            
            // Validamos que el número tenga un formato válido
            if (cleanNumber.length < 10) {
                throw new Error('Número de teléfono inválido');
            }

            // Codificamos el mensaje para la URL
            const encodedMessage = encodeURIComponent(message);

            // Retornamos el enlace de WhatsApp
            return `https://wa.me/${cleanNumber}?text=${encodedMessage}`;
        } catch (error) {
            console.error('Error al generar el enlace de WhatsApp:', error);
            return '#'; // Retornamos un enlace vacío en caso de error
        }
    }

    /**
     * Valida el formato de un número de teléfono
     * @param phoneNumber Número de teléfono a validar
     * @returns boolean indicando si el formato es válido
     */
    static isValidPhoneNumber(phoneNumber: string): boolean {
        // Elimina cualquier caracter que no sea número
        const cleanNumber = phoneNumber.replace(/\D/g, '');
        
        // Verifica que tenga entre 10 y 15 dígitos (estándar internacional)
        return cleanNumber.length >= 10 && cleanNumber.length <= 15;
    }

    /**
     * Formatea un número de teléfono para mostrar en la UI
     * @param phoneNumber Número de teléfono a formatear
     * @returns Número formateado para mostrar
     */
    static formatPhoneNumberForDisplay(phoneNumber: string): string {
        const cleanNumber = phoneNumber.replace(/\D/g, '');
        
        // Si el número empieza con +51 (Perú), lo formateamos específicamente
        if (cleanNumber.startsWith('51')) {
            const number = cleanNumber.slice(2); // Removemos el 51
            return `+51 ${number.slice(0, 3)} ${number.slice(3, 6)} ${number.slice(6)}`;
        }
        
        return phoneNumber; // Si no coincide con el formato esperado, retornamos el original
    }

    /**
     * Genera la URL para visualizar un catálogo PDF
     * @param catalogId Identificador del catálogo
     * @param basePath Ruta base donde se almacenan los catálogos (opcional)
     * @returns URL completa del catálogo
     */
    static generateCatalogUrl(catalogId: string, basePath: string = 'assets/catalogs'): string {
        return `${basePath}/${catalogId}.pdf`;
    }
}