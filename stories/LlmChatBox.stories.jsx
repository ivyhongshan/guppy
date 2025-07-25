import React from 'react';
import LLmChatBox from './LLmChatBox';

export default {
  title: 'LLM/LLmChatBox',
  component: LLmChatBox,
};

const Template = (args) => <LLmChatBox {...args} />;


export const Default = Template.bind({});
Default.args = {};  // ? No sendMessage injected

//export const Default = () => (
//  <LLmChatBox sendMessage={(msg) => Promise.resolve(`Mocked response to: "${msg}"`)} />
//);
