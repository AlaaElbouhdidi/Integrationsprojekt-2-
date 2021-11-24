import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { ProfileComponent } from './profile.component';

export default {
  title: 'ProfileComponent',
  component: ProfileComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    })
  ],
} as Meta<ProfileComponent>;

const Template: Story<ProfileComponent> = (args: ProfileComponent) => ({
  component: ProfileComponent,
  props: args,
});


export const Primary = Template.bind({});
Primary.args = {
}