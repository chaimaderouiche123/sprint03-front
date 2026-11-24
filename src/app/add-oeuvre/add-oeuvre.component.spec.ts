import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { AddOeuvreComponent } from './add-oeuvre.component';

describe('AddOeuvreComponent', () => {
  let component: AddOeuvreComponent;
  let fixture: ComponentFixture<AddOeuvreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddOeuvreComponent],
      providers: [
        provideHttpClient(),
        provideRouter([])
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOeuvreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});