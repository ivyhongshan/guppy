import React, { useState } from 'react';
import ConnectedFilter from '../src/components/ConnectedFilter';
import LLmChatBox_filter from './LLmChatBox_filter';

const LLMFilterAnalyzer = ({ filterConfig, guppyConfig, fieldMapping }) => {
  const [filteredData, setFilteredData] = useState([]);

  const fetchFilteredData = async (filters) => {
  console.log('Sending GraphQL filter:', filters);
    const query = {
  query: `
    query {
      subject {
        subject_id
        project
        vital_status
        race
      }
    }
  `
};

    try {
      const res = await fetch('http://localhost:3010/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(query),
      });
      const json = await res.json();
      console.log('GraphQL response:', json);
      return json.data._subject || [];
    } catch (err) {
      console.error('? GraphQL fetch failed:', err);
      return [];
    }
  };

  const handleFilterChange = async (mappedFilterState) => {
  console.log('?? Filter changed:', mappedFilterState);

  const filterNodes = [];

  if (mappedFilterState?.project?.selectedValues?.length > 0) {
    filterNodes.push({
      op: 'in',
      content: {
        field: 'project',
        value: mappedFilterState.project.selectedValues,
      },
    });
  }

  // If no filters applied, don't query
  if (filterNodes.length === 0) {
    console.warn('No valid filters selected - skipping query');
    setFilteredData([]); // clear previous results
    return;
  }

  const guppyFilter = {
    op: 'and',
    content: filterNodes,
  };

  const data = await fetchFilteredData(guppyFilter);
  setFilteredData(data);
};

  const getPromptFromInput = (userInput, data) => {
    if (data.length > 0) {
      const summary = data.slice(0, 5).map((item, idx) =>
        `(${idx + 1}) Subject: ${item.subject_id}, Project: ${item.project}, Race: ${item.race}, Vital Status: ${item.vital_status}`
      ).join('\n');

      return `${userInput}\n\nLLM sees the following filtered data:\n${summary}`;
    } else {
      return `${userInput}\n\n(There is no data selected.)`;
    }
  };

  const sendMessage = async (prompt) => {
  try {
    const res = await fetch(`http://localhost:3000/anagine/llm/chat?prompt=${encodeURIComponent(prompt)}`);
    const data = await res.json();
    return data?.response?.message?.content || '[No response]';
  } catch (error) {
    console.error('? LLM fetch error:', error);
    return 'Error: Failed to fetch response.';
  }
};

  console.log('Current filtered data:', filteredData);
  return (
    <div style={{ padding: '1rem' }}>
      <h1>LLM-Assisted Filter Analysis</h1>
      <ConnectedFilter
        filterConfig={filterConfig}
        guppyConfig={guppyConfig}
        fieldMapping={fieldMapping}
        filterTabConfigs={[{ title: 'Basic Filters', fields: ['project', 'subject'] }]}
        onFilterChange={handleFilterChange}
      />
      <LLmChatBox_filter filteredData={filteredData} sendMessage={sendMessage} />
    </div>
  );
};

export default LLMFilterAnalyzer;

