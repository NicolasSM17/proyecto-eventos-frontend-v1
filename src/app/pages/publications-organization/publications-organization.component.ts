import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/services/user-auth.service';



@Component({
  selector: 'app-publications-organization',
  templateUrl: './publications-organization.component.html',
  styleUrls: ['./publications-organization.component.css']
})
export class PublicationsOrganizationComponent implements OnInit {
  userId: number;

  constructor(private userAuthService: UserAuthService,
    private router: Router) { }

    ngOnInit(): void {
      this.userId = this.userAuthService.getUserId();
      
    }

  public isLoggedIn() {
    return this.userAuthService.isLoggedIn();
  }

  public isAdmin() {
    return this.userAuthService.isAdmin();
  }

  public isUser() {
    return this.userAuthService.isUser();
  }

  public isOrganizador() {
    return this.userAuthService.isOrganizador();
  }

  navigateToOrganizadorMode() {
    this.router.navigate(['/myEvents'], { queryParams: { organizadorId: this.userId } });
  }
}
