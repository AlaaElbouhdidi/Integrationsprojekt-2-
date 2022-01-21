import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { ImprintComponent } from './imprint.component';

export default {
    title: 'ImprintComponent',
    component: ImprintComponent,
    decorators: [
        moduleMetadata({
            imports: []
        })
    ]
} as Meta<ImprintComponent>;

/**
 * Template
 *
 * @param args {ImprintComponent}
 * @constructor
 */
const Template: Story<ImprintComponent> = (args: ImprintComponent) => ({
    component: ImprintComponent,
    props: args
});

/**
 * Primary
 */
export const Primary = Template.bind({});
Primary.args = {};
