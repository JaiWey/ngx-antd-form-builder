import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxAntdFormBuilderComponent } from './ngx-antd-form-builder.component';

describe('NgxAntdFormBuilderComponent', () => {
  let component: NgxAntdFormBuilderComponent;
  let fixture: ComponentFixture<NgxAntdFormBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxAntdFormBuilderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NgxAntdFormBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
