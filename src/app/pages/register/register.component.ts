import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent{
  @ViewChild('register-container') formContainer!: ElementRef;

  constructor(private elementRef: ElementRef, private userAuthService: UserAuthService, 
              private router: Router) {}

  
  ngAfterViewInit(): void {
    const inputs = this.elementRef.nativeElement.querySelectorAll('.input-group input')  as NodeListOf<HTMLInputElement>;
    const validationMessages = this.elementRef.nativeElement.querySelectorAll('.validation-message');

    // Ocultar todos los mensajes de validación al cargar la página
    validationMessages.forEach((msg: HTMLElement) => {
      msg.style.display = 'none';
    });

    inputs.forEach((input: HTMLInputElement) => {
      input.addEventListener('focus', () => {
        // Al enfocar el input, ocultar el mensaje de validación si estaba mostrado
        const validationMessage = input.parentElement?.querySelector('.validation-message');
        if (validationMessage) {
          (validationMessage as HTMLElement).style.display = 'none';
        }
      
        // Ajustar la altura del contenedor principal
        if (input instanceof HTMLInputElement) {
          input.style.borderColor = '';
        }
        if (this.formContainer.nativeElement instanceof HTMLElement) {
          this.formContainer.nativeElement.style.height = ''; // Restaurar la altura por defecto
        }
      });
      
      input.addEventListener('blur', () => {
        const validationMessage = input.parentElement?.querySelector('.validation-message');
        if (validationMessage) {
          if (input instanceof HTMLInputElement && input.value === '') {
            (validationMessage as HTMLElement).style.display = 'flex';
            input.style.borderColor = 'red';
      
            // Ajustar la altura del contenedor principal solo hacia abajo
            if (this.formContainer.nativeElement instanceof HTMLElement) {
              this.formContainer.nativeElement.style.height = this.formContainer.nativeElement.scrollHeight + 'px';
            }
          } else {
            (validationMessage as HTMLElement).style.display = 'none';
            if (this.formContainer.nativeElement instanceof HTMLElement) {
              this.formContainer.nativeElement.style.height = ''; // Restaurar la altura por defecto si no está vacío
            }
            if (input instanceof HTMLInputElement) {
              input.style.borderColor = '';
            }
          }
        }
      });
    });

    const registerBtn = this.elementRef.nativeElement.querySelector('#register-btn');
    if (registerBtn) {
      registerBtn.addEventListener('click', (event: Event) => {
        // Mostrar mensajes de validación para inputs vacíos al intentar registrar
        inputs.forEach((input: HTMLInputElement) => {
          const validationMessage = input.parentElement?.querySelector('.validation-message') as HTMLElement | null;
          if (validationMessage && input.value === '') {
            validationMessage.style.display = 'flex';
        
            // Ajustar la altura del contenedor principal solo hacia abajo
            input.style.borderColor = 'red';
          }
        });

        // Evitar que el formulario se envíe si hay inputs vacíos
        // Cambiar la verificación de inputs vacíos
        const inputsEmpty = Array.from(inputs).some((input: Element) => {
          if (input instanceof HTMLInputElement) {
            return input.value === '';
          }
          return false;
        });
      });
    }

    // Escuchar eventos de input para manejar el autofill
    inputs.forEach((input: HTMLInputElement) => {
      // Verifica si el input tiene un valor (por autofill o por manual)
      if (input.value) {
        input.classList.add('filled');
      }

      // Añade un evento para cuando se complete el autofill
      input.addEventListener('animationstart', (e: AnimationEvent) => {
        if (e.animationName === 'onAutoFillStart') {
          input.classList.add('filled');
        }
      });

      // Añade un evento para cuando el autofill se retire
      input.addEventListener('animationend', (e: AnimationEvent) => {
        if (e.animationName === 'onAutoFillCancel') {
          input.classList.remove('filled');
        }
      });

      // Añade o remueve la clase 'filled' en eventos de input
      input.addEventListener('input', () => {
        if (input.value) {
          input.classList.add('filled');
        } else {
          input.classList.remove('filled');
        }
      });
    });
  }

  register(registerForm: NgForm){
    console.log(registerForm.value);
    this.userAuthService.register(registerForm.value).subscribe(
      (response) => {
        this.router.navigate(['/login']);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
