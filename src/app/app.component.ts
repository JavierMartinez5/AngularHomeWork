import { Component } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  time = 0;
  counter = 0;
  condition = false;
  sub: Subscription;

  onStartStopClick() {
    this.condition = !this.condition;

    if (this.condition) {
      const stream$: Observable<number> = new Observable(obresrver => {
        setInterval(() => {
          obresrver.next(1);
        }, 1000)
      })
      this.sub = stream$.subscribe(value => {
        this.time += value;
      })
      this.counter = 0;
    } else {
      this.sub.unsubscribe();
      this.time = 0;
    }
  }

  onWaitClick() {
    this.counter += 1;
    console.log(this.counter);

    if (this.counter === 1) { // For better optomization (prevent execute multiple SetTimeout)
      setTimeout(() => {
        if (this.counter > 1) {
          this.sub.unsubscribe();
          this.condition = false;
        } else {
          this.counter = 0;
        }
      }, 300);
    }
  }

  onResetClick() {
    this.time = 0;
    
    if (this.condition) return;

    this.onStartStopClick();
  }


}
