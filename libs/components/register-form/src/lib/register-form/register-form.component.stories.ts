import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { RegisterFormComponent } from './register-form.component';

export default {
    title: 'RegisterFormComponent',
    component: RegisterFormComponent,
    decorators: [
        moduleMetadata({
            imports: [],
        }),
    ],
} as Meta<RegisterFormComponent>;

const Template: Story<RegisterFormComponent> = (
    args: RegisterFormComponent
) => ({
    component: RegisterFormComponent,
    props: args,
});

export const Primary = Template.bind({});
Primary.args = {};
