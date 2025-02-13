import React, { useState } from 'react';
import { AiChat } from '../components/AiChat';
import { Message } from '../components/AiChat';
import { useNavigate } from 'react-router-dom';

const AiChatPage: React.FC = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: '你好！我是你的 AI 助手。有什么我可以帮你的吗？',
      status: 1
    }
  ]);

  const handleClose = () => {
    navigate('/');
  };

  return (
    <div className="ai-chat-page">
      <AiChat
        onClose={handleClose}
        messageState={{ messages, setMessages }}
      />
    </div>
  );
};

export default AiChatPage; 