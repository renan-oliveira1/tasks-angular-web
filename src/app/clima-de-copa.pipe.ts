import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'climaDeCopa'
})
export class ClimaDeCopaPipe implements PipeTransform {

  constructor(private sanitized: DomSanitizer) {}

  transform(value: string): any {
    var values = value;
    const splits = values.split('');
    let result = `<span><img src="assets/img/brasil.png" alt='bandeira do Brasil' style='height: 15px'> </span>`;
    let count = 0;
    splits.forEach(next => {
      if(next && next !== " "){
        count++
        if(count % 2 === 0){
          result += "<span style='color: #229A00; font-weight: bold'>"+next+"</span>"
        } else {
          result += "<span style='color: #FFDF00; font-weight: bold'>"+next+"</span>"
        }
      } else {
        result += `${next}`;
      }
    });
    result += `<span><img src="assets/img/brasil.png" alt='bandeira do Brasil' style='height: 15px'> </span>`;
    return this.sanitized.bypassSecurityTrustHtml(result);
  }

}
