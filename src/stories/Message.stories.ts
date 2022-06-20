// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/angular/types-6-0';
import { MessageComponent } from '../app/components/chat-main/message/message.component';

// More on default export: https://storybook.js.org/docs/angular/writing-stories/introduction#default-export
export default {
  title: 'Example/MessageComponent',
  component: MessageComponent,
  // More on argTypes: https://storybook.js.org/docs/angular/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

// More on component templates: https://storybook.js.org/docs/angular/writing-stories/introduction#using-args
const Template: Story<MessageComponent> = (args: MessageComponent) => ({
  props: args,
});

export const Right = Template.bind({});
// More on args: https://storybook.js.org/docs/angular/writing-stories/args
Right.args = {
  displayBubbleClass: 'talk-bubble tri-right right-top',
  textForThisMessage: 'to the right, to the right',
};

export const Left = Template.bind({});
// More on args: https://storybook.js.org/docs/angular/writing-stories/args
Left.args = {
  displayBubbleClass: 'talk-bubble-left tri-right left-top',
  textForThisMessage: 'to the left, to the left',
};
