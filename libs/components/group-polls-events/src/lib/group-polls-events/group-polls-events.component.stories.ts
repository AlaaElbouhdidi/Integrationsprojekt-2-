import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { GroupPollsEventsComponent } from './group-polls-events.component';

export default {
  title: 'GroupPollsEventsComponent',
  component: GroupPollsEventsComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    })
  ],
} as Meta<GroupPollsEventsComponent>;

const Template: Story<GroupPollsEventsComponent> = (args: GroupPollsEventsComponent) => ({
  component: GroupPollsEventsComponent,
  props: args,
});


export const Primary = Template.bind({});
Primary.args = {
}