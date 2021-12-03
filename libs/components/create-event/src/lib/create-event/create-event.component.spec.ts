import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateEventModule } from '../create-event.module';
import { CreateEventComponent } from './create-event.component';

describe('CreateEventComponent', () => {
    let component: CreateEventComponent;
    let fixture: ComponentFixture<CreateEventComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CreateEventModule],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CreateEventComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
