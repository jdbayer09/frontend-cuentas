import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostsModalComponent } from './costs-modal.component';

describe('CostsModalComponent', () => {
  let component: CostsModalComponent;
  let fixture: ComponentFixture<CostsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CostsModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CostsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
