import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { GroupStatisticsComponent } from './group-statistics.component';

export default {
  title: 'GroupStatisticsComponent',
  component: GroupStatisticsComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    })
  ],
} as Meta<GroupStatisticsComponent>;

const Template: Story<GroupStatisticsComponent> = (args: GroupStatisticsComponent) => ({
  component: GroupStatisticsComponent,
  props: args,
});


export const Primary = Template.bind({});
Primary.args = {
}