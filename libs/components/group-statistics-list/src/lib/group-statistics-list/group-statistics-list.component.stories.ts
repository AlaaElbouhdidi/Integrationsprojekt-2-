import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { GroupStatisticsListComponent } from './group-statistics-list.component';

export default {
    title: 'GroupStatisticsListComponent',
    component: GroupStatisticsListComponent,
    decorators: [
        moduleMetadata({
            imports: []
        })
    ]
} as Meta<GroupStatisticsListComponent>;

const Template: Story<GroupStatisticsListComponent> = (
    args: GroupStatisticsListComponent
) => ({
    component: GroupStatisticsListComponent,
    props: args
});

export const Primary = Template.bind({});
Primary.args = {};
