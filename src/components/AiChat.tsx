import React, { useState, useRef, useEffect } from 'react';
import { FiSettings, FiFileText, FiSend, FiX, FiClipboard, FiGlobe, FiRefreshCw, FiTrash2 } from 'react-icons/fi';
import { useAiSettings } from '../contexts/AiSettingsContext';
import { AiSettings } from './AiSettings';
import { getSystemPrompt, WELCOME_MESSAGE } from '../constants/prompts';

export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  isEditorContent?: boolean;
  status: 1 | 2 | 3; // 1-成功 2-失败 3-等待中
}

interface AiChatProps {
  onClose: () => void;
  onApplyToEditor?: (content: string) => void;
  editorContent?: string;
  messageState: {
    messages: Message[];
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  };
}

// 添加在组件顶部的动画样式
const LoadingDots = () => {
  return (
    <div className="flex gap-2 items-center text-gray-700">
      <div className="flex gap-1 items-center">
        <div className="loading-text">
          <span>分</span>
          <span>析</span>
          <span>中</span>
        </div>
        <div className="loading-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
};

const EditorContentTag = ({ text }: { text: string }) => (
  <span className="editor-content-tag">
    <FiFileText />
    {text}
  </span>
);

export const AiChat: React.FC<AiChatProps> = ({ onClose, onApplyToEditor, editorContent, messageState }) => {
  const { messages, setMessages } = messageState;
  const [input, setInput] = useState('');
  const [enableSearch, setEnableSearch] = useState(() => {
    const saved = localStorage.getItem('enableSearch');
    return saved ? JSON.parse(saved) : false;
  });
  const [showSettings, setShowSettings] = useState(false);
  const { settings } = useAiSettings();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  // 当 enableSearch 改变时保存到 localStorage
  useEffect(() => {
    localStorage.setItem('enableSearch', JSON.stringify(enableSearch));
  }, [enableSearch]);

  const handleSendToAi = async (message: Message, isRetry = false) => {
    let sendMessage: any[] = []
    try {
      if (!isRetry) {
        // 如果不是重试，只添加空的assistant消息
        setMessages(prev => [
          ...prev,
          {
            role: 'assistant',
            content: '',
            status: 3
          }
        ]);
        sendMessage  = [
          {
            role: 'system',
            content: getSystemPrompt(enableSearch)
          },
          ...messages.filter(msg => msg.role !== 'system').map(msg => {
            let content = msg.content
            if (msg.role === 'user' && msg.isEditorContent) {
              content = msg.content.replace('@编辑器内容', editorContent || '')
            }
            return {
              role: msg.role,
              content: content
            }
          }),
          {
            role: message.role,
            content: message.content
          }
        ]
      } else {
        // 如果是重试，删除上一条失败的消息，并添加新的等待消息
        setMessages(prev => {
          const newMessages = prev.slice(0, -1);
          return [
            ...newMessages,
            {
              role: 'assistant',
              content: '',
              status: 3
            }
          ];
        });
        sendMessage  = [
          {
            role: 'system',
            content: getSystemPrompt(enableSearch)
          },
          ...messages.slice(0, -1).filter(msg => msg.role !== 'system').map(msg => ({
            role: msg.role,
            content: msg.content
          }))
        ]
      }
      const response = await fetch(settings.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${settings.apiKey}`
        },
        body: JSON.stringify({
          model: settings.model,
          messages: sendMessage,
          enable_search: enableSearch
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error?.message || 'Failed to get response');
      }

      // 更新最后一条等待中的assistant消息
      setMessages(prev => {
        const newMessages = [...prev];
        const lastMessage = newMessages[newMessages.length - 1];
        if (lastMessage.role === 'assistant' && lastMessage.status === 3) {
          lastMessage.content = data.choices[0].message.content;
          lastMessage.status = 1;
        }
        return newMessages;
      });

    } catch (error) {
      console.error('Error:', error);
      // 更新最后一条等待中的消息为失败状态
      setMessages(prev => {
        const newMessages = [...prev];
        const lastMessage = newMessages[newMessages.length - 1];
        if (lastMessage.role === 'assistant' && lastMessage.status === 3) {
          lastMessage.content = '抱歉，处理请求时出现错误。请检查网络连接或API设置，然后重试。';
          lastMessage.status = 2;
        }
        return newMessages;
      });
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        role: 'system',
        content: getSystemPrompt(enableSearch),
        status: 1
      },
      {
        role: 'assistant',
        content: WELCOME_MESSAGE,
        status: 1
      }
    ]);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleInsertEditorContent = () => {
    const textarea = inputRef.current;
    if (!textarea) return;
    
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const newInput = input.slice(0, start) + '@编辑器内容' + input.slice(end);
    setInput(newInput);
    
    // 设置新的光标位置
    setTimeout(() => {
      const newPosition = start + '@编辑器内容'.length;
      textarea.setSelectionRange(newPosition, newPosition);
      textarea.focus();
    }, 0);
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      isEditorContent: input.includes('@编辑器内容'),
      status: 1
    };

    // 保存原始消息到显示用的消息列表
    setMessages(prev => [...prev, userMessage]);

    // 创建一个新的消息对象用于发送给 AI
    const processedMessage = {
      ...userMessage,
      content: input.replace(/@编辑器内容/g, editorContent || '')
    };

    setInput('');
    handleSendToAi(processedMessage);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const renderMessageContent = (message: Message) => {
    // 如果是用户消息且包含编辑器内容标记，保留标记并高亮显示
    if (message.role === 'user' && message.isEditorContent) {
      return message.content.split(/(@编辑器内容)/).map((part, index) => 
        part === '@编辑器内容' ? 
          <EditorContentTag key={index} text="@编辑器内容" /> : 
          part
      );
    }
    // 如果是AI消息或不包含编辑器内容标记，直接显示内容
    return message.content;
  };

  // 在消息列表更新时滚动到底部
  useEffect(() => {
    scrollToBottom();
    inputRef.current?.focus();
  }, [messages]);

  return (
    <div className="chat">
      {/* 聊天头部 */}
      <div className="chat__header">
        <h2 className="chat__title">AI 助手</h2>
        <div className="chat__actions">
          <button
            onClick={() => setEnableSearch(!enableSearch)}
            className={`button button--icon ${enableSearch ? 'button--icon--active' : ''}`}
            title={enableSearch ? "关闭联网搜索" : "开启联网搜索"}
          >
            <FiGlobe />
          </button>
          <button
            onClick={handleClearChat}
            className="button button--icon"
            title="清空聊天"
          >
            <FiTrash2 />
          </button>
          <button
            onClick={() => setShowSettings(true)}
            className="button button--icon"
            title="设置"
          >
            <FiSettings />
          </button>
          <button
            onClick={onClose}
            className="button button--icon"
            title="关闭"
          >
            <FiX />
          </button>
        </div>
      </div>

      {/* 聊天消息区域 */}
      <div className="chat__messages">
        {messages.filter(msg => msg.role !== 'system').map((message, index) => (
          <div
            key={index}
            className={`chat__message ${
              message.role === 'assistant' ? 'chat__message--assistant' : 'chat__message--user'
            }`}
          >
            <div className="chat__message-content">
              {message.role === 'assistant' && message.status === 3 ? (
                <LoadingDots />
              ) : (
                <>
                  {renderMessageContent(message)}
                  {message.role === 'assistant' && message.status === 2 && (
                    <button
                      onClick={() => handleSendToAi(messages[index - 1], true)}
                      className="chat__message-action chat__message-action--error"
                      title="重试"
                    >
                      <FiRefreshCw />
                    </button>
                  )}
                  {message.role === 'assistant' && onApplyToEditor && message.status === 1 && (
                    <button
                      onClick={() => onApplyToEditor(message.content)}
                      className="chat__message-action"
                      title="应用到编辑器"
                    >
                      <FiClipboard />
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* 输入区域 */}
      <div className="chat__input">
        <textarea
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="输入消息，按Enter发送，Shift+Enter换行..."
          className="chat__textarea"
        />
        <div className="chat__input-actions">
          <button
            onClick={handleInsertEditorContent}
            disabled={!editorContent}
            className="button button--secondary"
            title={editorContent ? "插入编辑器内容" : "编辑器内容为空"}
          >
            <FiFileText />
          </button>
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="button button--primary chat__submit"
          >
            <FiSend />
            发送
          </button>
        </div>
      </div>

      {/* AI设置弹框 */}
      {showSettings && (
        <div className="modal">
          <AiSettings onClose={() => setShowSettings(false)} />
        </div>
      )}
    </div>
  );
}; 