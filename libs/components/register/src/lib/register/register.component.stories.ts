import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { RegisterComponent } from './register.component';

export default {
    title: 'RegisterComponent',
    component: RegisterComponent,
    decorators: [
        moduleMetadata({
            imports: []
        })
    ]
} as Meta<RegisterComponent>;

/**
 * Template
 *
 * @param args {RegisterComponent}
 * @constructor
 */
const Template: Story<RegisterComponent> = (args: RegisterComponent) => ({
    component: RegisterComponent,
    props: args
});

/**
 * Primary
 */
export const Primary = Template.bind({});
Primary.args = {};
