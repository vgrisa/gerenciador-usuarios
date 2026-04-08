import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  imports: [ReactiveFormsModule],
  templateUrl: './create.html',
  styleUrl: './create.scss',
})
export class Create {
  submit() {
    const user = this.form.controls.name.value;
    console.log(user);
  }

  form = new FormGroup({
    name: new FormControl('', { validators: [Validators.required] }),
  });
}
