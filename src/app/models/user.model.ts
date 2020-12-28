import { Injectable } from '@angular/core';
import { Adapter } from './adapter';

export class User {
  constructor(
    public id: number,
    public fullname: string,
    public email: string,
    public username?: string
  ) {}
}

@Injectable()
export class UserAdapter implements Adapter<User> {
  adapt(item: any): User {
    return new User(item.id, item.fullname, item.email, item.username);
  }
}
