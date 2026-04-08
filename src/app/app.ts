import { Component, computed, inject, OnInit, signal, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UsersList } from './list/components/users-list/users-list';
import { SearchInput } from './list/components/search-input/search-input';
import { Users } from './shared/services/users';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [UsersList, SearchInput],
})
export class App implements OnInit {
  usersService = inject(Users);

  isLoading = signal(true);

  search = signal('');

  users = signal<string[]>([]);

  searchInLowerCase = computed(() => this.search().toLowerCase());
  filteredUsers = computed(() => {
    return this.users().filter(user => 
      user.toLowerCase().includes(this.searchInLowerCase())
    );
  });

  remove(user: string) {
    this.users.update(users => users.filter(u => u !== user));
  }

  
  ngOnInit(): void {
    this.usersService.getAll().subscribe(users => {
      this.users.set(users)
      this.isLoading.set(false)
    });
  }
}
