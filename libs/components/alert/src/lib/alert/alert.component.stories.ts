import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { AlertModule } from '../alert.module';
import { AlertComponent } from './alert.component';

export default {
    title: 'AlertComponent',
    component: AlertComponent,
    decorators: [
        moduleMetadata({
            imports: [AlertModule]
        })
    ]
} as Meta<AlertComponent>;

/**
 * Template
 *
 * @param args {AlertComponent}
 * @constructor
 */
const Template: Story<AlertComponent> = (args: AlertComponent) => ({
    component: AlertComponent,
    props: args
});

/**
 * Primary
 */
export const Primary = Template.bind({});
Primary.args = {};
