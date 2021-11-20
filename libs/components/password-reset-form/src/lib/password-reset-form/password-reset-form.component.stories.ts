import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { PasswordResetFormComponent } from './password-reset-form.component';

export default {
  title: 'PasswordResetFormComponent',
  component: PasswordResetFormComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    })
  ],
} as Meta<PasswordResetFormComponent>;

const Template: Story<PasswordResetFormComponent> = (args: PasswordResetFormComponent) => ({
  component: PasswordResetFormComponent,
  props: args,
});


export const Primary = Template.bind({});
Primary.args = {
}