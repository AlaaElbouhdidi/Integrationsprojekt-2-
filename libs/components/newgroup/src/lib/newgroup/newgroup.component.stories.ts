import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { NewgroupComponent } from './newgroup.component';

export default {
    title: 'NewgroupComponent',
    component: NewgroupComponent,
    decorators: [
        moduleMetadata({
            imports: []
        })
    ]
} as Meta<NewgroupComponent>;

/**
 * Template
 *
 * @param args {NewgroupComponent}
 * @constructor
 */
const Template: Story<NewgroupComponent> = (args: NewgroupComponent) => ({
    component: NewgroupComponent,
    props: args
});

/**
 * Primary
 */
export const Primary = Template.bind({});
Primary.args = {};
