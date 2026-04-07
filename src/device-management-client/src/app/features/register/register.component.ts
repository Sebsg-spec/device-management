import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { LocationService, Location } from '../../core/services/location.service'; // 1. Import the service and interface

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit { // 2. Add OnInit
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);
  private locationService = inject(LocationService); // 3. Inject the service

  // 4. Start with an empty array
  locations: Location[] = [];

  registerForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    locationId: ['', Validators.required]
  });

  errorMessage: string = '';
  isSubmitting = false;

  // 5. Fetch data when the component loads
  ngOnInit() {
    this.locationService.getLocations().subscribe({
      next: (data) => {
        this.locations = data;
      },
      error: (err) => {
        console.error('Failed to load locations', err);
        this.errorMessage = 'Could not load office locations. Please try again later.';
      }
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.isSubmitting = true;
      
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