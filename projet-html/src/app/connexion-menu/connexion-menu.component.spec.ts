import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnexionMenuComponent } from './connexion-menu.component';

describe('ConnexionMenuComponent', () => {
  let component: ConnexionMenuComponent;
  let fixture: ComponentFixture<ConnexionMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConnexionMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnexionMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
