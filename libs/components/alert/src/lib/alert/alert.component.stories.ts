import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { AlertModule } from '../alert.module';
import { AlertComponent } from './alert.component';

export default {
    title: 'AlertComponent',
    component: AlertComponent,
    decorators: [
        moduleMetadata({
            imports: [AlertModule],
        }),
    ],
} as Meta<AlertComponent>;

const Template: Story<AlertComponent> = (args: AlertComponent) => ({
    component: AlertComponent,
    props: args,
});

export const Primary = Template.bind({});
Primary.args = {};
