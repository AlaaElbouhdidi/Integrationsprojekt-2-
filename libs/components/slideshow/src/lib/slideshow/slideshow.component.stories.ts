import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { SlideshowComponent } from './slideshow.component';

export default {
  title: 'SlideshowComponent',
  component: SlideshowComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    })
  ],
} as Meta<SlideshowComponent>;

const Template: Story<SlideshowComponent> = (args: SlideshowComponent) => ({
  component: SlideshowComponent,
  props: args,
});


export const Primary = Template.bind({});
Primary.args = {
}