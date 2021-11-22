import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { AuthHandlerComponent } from './auth-handler.component';

export default {
  title: 'AuthHandlerComponent',
  component: AuthHandlerComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    })
  ],
} as Meta<AuthHandlerComponent>;

const Template: Story<AuthHandlerComponent> = (args: AuthHandlerComponent) => ({
  component: AuthHandlerComponent,
  props: args,
});


export const Primary = Template.bind({});
Primary.args = {
}