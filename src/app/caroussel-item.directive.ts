import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[carousselItem]'
})
export class CarousselItemDirective {

  constructor(public tpl : TemplateRef<any>) { }

}
