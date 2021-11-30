import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { ReauthFormComponent } from './reauth-form.component';

export default {
  title: 'ReauthFormComponent',
  component: ReauthFormComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    })
  ],
} as Meta<ReauthFormComponent>;

const Template: Story<ReauthFormComponent> = (args: ReauthFormComponent) => ({
  component: ReauthFormComponent,
  props: args,
});


export const Primary = Template.bind({});
Primary.args = {
}