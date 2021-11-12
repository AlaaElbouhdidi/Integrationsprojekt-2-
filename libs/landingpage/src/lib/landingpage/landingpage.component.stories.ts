import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { LandingpageComponent } from './landingpage.component';

export default {
  title: 'LandingpageComponent',
  component: LandingpageComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    })
  ],
} as Meta<LandingpageComponent>;

const Template: Story<LandingpageComponent> = (args: LandingpageComponent) => ({
  component: LandingpageComponent,
  props: args,
});


export const Primary = Template.bind({});
Primary.args = {
}