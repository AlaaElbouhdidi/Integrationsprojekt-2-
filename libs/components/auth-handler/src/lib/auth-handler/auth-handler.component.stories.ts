import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { AuthHandlerModule } from '../auth-handler.module';
import { AuthHandlerComponent } from './auth-handler.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '@services';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '@env';

export default {
    title: 'AuthHandlerComponent',
    component: AuthHandlerComponent,
    decorators: [
        moduleMetadata({
            imports: [
                RouterTestingModule,
                AuthHandlerModule,
                AngularFireModule.initializeApp(environment.firebase)
            ],
            providers: [AuthService, AngularFireAuth]
        })
    ]
} as Meta<AuthHandlerComponent>;

/**
 * Template
 *
 * @param args {AuthHandlerComponent}
 * @constructor
 */
const Template: Story<AuthHandlerComponent> = (args: AuthHandlerComponent) => ({
    component: AuthHandlerComponent,
    props: args
});

/**
 * Primary
 */
export const Primary = Template.bind({});
Primary.args = {};
