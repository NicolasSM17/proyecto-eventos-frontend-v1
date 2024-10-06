import { Component, OnInit } from '@angular/core';
import { Card } from 'src/app/model/card.model';
import { CardService } from 'src/app/services/card.service';
import { UserAuthService } from 'src/app/services/user-auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-payment-method',
  templateUrl: './add-payment-method.component.html',
  styleUrls: ['./add-payment-method.component.css']
})
export class AddPaymentMethodComponent implements OnInit{
  userId: number;
  firstName: string = '';
  lastName: string = '';
  expirationDate: string = '';
  cardNumber: string = '';
  cvv: string = '';
  formSubmitted: boolean = false;
  showModal = false;
  showFormContainer: boolean = true;
  showFormConfirm: boolean = false;
  
  constructor(private cardService: CardService, private userAuthService: UserAuthService) {}

  ngOnInit(): void {
    this.userId = this.userAuthService.getUserId();
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;

    // Restablecer los campos del formulario
  this.cardNumber = '';
  this.firstName = '';
  this.lastName = '';
  this.expirationDate = '';
  this.cvv = '';

  // Restablecer los estados de visualización de los contenedores
  this.showFormContainer = true;
  this.showFormConfirm = false;

  // Remover la clase 'valid' de todos los inputs
  const inputs = document.querySelectorAll('.form-group input');
  inputs.forEach(input => {
    input.classList.remove('valid');
  });
  
  // Resetear otros estados necesarios
  this.formSubmitted = false;
  }

   // Método para validar si todos los campos son válidos
   isFormValid(): boolean {
    const isCardNumberValid = this.cardNumber && document.getElementById('card-number')?.classList.contains('valid');
    const isFirstNameValid = this.firstName && document.getElementById('first-name')?.classList.contains('valid');
    const isLastNameValid = this.lastName && document.getElementById('last-name')?.classList.contains('valid');
    const isExpirationDateValid = this.expirationDate && document.getElementById('expiration-date')?.classList.contains('valid');
    const isCVVValid = this.cvv && document.getElementById('cvv')?.classList.contains('valid');
  
    return isCardNumberValid && isFirstNameValid && isLastNameValid && isExpirationDateValid && isCVVValid;
  }

  // Método para manejar el foco en el input CVV
  onCVVFocus() {
    const cardPreview = document.querySelector('.credit-card-preview');
    if (cardPreview) {
      cardPreview.classList.add('flipped');
    }
  }

  // Método para manejar cuando se pierde el foco en el input CVV
  onCVVBlur() {
    const cardPreview = document.querySelector('.credit-card-preview');
    if (cardPreview) {
      cardPreview.classList.remove('flipped');
    }
  }

