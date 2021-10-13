import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultijoueurMenuComponent } from './multijoueur-menu.component';

describe('MultijoueurMenuComponent', () => {
  let component: MultijoueurMenuComponent;
  let fixture: ComponentFixture<MultijoueurMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultijoueurMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultijoueurMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
