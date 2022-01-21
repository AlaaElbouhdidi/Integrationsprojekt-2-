import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { GroupPollsEventsComponent } from './group-polls-events.component';

export default {
    title: 'GroupPollsEventsComponent',
    component: GroupPollsEventsComponent,
    decorators: [
        moduleMetadata({
            imports: []
        })
    ]
} as Meta<GroupPollsEventsComponent>;

/**
 * Template
 *
 * @param args {GroupPollsEventsComponent}
 * @constructor
 */
const Template: Story<GroupPollsEventsComponent> = (
    args: GroupPollsEventsComponent
) => ({
    component: GroupPollsEventsComponent,
    props: args
});

/**
 * Primary
 */
export const Primary = Template.bind({});
Primary.args = {};
