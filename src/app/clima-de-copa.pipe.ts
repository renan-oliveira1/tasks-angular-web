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
    let result = `<span><img src='https://img2.gratispng.com/20180619/icy/kisspng-praline-flag-of-brazil-carmo-de-minas-coffee-choco-flag-brasil-5b28e712793193.6959498215294072504964.jpg' style='height: 15px'> </span>`;
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
    result += `<span> <img src='https://img2.gratispng.com/20180619/icy/kisspng-praline-flag-of-brazil-carmo-de-minas-coffee-choco-flag-brasil-5b28e712793193.6959498215294072504964.jpg' alt='bandeira do Brasil' style='height: 15px'> </span>`;
    return this.sanitized.bypassSecurityTrustHtml(result);
  }

}
