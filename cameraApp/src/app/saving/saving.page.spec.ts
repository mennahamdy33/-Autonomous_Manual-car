import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SavingPage } from './saving.page';

describe('SavingPage', () => {
  let component: SavingPage;
  let fixture: ComponentFixture<SavingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SavingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
