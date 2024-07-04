import { AfterViewInit, Component, ElementRef, ViewChild, ViewEncapsulation  } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.Emulated
  
})
export class LoginComponent implements AfterViewInit {
  @ViewChild('loginForm') loginForm!: NgForm;
  @ViewChild('formContainer') formContainer!: ElementRef;

  email: string = '';
  password: string = '';
  showEmailValidation: boolean = false;
  showPasswordValidation: boolean = false;

  constructor(private elementRef: ElementRef, private userAuthService: UserAuthService, private router: Router) {}

  ngAfterViewInit(): void {
    const inputs = this.elementRef.nativeElement.querySelectorAll('.input-group input') as NodeListOf<HTMLInputElement>;
    const validationMessages = this.elementRef.nativeElement.querySelectorAll('.validation-message');

    // Ocultar todos los mensajes de validación al cargar la página
    validationMessages.forEach((msg: HTMLElement) => {
      msg.style.display = 'none';
    });

    inputs.forEach((input: HTMLInputElement) => {
      input.addEventListener('focus', () => {
        const validationMessage = input.parentElement?.querySelector('.validation-message');
        if (validationMessage) {
          (validationMessage as HTMLElement).style.display = 'none';
        }

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

            if (this.formContainer.nativeElement instanceof HTMLElement) {
              this.formContainer.nativeElement.style.height = this.formContainer.nativeElement.scrollHeight + 'px';
            }
          } else {
            (validationMessage as HTMLElement).style.display = 'none';
            if (this.formContainer.nativeElement instanceof HTMLElement) {
              this.formContainer.nativeElement.style.height = '';
            }
            if (input instanceof HTMLInputElement) {
              input.style.borderColor = '';
            }
          }
        }
      });

      input.addEventListener('animationstart', (e: AnimationEvent) => {
        if (e.animationName === 'onAutoFillStart') {
          input.classList.add('filled');
        }
      });

      input.addEventListener('animationend', (e: AnimationEvent) => {
        if (e.animationName === 'onAutoFillCancel') {
          input.classList.remove('filled');
        }
      });

      input.addEventListener('input', () => {
        if (input.value) {
          input.classList.add('filled');
        } else {
          input.classList.remove('filled');
        }
      });
    });

    const loginBtn = this.elementRef.nativeElement.querySelector('.login-btn');
    if (loginBtn) {
      loginBtn.addEventListener('click', (event: Event) => {
        event.preventDefault();

        let anyInputEmpty = false;
        inputs.forEach((input: HTMLInputElement) => {
          const validationMessage = input.parentElement?.querySelector('.validation-message') as HTMLElement | null;
          if (validationMessage && input.value === '') {
            validationMessage.style.display = 'flex';
            input.style.borderColor = 'red';
            anyInputEmpty = true;
          } else if (validationMessage) {
            validationMessage.style.display = 'none';
            input.style.borderColor = '';
          }
        });

        if (anyInputEmpty) {
          return;
        } else {
          if (this.loginForm) {
            this.loginForm.ngSubmit.emit();
          }
        }
      });
    }

    inputs.forEach((input: HTMLInputElement) => {
      if (input.value) {
        input.classList.add('filled');
      }

      input.addEventListener('input', () => {
        if (input.value) {
          input.classList.add('filled');
        } else {
          input.classList.remove('filled');
        }
      });
    });
  }

  login(loginForm: NgForm) {
    this.userAuthService.login(loginForm.value).subscribe(
      (response: any) => {
        console.log(response);
        this.userAuthService.setToken(response.token);
        this.router.navigate(['/selectInstitution']);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    this.showEmailValidation = !this.isValidEmail(this.email);
    this.showPasswordValidation = !this.isValidPassword(this.password);

    if (!this.showEmailValidation && !this.showPasswordValidation) {
      console.log('Email:', this.email);
      console.log('Password:', this.password);
    }
  }

  isValidEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  isValidPassword(password: string): boolean {
    return password.length >= 8 && password.length <= 40;
  }
}
