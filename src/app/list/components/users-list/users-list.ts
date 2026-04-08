import { Component, computed, inject, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Users } from '../../../shared/services/users';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.html',
  styleUrl: './users-list.scss',
})
export class UsersList {
  users = input.required<string[]>();

  removeUser = output<string>({ alias : 'remove' });

  remove(user: string) {
    this.removeUser.emit(user);
  }
}
