import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UnirseFamiliaPage } from './unirse-familia.page';

describe('UnirseFamiliaPage', () => {
  let component: UnirseFamiliaPage;
  let fixture: ComponentFixture<UnirseFamiliaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UnirseFamiliaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
