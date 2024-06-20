import { ProviderToken, inject } from '@angular/core';
import { Vessel } from './vessel.service';

export function provideVessel<Service extends Vessel = Vessel>(
  service: ProviderToken<Service>
) {
  return { useFactory: () => inject(service), provide: Vessel };
}
