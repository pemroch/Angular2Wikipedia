import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAccountComponentComponent } from './create-account-component.component';

describe('CreateAccountComponentComponent', () => {
  let component: CreateAccountComponentComponent;
  let fixture: ComponentFixture<CreateAccountComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAccountComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAccountComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
