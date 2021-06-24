import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Mode2Page } from './mode2.page';

describe('Mode2Page', () => {
  let component: Mode2Page;
  let fixture: ComponentFixture<Mode2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Mode2Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Mode2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
