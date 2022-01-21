import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { ChangePasswordFormComponent } from './change-password-form.component';

export default {
    title: 'ChangePasswordFormComponent',
    component: ChangePasswordFormComponent,
    decorators: [
        moduleMetadata({
            imports: []
        })
    ]
} as Meta<ChangePasswordFormComponent>;

/**
 * Template
 *
 * @param args {ChangePasswordFormComponent}
 * @constructor
 */
const Template: Story<ChangePasswordFormComponent> = (
    args: ChangePasswordFormComponent
) => ({
    component: ChangePasswordFormComponent,
    props: args
});

/**
 * Primary
 */
export const Primary = Template.bind({});
Primary.args = {};
