import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JeuMultiUnComponent } from './jeu-multi-un.component';

describe('JeuMultiUnComponent', () => {
  let component: JeuMultiUnComponent;
  let fixture: ComponentFixture<JeuMultiUnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JeuMultiUnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JeuMultiUnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
