import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DeviceService } from '../../../../core/services/device.service';
import { Device } from '../../../../shared/models/device.model';
import { Manufacturer, OperatingSystemModel, User, LocationModel } from '../../../../shared/models/lookup.models';

@Component({
  selector: 'app-device-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './device-form.component.html'
})
export class DeviceFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private deviceService = inject(DeviceService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  deviceForm!: FormGroup;
  isEditMode = false;
  deviceId?: number;
  manufacturers: Manufacturer[] = [];
  operatingSystems: OperatingSystemModel[] = [];
  existingDeviceNames: string[] = [];
  locations: LocationModel[] = [];
users: User[] = [];
isGeneratingAI = false;

  ngOnInit(): void {
    this.initForm();
    this.loadDropdownData();
    
    this.deviceService.getDevices().subscribe(devices => {
      this.existingDeviceNames = devices.map(d => d.deviceName.toLowerCase());
    });

    this.deviceId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.deviceId) {
      this.isEditMode = true;
      this.deviceService.getDevice(this.deviceId).subscribe(device => {
        this.deviceForm.patchValue(device); 
      });
    }
  }

  initForm(): void {
    this.deviceForm = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      manufacturerId: [null, Validators.required],
      operatingSystemId: [null, Validators.required],
      osVersion: ['', Validators.required],
      processor: [null],
    raM_MB: [null],
    description: [null],
    locationId: [null],
    userId: [null]
    });
  }

  onSubmit(): void {
    if (this.deviceForm.invalid) {
      this.deviceForm.markAllAsTouched();
      return;
    }

    const formValue: Device = this.deviceForm.value;
    console.log('Form submitted with value:', formValue);

    if (!this.isEditMode) {
      const isDuplicate = this.existingDeviceNames.includes(formValue.name.toLowerCase());
      if (isDuplicate) {
        alert('A device with this name already exists!');
        return;
      }
      
      this.deviceService.createDevice(formValue).subscribe(() => this.router.navigate(['/devices']));
    } else {
      formValue.id = this.deviceId;
      this.deviceService.updateDevice(this.deviceId!, formValue).subscribe(() => this.router.navigate(['/devices']));
    }
  }

  loadDropdownData(): void {
  this.deviceService.getManufacturers().subscribe({
    next: (data) => this.manufacturers = data,
    error: (err) => console.error('Failed to load manufacturers', err)
  });

  this.deviceService.getOperatingSystems().subscribe({
    next: (data) => this.operatingSystems = data,
    error: (err) => console.error('Failed to load OS list', err)
    
  });
  this.deviceService.getLocations().subscribe({
    next: (data) => this.locations = data,
    error: (err) => console.error('Failed to load locations', err)
  });
  this.deviceService.getUsers().subscribe({
    next: (data) => this.users = data,
    error: (err) => console.error('Failed to load users', err)
  });
  console.log('Manufacturers loaded:', this.deviceService.getUsers());
}

generateAIDescription() {
    const formValues = this.deviceForm.value;
    if (!formValues.name || !formValues.manufacturerId) {
      alert("Please fill out the Device Name and Manufacturer first!");
      return;
    }

    this.isGeneratingAI = true;


    const selectedManufacturer = this.manufacturers.find((m: any) => m.id === formValues.manufacturerId);
    const selectedOS = this.operatingSystems.find((os: any) => os.id === formValues.operatingSystemId);


    const aiPayload = {
      Name: formValues.name,
      Manufacturer: selectedManufacturer ? selectedManufacturer.name : 'Unknown',
      OperatingSystem: selectedOS ? selectedOS.name : 'Unknown',
      Type: formValues.type,
      Ram: formValues.raM_MB,
      Processor: formValues.processor
    };


    this.deviceService.generateDescription(aiPayload).subscribe({
      next: (res) => {
        this.deviceForm.patchValue({ description: res.description });
        this.isGeneratingAI = false;
      },
      error: (err) => {
        console.error('AI Error:', err);
        alert('Failed to generate description. Make sure the API is running and the key is correct.');
        this.isGeneratingAI = false;
      }
    });
  }
}