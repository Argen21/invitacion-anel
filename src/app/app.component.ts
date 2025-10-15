import { Component, ElementRef, HostListener, QueryList, ViewChildren } from '@angular/core';
import { ContadorService } from './services/contador.service';
import { CommonModule } from '@angular/common';
import { MusicComponentComponent } from "./components/music-component/music-component.component";

@Component({
  selector: 'app-root',
  imports: [CommonModule, MusicComponentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

    constructor(public contadorService: ContadorService, private el: ElementRef){}

    ngOnInit(): void {
    this.contadorService.iniciarContador("2026-02-14T16:00:00");

    }

@ViewChildren('block') blocks!: QueryList<ElementRef>;

  progress: number[] = [];

  showOptions = false;

  toggleOptions() {
    this.showOptions = !this.showOptions;
  }

  hideOptions() {
    this.showOptions = false;
  }


  ngAfterViewInit(): void {
    this.updateProgress();
  }

  @HostListener('window:scroll', [])
  onScroll() {
    this.updateProgress();
  }

updateProgress() {
  const windowHeight = window.innerHeight;

  this.blocks.forEach((block, i) => {
    const rect = block.nativeElement.getBoundingClientRect();
    const blockHeight = rect.height;

    // progreso relativo del scroll en este bloque
    let progress = ((windowHeight / 2 - rect.top) / blockHeight) * 100;
    progress = Math.max(0, Math.min(100, progress));
    this.progress[i] = progress;

    // color del icono solo cuando la línea alcanza el icono
    const icon = block.nativeElement.querySelector('.icon');
    const progressHeight = (progress / 100) * blockHeight; // altura de la barra
    const iconTop = icon.offsetTop + icon.offsetHeight / 2; // centro del icono

    if (progressHeight >= iconTop) {
      icon.classList.add('active');
    } else {
      icon.classList.remove('active');
    }
  });
}
}
