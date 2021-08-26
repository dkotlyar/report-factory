import {Directive, ElementRef, OnInit} from '@angular/core';

@Directive({
  selector: '[repVerticalCell]'
})
export class VerticalCellDirective implements OnInit {

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
    const el = this.elementRef.nativeElement;
    const wrap = document.createElement('span');
    wrap.style.display = 'inline-block';
    wrap.style.position = 'absolute';
    wrap.style.transform = 'rotate(-90deg) translate(-100%, 0)';
    wrap.style.transformOrigin = 'top left';
    const wrap2 = document.createElement('span');
    wrap2.style.writingMode = 'vertical-rl';
    wrap2.style.visibility = 'hidden';

    el.childNodes.forEach((node, index, items) => {
      const clon = node.cloneNode(true);
      const clon2 = node.cloneNode(true);
      wrap.insertBefore(clon, null);
      wrap2.insertBefore(clon2, null);
    });
    while (el.firstChild) {
      el.removeChild(el.lastChild);
    }
    el.insertBefore(wrap, null);
    el.insertBefore(wrap2, null);
    el.getAttributeNames()
      .filter(n => n.startsWith('_ngcontent'))
      .forEach(attr => {
        wrap.setAttribute(attr, '');
        wrap2.setAttribute(attr, '');
      });
  }

}
