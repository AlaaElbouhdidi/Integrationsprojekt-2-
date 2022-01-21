import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { ProfileComponent } from './profile.component';

export default {
    title: 'ProfileComponent',
    component: ProfileComponent,
    decorators: [
        moduleMetadata({
            imports: []
        })
    ]
} as Meta<ProfileComponent>;

/**
 * Template
 *
 * @param args {ProfileComponent}
 * @constructor
 */
const Template: Story<ProfileComponent> = (args: ProfileComponent) => ({
    component: ProfileComponent,
    props: args
});

/**
 * Primary
 */
export const Primary = Template.bind({});
Primary.args = {};
