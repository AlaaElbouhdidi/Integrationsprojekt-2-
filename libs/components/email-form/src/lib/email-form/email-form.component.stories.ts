import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { EmailFormModule } from '../email-form.module';
import { EmailFormComponent } from './email-form.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '@env';

export default {
    title: 'EmailFormComponent',
    component: EmailFormComponent,
    decorators: [
        moduleMetadata({
            imports: [
                EmailFormModule,
                AngularFireModule.initializeApp(
                    environment.environment.firebase
                ),
            ],
        }),
    ],
} as Meta<EmailFormComponent>;

const Template: Story<EmailFormComponent> = (args: EmailFormComponent) => ({
    component: EmailFormComponent,
    props: args,
});

export const Primary = Template.bind({});
Primary.args = {};
