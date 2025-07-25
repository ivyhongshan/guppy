import React from 'react';
import LLMFilterAnalyzer from './LLMFilterAnalyzer';
import { filterConfig, guppyConfig, fieldMapping } from './conf';

export default {
  title: 'LLM/LLMFilterAnalyzer',
  component: LLMFilterAnalyzer,
};

const Template = (args) => <LLMFilterAnalyzer {...args} />;

export const Default = Template.bind({});
Default.args = {
  filterConfig,
  guppyConfig,
  fieldMapping,
};
