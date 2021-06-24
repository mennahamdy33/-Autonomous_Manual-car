import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Mode1Page } from './mode1.page';
describe('Mode1Page', () => {
  let component: Mode1Page;
  let fixture: ComponentFixture<Mode1Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Mode1Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Mode1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
