import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { LandingpageComponent } from './landingpage.component';

export default {
    title: 'LandingpageComponent',
    component: LandingpageComponent,
    decorators: [
        moduleMetadata({
            imports: []
        })
    ]
} as Meta<LandingpageComponent>;

/**
 * Template
 *
 * @param args {LandingpageComponent}
 * @constructor
 */
const Template: Story<LandingpageComponent> = (args: LandingpageComponent) => ({
    component: LandingpageComponent,
    props: args
});

/**
 * Primary
 */
export const Primary = Template.bind({});
Primary.args = {};
