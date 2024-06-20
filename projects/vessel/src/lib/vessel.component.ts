import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Vessel } from './vessel.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'vt-vessel',
  standalone: true,
  imports: [RouterLink],
  template: `<p routerLink="/settings">{{ vessel.message() }}</p> `,
  styles: `
  :host {
    border-radius: var(--shape-medium);
    background: var(--surface);
    color: var(--on-surface);
    padding: var(--padding);
    cursor: pointer;
  }`,
})
export class VesselComponent {
  vessel = inject(Vessel);
}
