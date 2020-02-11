import React from 'react';
import { Card, Icon, Avatar } from 'antd';

function PromptCard(props) {
  const { prompt } = props;
  console.log(prompt)

  return (
    <Card className="prompt-card" bordered={false}>
      <p className="small">{prompt.question}</p>
    </Card>
  )
}

export default PromptCard;