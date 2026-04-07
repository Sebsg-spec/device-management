import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DeviceService } from '../../../../core/services/device.service';
import { Device } from '../../../../shared/models/device.model';

@Component({
  selector: 'app-device-details',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './device-details.component.html'
})
export class DeviceDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private deviceService = inject(DeviceService);
  
  device?: Device;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.deviceService.getDevice(id).subscribe({
        next: (data) => {
          this.device = data;
          console.log('Device loaded successfully:', this.device);
        },
        error: (err) => {
          console.error('Error fetching device details:', err);
        }
      });
    }
  }
}