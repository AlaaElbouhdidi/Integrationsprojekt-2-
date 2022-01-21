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

/**
 * Template
 *
 * @param args {GroupStatisticsListComponent}
 * @constructor
 */
const Template: Story<GroupStatisticsListComponent> = (
    args: GroupStatisticsListComponent
) => ({
    component: GroupStatisticsListComponent,
    props: args
});

/**
 * Primary
 */
export const Primary = Template.bind({});
Primary.args = {};
