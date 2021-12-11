import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { ChangeEmailFormComponent } from './change-email-form.component';

export default {
    title: 'ChangeEmailFormComponent',
    component: ChangeEmailFormComponent,
    decorators: [
        moduleMetadata({
            imports: []
        })
    ]
} as Meta<ChangeEmailFormComponent>;

const Template: Story<ChangeEmailFormComponent> = (
    args: ChangeEmailFormComponent
) => ({
    component: ChangeEmailFormComponent,
    props: args
});

export const Primary = Template.bind({});
Primary.args = {};
