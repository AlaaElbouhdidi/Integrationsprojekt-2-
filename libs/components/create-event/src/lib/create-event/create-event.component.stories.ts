import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { CreateEventComponent } from './create-event.component';

export default {
    title: 'CreateEventComponent',
    component: CreateEventComponent,
    decorators: [
        moduleMetadata({
            imports: [],
        }),
    ],
} as Meta<CreateEventComponent>;

const Template: Story<CreateEventComponent> = (args: CreateEventComponent) => ({
    component: CreateEventComponent,
    props: args,
});

export const Primary = Template.bind({});
Primary.args = {};
