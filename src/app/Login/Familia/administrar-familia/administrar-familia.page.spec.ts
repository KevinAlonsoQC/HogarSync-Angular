import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdministrarFamiliaPage } from './administrar-familia.page';

describe('AdministrarFamiliaPage', () => {
  let component: AdministrarFamiliaPage;
  let fixture: ComponentFixture<AdministrarFamiliaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AdministrarFamiliaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
