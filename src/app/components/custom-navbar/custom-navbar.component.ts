import { HttpErrorResponse } from '@angular/common/http';
import { Component, AfterViewInit, ElementRef, ViewChild, ViewEncapsulation, HostListener, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/model/category.model';
import { CategoryService } from 'src/app/services/category.service';
import { UserAuthService } from 'src/app/services/user-auth.service';

declare var bootstrap: any;

@Component({
  selector: 'app-custom-navbar',
  templateUrl: './custom-navbar.component.html',
  styleUrls: ['./custom-navbar.component.css']
})
export class CustomNavbarComponent {
  @ViewChild('loginForm') loginForm!: NgForm;
  @ViewChild('formContainer') formContainer!: ElementRef;
  @ViewChild('exampleModal1') modalElement!: ElementRef;
  @ViewChild('dropdownMenu') dropdownMenu!: ElementRef;

  isDropdownVisible = false;
  email: string = '';
  password: string = '';
  showEmailValidation: boolean = false;
  showPasswordValidation: boolean = false;
  isOpen = false;
  userId: number;
  categorias: Category[];
  selectedCategorias: string[] = [];

  constructor(private elementRef: ElementRef, private userAuthService: UserAuthService, 
              private router: Router) {}

  ngOnInit(): void {
    this.userId = this.userAuthService.getUserId();
  }

  ngAfterViewInit(): void {
    this.initializeFormValidation();
    this.initializeModal();

    // Añadir el evento de ocultar mensajes de validación al cerrar el modal
    const modalElement = this.modalElement.nativeElement;
    if (modalElement) {
      modalElement.addEventListener('hidden.bs.modal', () => {
        this.resetValidationMessages();
      });
    }
  }

  initializeModal() {
    const modalElement = this.modalElement.nativeElement;
    const modal = new bootstrap.Modal(modalElement, {
      keyboard: false,
      backdrop: 'static'
    });

    modalElement.addEventListener('keydown', (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
      }
    });

    modalElement.addEventListener('click', (event: MouseEvent) => {
      event.stopPropagation();
    });

    document.addEventListener('click', (event: MouseEvent) => {
      if (!modalElement.contains(event.target as Node)) {
        event.stopPropagation();
      }
    });
  }

  initializeFormValidation() {
    const inputs = this.elementRef.nativeElement.querySelectorAll('.input-group input') as NodeListOf<HTMLInputElement>;
    const validationMessages = this.elementRef.nativeElement.querySelectorAll('.validation-message');

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
          this.formContainer.nativeElement.style.height = ''; // Restore default height
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

  resetValidationMessages() {
    const validationMessages = this.elementRef.nativeElement.querySelectorAll('.validation-message');
    validationMessages.forEach((msg: HTMLElement) => {
      msg.style.display = 'none';
    });

    const inputs = this.elementRef.nativeElement.querySelectorAll('.input-group input') as NodeListOf<HTMLInputElement>;
    inputs.forEach((input: HTMLInputElement) => {
      input.style.borderColor = '';
      input.value = ''; 
      input.classList.remove('filled'); 
    });
  }

  toggleDropdown() {
    this.isDropdownVisible = !this.isDropdownVisible;
    const filterButton = this.elementRef.nativeElement.querySelector('#filterButton');
    if (this.isDropdownVisible) {
      setTimeout(() => {
        this.dropdownMenu.nativeElement.classList.add('show');
        filterButton.classList.add('active');
      }, 10);
    } else {
      this.dropdownMenu.nativeElement.classList.remove('show');
      filterButton.classList.remove('active');
    }
  } 

  // Escucha los clics fuera del dropdown para cerrarlo
  @HostListener('document:click', ['$event'])
  closeDropdown(event: Event) {
    const dropdownMenu = document.getElementById("dropdownMenu");
    const filterButton = document.getElementById("filterButton");

    if (!event.target) return;
    const target = event.target as HTMLElement;

    if (!target.closest('.filter-button-categories') && !target.closest('.dropdown-menu')) {
      if (dropdownMenu?.classList.contains('show')) {
        dropdownMenu.classList.remove('show');
        filterButton?.classList.remove("active");
        this.isDropdownVisible = false;
      }
    }
  }

  public isLoggedIn() {
    return this.userAuthService.isLoggedIn();
  }

  public isAdmin() {
    return this.userAuthService.isAdmin();
  }

  public isUser(){
    return this.userAuthService.isUser();
  }

  public isOrganizador(){
    return this.userAuthService.isOrganizador();
  }

  public isDistribuidor(){
    return this.userAuthService.isDistribuidor();
  }

  public logout() {
    this.userAuthService.clear();
    this.router.navigate(['/selectInstitution']);
  }

  closeModal() {
    const bootstrapModal = bootstrap.Modal.getInstance(this.modalElement.nativeElement);
    if (bootstrapModal) {
      bootstrapModal.hide();
    }
  }

  /* MODAL LOGIN */
  login(loginForm: NgForm) {
    this.userAuthService.login(loginForm.value).subscribe(
      (response: any) => {
        console.log(response);
        this.userAuthService.setRoles(response.usuario.roles)
        this.userAuthService.setToken(response.token);

        const role = response.usuario.roles[0].nombre;

        if (role === 'ADMIN') {
          this.router.navigate(['/adminPanel']);
        } else if (role === 'DISTRIBUIDOR') {
          this.router.navigate(['/codeVerification']);
        } else {
          this.router.navigate(['/selectInstitution']);
        }
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

  clearFilters() {
    // Deseleccionar todas las categorías
    this.selectedCategorias = [];
  
    // Recargar la página
    window.location.reload();
  }

  isCategoriaSelected(categoria: string): boolean {
    return this.selectedCategorias.includes(categoria);
  }
  
  toggleCategoria(categoria: string): void {
    const index = this.selectedCategorias.indexOf(categoria);
    if (index > -1) {
      this.selectedCategorias.splice(index, 1);
    } else {
      this.selectedCategorias.push(categoria);
    }
  }

  navigateToOrganizadorMode() {
    this.router.navigate(['/myEvents'], { queryParams: { organizadorId: this.userId } });
  }
}
