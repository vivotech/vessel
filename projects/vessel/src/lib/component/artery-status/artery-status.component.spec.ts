import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArteryStatusComponent } from './artery-status.component';

describe('ArteryStatusComponent', () => {
  let component: ArteryStatusComponent;
  let fixture: ComponentFixture<ArteryStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArteryStatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArteryStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
