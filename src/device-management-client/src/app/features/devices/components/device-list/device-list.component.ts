import { Component, OnInit, inject } from '@angular/core';
import { DeviceService } from '../../../../core/services/device.service';
import { DeviceReadDto } from '../../../../shared/models/device.model';
import { RouterModule } from '@angular/router'; // Required for navigation links

@Component({
  selector: 'app-device-list',
  standalone: true,
  imports: [RouterModule], // Import RouterModule here
  templateUrl: './device-list.component.html'
})
export class DeviceListComponent implements OnInit {
  private deviceService = inject(DeviceService);
  devices: DeviceReadDto[] = []; 

  ngOnInit(): void {
    this.loadDevices();
  }

  loadDevices(): void {
    this.deviceService.getDevices().subscribe(data => this.devices = data);
  }

  // Requirement 5: Delete directly from the list
  deleteDevice(id: number): void {
    if (confirm('Are you sure you want to delete this device?')) {
      this.deviceService.deleteDevice(id).subscribe({
        next: () => {
          // Remove from local array to update UI instantly without reloading
          this.devices = this.devices.filter(d => d.deviceId!== id);
        },
        error: (err) => alert('Failed to delete device.')
      });
    }
  }
}