import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LobbyMultijoueurComponent } from './lobby-multijoueur.component';

describe('LobbyMultijoueurComponent', () => {
  let component: LobbyMultijoueurComponent;
  let fixture: ComponentFixture<LobbyMultijoueurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LobbyMultijoueurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LobbyMultijoueurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
