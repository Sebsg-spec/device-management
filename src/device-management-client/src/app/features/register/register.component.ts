import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);

  // Hardcoded locations based on your database for simplicity
  locations = [
    { id: 1, name: 'Headquarters' },
    { id: 2, name: 'New York Office' },
    { id: 3, name: 'London Office' }
  ];

  registerForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    locationId: ['', Validators.required]
  });

  errorMessage: string = '';
  isSubmitting = false;

  onSubmit() {
    if (this.registerForm.valid) {
      this.isSubmitting = true;
      
      // Convert locationId to a number before sending
      const payload = {
        ...this.registerForm.value,
        locationId: Number(this.registerForm.value.locationId)
      };

      this.authService.register(payload).subscribe({
        next: () => {
          alert('Registration successful! Please log in.');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          this.isSubmitting = false;
          this.errorMessage = err.error || 'An error occurred during registration.';
          console.error(err);
        }
      });
    }
  }
}