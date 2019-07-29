import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerCarListComponent } from './owner-car-list.component';

describe('OwnerCarListComponent', () => {
  let component: OwnerCarListComponent;
  let fixture: ComponentFixture<OwnerCarListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnerCarListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerCarListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
