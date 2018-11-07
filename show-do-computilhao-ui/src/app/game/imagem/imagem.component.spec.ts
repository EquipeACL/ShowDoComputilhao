import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagemComponent } from './imagem.component';

describe('ImagemComponent', () => {
  let component: ImagemComponent;
  let fixture: ComponentFixture<ImagemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