  validateCardNumber(event: any): void {
    const input = event.target;
    let value = input.value.replace(/\s+/g, ''); // Remueve todos los espacios
    
    let detectedCardType = '';
    let formattedValue = '';
    let maxLength = 16; // Configuración por defecto, puede ajustarse

    // Detectar la marca de la tarjeta
    if (/^(?!4005550000000001|4012888888881881|4111111111111111|4444333322221111|4539105011539664|4555400000555123|4564456445644564|4544182174537267|4716914706534228|4916541713757159|4916615639346972|4917610000000000)(4)/.test(value)) {
      detectedCardType = 'Visa';
      maxLength = 16;
  }
   else if (/^(?!5100080000000000|5105105105105100|5111111111111118|5123456789012346|5123619745395853|5138495125550554|5274576394259961|5301745529138831|5311531286000465|5364587011785834|5404000000000001|5431111111111111|5454545454545454|5459886265631843|5460506048039935|5500939178004613|5555555555554444|5556400000551234|5565552064481449|5597507644910558)(?!220\d|221\d|2220|272[1-9]|27[3-9]\d)(5[1-5]|2[2-7])/.test(value)) {
      detectedCardType = 'MasterCard';
      maxLength = 16;
    }
      else if (/^(?!30204169322643|30218047196557|30221511563252|30464000005512|36000000000008|36148900647913|36700102000000|38520000023237|39123456789019)(30[0-5]|3095|3[689]\d{0,2})\d{0,10}/.test(value)) {
      detectedCardType = 'DinersClub';
      maxLength = 14; // Diner's Club tiene 14 dígitos
    } else if (/^(?!340000000000009|341111111111111|343434343434343|345678901234564|345640000055123|346827630435344|370000000000002|370000200000000|370407269909809|370556019309221|371449635398431|374200000000004|375640000055123|376462280921451|377752749896404|378282246310005|378734493671000)3[47]$/.test(value)) {
        detectedCardType = 'Amex';
        maxLength = 15;
    } else if (/^(?!3528000700000000|3528723740022896|3530111333300000|3556400000551234|3566002020360505|3569990000000009)35(2[89]|[3-8])\d{0,12}/.test(value)) {
      detectedCardType = 'JCB';
      maxLength = 16; // JCB tiene 16 dígitos
    } else if (/^(?!6011000990139424|6011111111111117|6011153216371980|6011601160116611|6011687482564166|6011814836905651|6556400000551234)(6011|64[4-9]|65)\d{0,12}/.test(value)) {
      detectedCardType = 'Discover';
      maxLength = 16; // Discover tiene 16 dígitos
     } else if (/^(?!6334580500000000|6334730600000000|6334900000000005|5641820000000005|6331101999990016|6759649826438453|6767676767676767|633473060000000000|633333333333333336|676762222222222222|6767676767676767671)(5[0678]\d{0,17}|6013\d{0,15}|6[23]\d{0,17}|67\d{0,17})$/.test(value)) {
      detectedCardType = 'Maestro';
      maxLength = 19; // Maestro puede tener hasta 19 dígitos
  }

    // Aplicar el formato solo si la marca de la tarjeta es detectada
    if (detectedCardType) {
        formattedValue = this.formatCardNumber(value.slice(0, maxLength), this.getFormatPattern(detectedCardType));
    } else {
        formattedValue = value;
    }

    // Si el valor ingresado excede el máximo permitido, lo cortamos
    if (value.length > maxLength) {
        value = value.slice(0, maxLength);
        formattedValue = this.formatCardNumber(value, this.getFormatPattern(detectedCardType));
    }

    this.cardNumber = formattedValue.trim();
    input.value = formattedValue.trim();

    // Verificar si el número es válido
    let isValid = false;
    if (detectedCardType === 'Maestro') {
        isValid = value.length >= 16 && value.length <= maxLength; // Maestro es válido entre 16 y 19 dígitos
    } else {
        isValid = value.length === maxLength;
    }
    input.classList.toggle('valid', isValid);

    this.updateCardTypeImage(detectedCardType);
    this.updateCardBackground(detectedCardType);
}

getFormatPattern(cardType: string): number[] {
    switch (cardType) {
        case 'Visa':
        case 'MasterCard':
        case 'JCB':
        case 'Discover':
        case 'Maestro':
            // La tarjeta Maestro puede tener longitudes variables de 16 a 19 dígitos.
            
            return this.cardNumber.length <= 16 ? [4, 4, 4, 4] : [4, 4, 4, 4, 3];
        case 'Amex':
            return [4, 6, 5];
        case 'DinersClub':
            return [4, 6, 4];
        default:
            return [4, 4, 4, 4]; // Formato por defecto
    }
}




  formatCardNumber(value: string, pattern: number[]): string {
    let formatted = '';
    let position = 0;
  
    pattern.forEach((group) => {
      if (value.length > position) {
        formatted += value.substr(position, group) + ' ';
      }
      position += group;
    });
  
    return formatted.trim();
  }

