import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private messageSource = new BehaviorSubject<string>('');
  currentMessage$ = this.messageSource.asObservable();

  private autoSendSource = new BehaviorSubject<boolean>(false);
  autoSend$ = this.autoSendSource.asObservable();

  setMessage(message: string) {
    this.messageSource.next(message);
    this.autoSendSource.next(true); // trigger auto send
  }

  clearAutoSend() {
    this.autoSendSource.next(false); // reset after auto send is done
  }
}
