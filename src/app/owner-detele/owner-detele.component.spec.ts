import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerDeteleComponent } from './owner-detele.component';

describe('OwnerDeteleComponent', () => {
  let component: OwnerDeteleComponent;
  let fixture: ComponentFixture<OwnerDeteleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnerDeteleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerDeteleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
