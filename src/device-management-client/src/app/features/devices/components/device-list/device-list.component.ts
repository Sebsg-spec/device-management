import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; // Important for pipes/directives
import { RouterModule } from '@angular/router';
import { DeviceService } from '../../../../core/services/device.service';
import { DeviceReadDto } from '../../../../shared/models/device.model';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-device-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './device-list.component.html',
})
export class DeviceListComponent implements OnInit {
  private deviceService = inject(DeviceService);
  private authService = inject(AuthService);

  // Data arrays
  allDevices: DeviceReadDto[] = []; 
  pagedDevices: DeviceReadDto[] = []; 

  // Pagination properties (Fixes the red errors in your screenshot)
  currentPage = 1;
  pageSize = 5;
  pageSizeOptions = [5, 10, 25, 50];
  currentUserName = this.authService.getCurrentUserName();
  isAdmin = this.authService.isAdmin();

  ngOnInit(): void {
    this.loadDevices();
  }

  loadDevices(): void {
    this.deviceService.getDevices().subscribe({
      next: (data) => {
        this.allDevices = data;
        this.updateDisplay();
      },
      error: (err) => console.error('Error loading devices', err)
    });
  }

  // Calculates which devices to show based on current page
  updateDisplay(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedDevices = this.allDevices.slice(startIndex, endIndex);
  }

  // Fixes 'changePage' error
  changePage(amount: number): void {
    this.currentPage += amount;
    this.updateDisplay();
  }

  // Fixes 'onPageSizeChange' error
  onPageSizeChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.pageSize = Number(target.value);
    this.currentPage = 1; // Reset to page 1
    this.updateDisplay();
  }

  // Fixes 'totalPages' error
  get totalPages(): number {
    return Math.ceil(this.allDevices.length / this.pageSize) || 1;
  }

  deleteDevice(id: number): void {
    if (confirm('Are you sure?')) {
      this.deviceService.deleteDevice(id).subscribe(() => {
        this.allDevices = this.allDevices.filter(d => d.deviceId !== id);
        this.updateDisplay();
      });
    }
  }

  claimDevice(id: number): void {
    this.deviceService.assignToSelf(id).subscribe({
      next: () => {
        alert('Device claimed successfully!');
        this.loadDevices(); // Refresh the table
      },
      error: (err) => alert(err.error || 'Could not claim device')
    });
  }

  returnDevice(id: number): void {
    if (confirm('Are you sure you want to return this device?')) {
      this.deviceService.unassignFromSelf(id).subscribe({
        next: () => {
          alert('Device returned successfully!');
          this.loadDevices(); // Refresh the table
        },
        error: (err) => alert(err.error || 'Could not return device')
      });
    }
  }

}