import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { HeaderComponent } from './header.component';

export default {
    title: 'HeaderComponent',
    component: HeaderComponent,
    decorators: [
        moduleMetadata({
            imports: []
        })
    ]
} as Meta<HeaderComponent>;

/**
 * Template
 *
 * @param args {HeaderComponent}
 * @constructor
 */
const Template: Story<HeaderComponent> = (args: HeaderComponent) => ({
    component: HeaderComponent,
    props: args
});

/**
 * Primary
 */
export const Primary = Template.bind({});
Primary.args = {};
