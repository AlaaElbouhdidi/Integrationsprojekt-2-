import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { LoginFormComponent } from './login-form.component';

export default {
    title: 'LoginFormComponent',
    component: LoginFormComponent,
    decorators: [
        moduleMetadata({
            imports: [],
        }),
    ],
} as Meta<LoginFormComponent>;

const Template: Story<LoginFormComponent> = (args: LoginFormComponent) => ({
    component: LoginFormComponent,
    props: args,
});

export const Primary = Template.bind({});
Primary.args = {};
