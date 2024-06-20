import { ComponentFixture, TestBed } from '@angular/core/testing';

import VesselSettingsComponent from './vessel-settings.component';

describe('VesselSettingsComponent', () => {
  let component: VesselSettingsComponent;
  let fixture: ComponentFixture<VesselSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VesselSettingsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VesselSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
