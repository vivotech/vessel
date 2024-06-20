import { DecimalPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { ArteryStatus } from '@vivotech/artery/dist/core';

@Component({
  selector: 'vt-artery-status',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './artery-status.component.html',
  styleUrl: './artery-status.component.scss',
})
export class ArteryStatusComponent {
  status = input<ArteryStatus>();
}
