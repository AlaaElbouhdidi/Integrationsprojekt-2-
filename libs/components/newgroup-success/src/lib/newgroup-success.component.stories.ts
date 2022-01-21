import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { NewgroupSuccessComponent } from './newgroup-success.component';

export default {
    title: 'NewgroupSuccessComponent',
    component: NewgroupSuccessComponent,
    decorators: [
        moduleMetadata({
            imports: []
        })
    ]
} as Meta<NewgroupSuccessComponent>;

/**
 * Template
 *
 * @param args {NewgroupSuccessComponent}
 * @constructor
 */
const Template: Story<NewgroupSuccessComponent> = (
    args: NewgroupSuccessComponent
) => ({
    component: NewgroupSuccessComponent,
    props: args
});

/**
 * Primary
 */
export const Primary = Template.bind({});
Primary.args = {};
