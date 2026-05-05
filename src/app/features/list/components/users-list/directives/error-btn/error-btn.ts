import { Directive, ElementRef, inject } from '@angular/core';

@Directive({
  selector: '[appErrorBtn]'
})
export class ErrorBtn {

  hostEl = inject(ElementRef).nativeElement as HTMLElement;
  
  ngOnInit() {
    this.hostEl.classList.add('error-btn');
  }
}
