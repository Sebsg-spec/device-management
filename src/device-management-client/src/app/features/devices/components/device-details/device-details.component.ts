import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DeviceService } from '../../../../core/services/device.service';
import { Device } from '../../../../shared/models/device.model';

@Component({
  selector: 'app-device-details',
  standalone: true,
  imports: [RouterModule],
  template: `
    @if (device) {
      <div class="card">
        <h2>{{ device.name }} Details</h2>
        <p><strong>Type:</strong> {{ device.type }}</p>
        <p><strong>OS Version:</strong> {{ device.osVersion }}</p>
        <p><strong>Processor:</strong> {{ device.processor || 'N/A' }}</p>
        <p><strong>RAM:</strong> {{ device.raM_MB ? device.raM_MB + ' MB' : 'N/A' }}</p>
        <p><strong>Description:</strong> {{ device.description || 'N/A' }}</p>
        
        <button routerLink=".." class="btn-secondary">Back to List</button>
      </div>
    } @else {
      <p>Loading details...</p>
    }
  `
})
export class DeviceDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private deviceService = inject(DeviceService);
  device?: Device;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.deviceService.getDevice(id).subscribe(data => this.device = data);
      console.log('Device ID from route:', this.deviceService.getDevice(id).subscribe(data => this.device = data));
    }
  }
}