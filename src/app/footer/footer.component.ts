import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
    imports: [RouterModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements AfterViewInit {
    @ViewChild('footer') footerRoot!: ElementRef<HTMLElement>;

    footerHeight = 0;

    ngAfterViewInit() {
        this.footerHeight = this.footerRoot.nativeElement.offsetHeight;
        console.log('Footer height (inside component):', this.footerHeight);
    }
}
