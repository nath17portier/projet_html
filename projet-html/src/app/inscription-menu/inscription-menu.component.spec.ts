import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscriptionMenuComponent } from './inscription-menu.component';

describe('InscriptionMenuComponent', () => {
  let component: InscriptionMenuComponent;
  let fixture: ComponentFixture<InscriptionMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InscriptionMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InscriptionMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
