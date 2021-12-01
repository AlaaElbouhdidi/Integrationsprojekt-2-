import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { NewgroupComponent } from './newgroup.component';

export default {
    title: 'NewgroupComponent',
    component: NewgroupComponent,
    decorators: [
        moduleMetadata({
            imports: [],
        }),
    ],
} as Meta<NewgroupComponent>;

const Template: Story<NewgroupComponent> = (args: NewgroupComponent) => ({
    component: NewgroupComponent,
    props: args,
});

export const Primary = Template.bind({});
Primary.args = {};
