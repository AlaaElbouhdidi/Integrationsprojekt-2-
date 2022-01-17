import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { PrivacyComponent } from './privacy.component';

export default {
  title: 'PrivacyComponent',
  component: PrivacyComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    })
  ],
} as Meta<PrivacyComponent>;

const Template: Story<PrivacyComponent> = (args: PrivacyComponent) => ({
  component: PrivacyComponent,
  props: args,
});


export const Primary = Template.bind({});
Primary.args = {
}