import { Component, computed, DestroyRef, effect, inject, OnInit, signal } from '@angular/core';
import { Users } from '../../shared/services/users';
import { SearchInput } from './components/search-input/search-input';
import { UsersList } from './components/users-list/users-list';
import { User } from '../../shared/interfaces/user';
import { take, takeUntil } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-list',
  imports: [SearchInput, UsersList, RouterLink, MatButtonModule],
  templateUrl: './list.html',
  styleUrl: './list.scss',
})
export class List implements OnInit {
  usersService = inject(Users);
  destroyRef = inject(DestroyRef);
  isLoading = signal(true);
  search = signal('');
  users = signal<User[]>([]);

  constructor() {
    effect(() => {
      this.isLoading.set(true);
      this.getUsers();
    });
  }

  ngOnInit(): void {
    this.getUsers();
  }

  remove({ id }: User) {
    this.usersService.delete(id).subscribe(() => {
      this.users.update((users) => users.filter((u) => u.id !== id));
    });
  }

  private getUsers() {
    this.usersService
      .getAll(this.search())
      .pipe(takeUntilDestroyed(this.destroyRef), take(1))
      .subscribe((users) => {
        this.users.set(users);
        this.isLoading.set(false);
      });
  }
}