  // TypeScript
updateCardTypeImage(cardType: string): void {
  const imageMap = {
    'Visa': 'https://images.rappi.com/web/visa.png?e=webp',
    'MasterCard': 'https://images.rappi.com/web/mastercard.png?e=webp',
    'DinersClub': 'https://images.rappi.com/web/diners_club.png?e=webp',
    'Amex': 'https://images.rappi.com/web/american_express.png?e=webp',
    'JCB': 'https://images.rappi.com/web/jcb.png?e=webp',
    'Discover': 'https://images.rappi.com/web/discover.png?e=webp',
    'Maestro': 'https://images.rappi.com/web/maestro.png?e=webp',
  };

  const cardImage = document.getElementById('card-type') as HTMLImageElement;
  cardImage.src = imageMap[cardType] || 'https://images.rappi.com/web/default.png?e=webp';
}


// TypeScript
updateCardBackground(cardType: string): void {
  const backgroundMap = {
    'Visa': '-webkit-linear-gradient(0deg, #0a74da, #00a1e6)',
    'MasterCard': '-webkit-linear-gradient(0deg, #ff5f00, #f79e1b)',
    'DinersClub': '-webkit-linear-gradient(0deg, #0067a3, #000080)',
    'Amex': '-webkit-linear-gradient(0deg, #2E77BB, #133074)',
    'JCB': '-webkit-linear-gradient(0deg, #004b87, #0094e4)',
    'Discover': '-webkit-linear-gradient(0deg, #f47216, #e1d6c4)',
    'Maestro': '-webkit-linear-gradient(0deg, #CC2131, #f37021)',
  };

  const cardFront = document.querySelector('.card-front') as HTMLElement;
  const cardBack = document.querySelector('.card-back') as HTMLElement;

  const backgroundStyle = backgroundMap[cardType] || '-webkit-linear-gradient(0deg, #c7cbcf, #7d858d)';
  
  cardFront.style.backgroundImage = backgroundStyle;
  cardBack.style.backgroundImage = backgroundStyle;
}

  
  // Método para validar los nombres (firstName y lastName)
  validateName(event: any): void {
    const input = event.target;
    input.value = input.value.replace(/[^a-zA-Z]/g, '').toUpperCase().slice(0, 50); 

    if (input.id === 'first-name') {
      this.firstName = input.value;
      input.classList.toggle('valid', this.firstName.length >= 3);
    } else if (input.id === 'last-name') {
      this.lastName = input.value;
      input.classList.toggle('valid', this.lastName.length >= 3);
    }
  }

  validateExpirationDate(event: any): void {
    let input = event.target.value.replace(/\D/g, ''); 
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear().toString().slice(2); 
    const currentMonth = currentDate.getMonth() + 1; 

    if (input.length > 0) {
        // Agregar un 0 inicial si el primer dígito es mayor a 1 (para evitar valores como 3X para el mes)
        if (input[0] > '1') {
            input = '0' + input;
        }
        if (input.length > 2) {
            input = input.slice(0, 2) + '/' + input.slice(2, 4); 
        }
    }

    // Actualizar el valor del input y el modelo
    event.target.value = input;
    this.expirationDate = input;

    // Verificar si la fecha es válida solo si la longitud es exactamente 5 (incluyendo el '/')
    if (this.expirationDate.length === 5) {
        const [inputMonth, inputYear] = this.expirationDate.split('/').map(part => parseInt(part, 10)); 

        let isValidDate = false;
        
        if (inputYear > parseInt(currentYear)) {
            
            isValidDate = true;
        } else if (inputYear === parseInt(currentYear)) {
            
            if (inputMonth >= currentMonth) {
                isValidDate = true;
            }
        }

        // Cambia la clase basada en la validez de la fecha
        event.target.classList.toggle('valid', isValidDate);
    } else {
       
        event.target.classList.remove('valid');
    }
}




   // Método para validar el campo cvv
   validateCVV(event: any): void {
    const input = event.target;
    input.value = input.value.replace(/\D/g, '').slice(0, 4); 
    this.cvv = input.value;

    input.classList.toggle('valid', this.cvv.length >= 3 && this.cvv.length <= 4);
  }

  submitForm(): void {
    if (this.isFormValid()) {

      const newCard: Card = {
        id: null, // Este campo puede ser opcional si el backend lo asigna automáticamente
        numeroTarjeta: this.cardNumber,
        nombreTitular: this.firstName,
        apellidoTitular: this.lastName,
        fechaExpiracion: this.expirationDate,
        cvv: this.cvv
      };

      // Llamada al servicio para guardar la tarjeta
      this.cardService.save(newCard).subscribe(
        (response) => {
          Swal.fire({
            text: "Tarjeta agregada con exito",
            icon: "success"
          });
          this.formSubmitted = true;
        },
        (error) => {
          console.error('Error al guardar la tarjeta:', error);
        }
      );
    }
  }

  restrictionCardNumber(cardNumber: string): string {
    // Verifica si hay un valor de tarjeta válido
    if (cardNumber) {
      // Convierte a un número solo mostrando los últimos 4 dígitos
      const lastFourDigits = cardNumber.slice(-4);
      const maskedDigits = cardNumber.slice(0, -4).replace(/\d/g, '*');
      return maskedDigits + lastFourDigits;
    }
    return cardNumber; // Retorna el valor original si es nulo o vacío
  }

}
