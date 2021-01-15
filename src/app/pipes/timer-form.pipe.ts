import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timerForm'
})
export class TimerFormPipe implements PipeTransform {

  transform(time: number): string {
    let seconds: any = time % 60;
    let minutes: any = Math.floor((time / 60) % 60);
    let hours: any = Math.floor(((time / 60) / 60) % 24);
    
    const timeItems = [hours, minutes, seconds].map(timeItem => {
      if (timeItem < 10) {
        return timeItem = "0" + timeItem;
      } else {
        return timeItem;
      }
    })

    return `${timeItems[0]}:${timeItems[1]}:${timeItems[2]}`;
  }

}
