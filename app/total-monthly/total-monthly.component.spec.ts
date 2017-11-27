import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalMonthlyComponent } from './total-monthly.component';

describe('TotalMonthlyComponent', () => {
  let component: TotalMonthlyComponent;
  let fixture: ComponentFixture<TotalMonthlyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalMonthlyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalMonthlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
