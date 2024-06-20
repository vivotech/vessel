import { Component, inject } from '@angular/core';
import { Vessel } from '../../vessel.service';
import { DecimalPipe } from '@angular/common';
import { ArteryStatusComponent } from '../../component/artery-status/artery-status.component';

@Component({
  selector: 'lib-vessel-settings',
  standalone: true,
  imports: [DecimalPipe, ArteryStatusComponent],
  templateUrl: './vessel-settings.component.html',
  styleUrl: './vessel-settings.component.scss',
})
export default class VesselSettingsComponent {
  vessel = inject(Vessel);
}
