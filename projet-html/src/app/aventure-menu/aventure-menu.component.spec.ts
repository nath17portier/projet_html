import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AventureMenuComponent } from './aventure-menu.component';

describe('AventureMenuComponent', () => {
  let component: AventureMenuComponent;
  let fixture: ComponentFixture<AventureMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AventureMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AventureMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
