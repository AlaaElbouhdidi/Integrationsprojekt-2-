import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { LoginComponent } from './login.component';

export default {
    title: 'LoginComponent',
    component: LoginComponent,
    decorators: [
        moduleMetadata({
            imports: []
        })
    ]
} as Meta<LoginComponent>;

/**
 * Template
 *
 * @param args {LoginComponent}
 * @constructor
 */
const Template: Story<LoginComponent> = (args: LoginComponent) => ({
    component: LoginComponent,
    props: args
});

/**
 * Primary
 */
export const Primary = Template.bind({});
Primary.args = {};
