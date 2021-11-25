import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { NewgroupFormComponent } from './newgroup-form.component';

export default {
  title: 'NewgroupFormComponent',
  component: NewgroupFormComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    })
  ],
} as Meta<NewgroupFormComponent>;

const Template: Story<NewgroupFormComponent> = (args: NewgroupFormComponent) => ({
  component: NewgroupFormComponent,
  props: args,
});


export const Primary = Template.bind({});
Primary.args = {
}