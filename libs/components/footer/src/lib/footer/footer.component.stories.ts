import { RouterTestingModule } from '@angular/router/testing';
import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { FooterModule } from '../footer.module';
import { FooterComponent } from './footer.component';

export default {
    title: 'FooterComponent',
    component: FooterComponent,
    decorators: [
        moduleMetadata({
            imports: [FooterModule, RouterTestingModule]
        })
    ]
} as Meta<FooterComponent>;

/**
 * Template
 *
 * @param args
 * @constructor
 */
const Template: Story<FooterComponent> = (args: FooterComponent) => ({
    component: FooterComponent,
    props: args
});

/**
 * Primary
 */
export const Primary = Template.bind({});
Primary.args = {};
