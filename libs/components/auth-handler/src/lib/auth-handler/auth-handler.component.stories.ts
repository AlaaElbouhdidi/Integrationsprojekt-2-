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
<<<<<<< HEAD
                AngularFireModule.initializeApp(environment.firebase)
            ],
            providers: [AuthService, AngularFireAuth]
        })
    ]
=======
                AngularFireModule.initializeApp(environment.firebase),
            ],
            providers: [AuthService, AngularFireAuth],
        }),
    ],
>>>>>>> origin/main
} as Meta<AuthHandlerComponent>;

const Template: Story<AuthHandlerComponent> = (args: AuthHandlerComponent) => ({
    component: AuthHandlerComponent,
<<<<<<< HEAD
    props: args
=======
    props: args,
>>>>>>> origin/main
});

export const Primary = Template.bind({});
Primary.args = {};
