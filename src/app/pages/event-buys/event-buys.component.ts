import { Component, OnInit, AfterViewInit, HostListener, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-event-buys',
  templateUrl: './event-buys.component.html',
  styleUrls: ['./event-buys.component.css']
})
export class EventBuysComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor() { }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    window.addEventListener('scroll', this.handleScroll);
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.handleScroll);
  }

  @HostListener('window:scroll', ['$event'])
  handleScroll() {
    const btnCompra = document.querySelector('.btn-compra') as HTMLElement;
    const footer = document.querySelector('footer') as HTMLElement;
    const footerOffset = footer?.getBoundingClientRect().top || 0;
    const windowHeight = window.innerHeight;

    if (footerOffset < windowHeight) {
      btnCompra.style.position = 'absolute';
      btnCompra.style.bottom = `${windowHeight - footerOffset + 20}px`;
    } else {
      btnCompra.style.position = 'fixed';
      btnCompra.style.bottom = '20px';
    }
  }

}
