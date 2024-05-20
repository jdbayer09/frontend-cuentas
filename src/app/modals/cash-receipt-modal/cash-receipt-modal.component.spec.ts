import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashReceiptModalComponent } from './cash-receipt-modal.component';

describe('CashReceiptModalComponent', () => {
  let component: CashReceiptModalComponent;
  let fixture: ComponentFixture<CashReceiptModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CashReceiptModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CashReceiptModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
