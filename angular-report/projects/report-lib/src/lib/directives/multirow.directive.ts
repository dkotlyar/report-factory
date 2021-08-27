import {Directive, ElementRef, Input, OnInit} from '@angular/core';

@Directive({
  selector: '[repMultirow]'
})
export class MultirowDirective implements OnInit {

  constructor(private tr: ElementRef<HTMLTableRowElement>) { }

  ngOnInit(): void {
    let content = [];
    const styles = [];
    const classes = [];

    // setTimeout(() => {
      this.tr.nativeElement.childNodes.forEach((node, index, items) => {
        const td = node as HTMLElement;
        // console.log(td);
        if (td instanceof HTMLTableCellElement) {
          styles[index] = td.getAttribute('style');
          classes[index] = [];
          td.classList.forEach(value => classes[index].push(value));
          td.style.whiteSpace = 'nowrap';
          setTimeout(() => {
            if (td.scrollWidth > td.offsetWidth) {
              const charWidth = td.scrollWidth / td.innerText.length;
              content[index] = this.splitText(td.innerText, td.offsetWidth / charWidth * 0.95);
            } else {
              content[index] = [td.innerText];
            }

            if (content.length === items.length) {
              if (content.map(c => c.length > 1).reduce((a, b) => a || b)) {
                content = this.toRows(content);

                content.forEach(row => {
                  const newTr = document.createElement('tr');
                  const newTdArr = [];

                  row.forEach((text, tdIndex) => {
                    const newTd = document.createElement('td');
                    newTd.innerText = text;
                    newTd.setAttribute('style', styles[tdIndex]);
                    classes[tdIndex].forEach(value => newTd.classList.add(value));
                    newTr.append(newTd);
                    newTdArr.push(newTd);
                  });

                  this.tr.nativeElement.getAttributeNames()
                      .filter(n => n.startsWith('_ngcontent'))
                      .forEach(attr => {
                        newTr.setAttribute(attr, '');
                        newTdArr.forEach(newTd => {
                          newTd.setAttribute(attr, '');
                        });
                      });

                  this.tr.nativeElement.parentElement.insertBefore(newTr, this.tr.nativeElement);
                });
                this.tr.nativeElement.parentElement.removeChild(this.tr.nativeElement);
              }
            } else {
              this.tr.nativeElement.setAttribute('repMultirow_ok', '');
            }
          });
        }
      });
    // });
  }

  splitText(text: string, maxChars: number): string[] {
    const rows = [];
    const splText = text.split(' ');
    let row = [];
    splText.forEach(t => {
      if (row.map(s => s.length).reduce((a, b) => a + b + 1, 0) + t.length + 1 < maxChars) {
        row.push(t);
      } else {
        rows.push(row.join(' '));
        row = [];
        row.push(t);
      }
    });
    rows.push(row.join(' '));

    return rows;
  }

  toRows(content: Array<any>): Array<Array<string>> {
    const maxRows = content.map(c => c.length).reduce((a, b) => Math.max(a, b), 0);
    const rows = Array(maxRows).fill(null).map(() => Array(content.length).fill(''));

    content.forEach((column, cnum) => {
      column.forEach((text, rnum) => {
        rows[rnum][cnum] = text;
      });
    });

    return rows;
  }

}
