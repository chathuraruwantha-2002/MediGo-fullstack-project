import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private storageKey = 'userId';

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
}
