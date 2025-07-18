import { Component, HostListener, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-root',
    standalone: true,
    imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
    @ViewChild(FooterComponent) footer!: FooterComponent;

    constructor(private router: Router) { }

    ngOnInit() {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                // Instant jump to top, no smooth scroll
                window.scrollTo(0, 0);
            }
        });
    }

    title = 'Kalscheuer IT Solutions';
    isScrolled = false;
    backToTopBottom = 30; // default bottom margin in px
    footerHeight = 0;

    ngAfterViewInit() {
        console.log('Footer height available:', this.footer.footerRoot.nativeElement.offsetHeight);
    }

    @HostListener('window:scroll', [])
    onWindowScroll() {
        //this.isScrolled = window.scrollY > 300; // Show button after scrolling 300px

        this.isScrolled = window.scrollY > 300;

        const viewportHeight = window.innerHeight;
        const footerTop = this.footer.footerRoot.nativeElement.getBoundingClientRect().top;

        const overlap = viewportHeight - footerTop;

        // If footer is visible or near viewport bottom, raise button above footer
        if (overlap > 0) {
            this.backToTopBottom = overlap + 30; // 30px margin above footer
        } else {
            // Footer not visible yet, normal bottom margin
            this.backToTopBottom = 30;
        }
    }

    scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        this.isScrolled = false;
    }
}