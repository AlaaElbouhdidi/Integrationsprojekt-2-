import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { NewgroupFormComponent } from './newgroup-form.component';

export default {
    title: 'NewgroupFormComponent',
    component: NewgroupFormComponent,
    decorators: [
        moduleMetadata({
            imports: []
        })
    ]
} as Meta<NewgroupFormComponent>;

/**
 * Template
 *
 * @param args {NewgroupFormComponent}
 * @constructor
 */
const Template: Story<NewgroupFormComponent> = (
    args: NewgroupFormComponent
) => ({
    component: NewgroupFormComponent,
    props: args
});

/**
 * Primary
 */
export const Primary = Template.bind({});
Primary.args = {};
