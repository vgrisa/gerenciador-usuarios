import { JsonPipe } from '@angular/common';
import { Component, computed, inject, input, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Users } from '../../shared/services/users';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAnchor, MatButtonModule } from '@angular/material/button';
import { User } from '../../shared/interfaces/user';

@Component({
  selector: 'app-edit',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAnchor,
    MatButtonModule,
    RouterLink, 
  ],
  templateUrl: './edit.html',
  styleUrl: './edit.scss',
})
export class Edit {
  usersService = inject(Users);
  router = inject(Router);

  user = input.required<User>();

  form = new FormGroup({
    name: new FormControl('', { validators: [Validators.required], nonNullable: true }),
  });

  submit() {
    const user = this.form.controls.name.value;

    this.usersService.put(this.user().id, { name: user }).subscribe(() => {
      this.router.navigateByUrl('');
    });
  }

  ngOnInit() {
    this.form.controls.name.setValue(this.user().name);
  }
}
