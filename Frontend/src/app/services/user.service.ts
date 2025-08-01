import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private storageKey = 'userId';
  private accountkey = 'account';

  // user setters getters
  setUserId(id: number) {
    localStorage.setItem(this.storageKey, id.toString());
  }

  getUserId(): number | null {
    const id = localStorage.getItem(this.storageKey);
    return id ? +id : null;
  }

  clearUserId() {
    localStorage.removeItem(this.storageKey);
  }

  //user account setters getters
  setAccountId(id: number) {
    localStorage.setItem(this.accountkey, id.toString());
  }

  getAccountId(): number | null {
    const id = localStorage.getItem(this.accountkey);
    return id ? +id : null;
  }

  clearAccountId() {
    localStorage.removeItem(this.accountkey);
  }

}
