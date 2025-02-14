import React, { useState } from 'react';
import { FiX } from 'react-icons/fi';
import { useAiSettings } from '../contexts/AiSettingsContext';
import { DEFAULT_SYSTEM_PROMPT } from '../constants/prompts';

interface PromptSettingsProps {
  onClose: () => void;
}

export const PromptSettings: React.FC<PromptSettingsProps> = ({ onClose }) => {
  const { settings, updateSettings } = useAiSettings();
  const [formData, setFormData] = useState({
    systemPrompt: settings.systemPrompt ?? DEFAULT_SYSTEM_PROMPT,
    useDefaultPrompt: settings.useDefaultPrompt ?? true
  });

  const handleSave = () => {
    updateSettings({
      systemPrompt: formData.systemPrompt,
      useDefaultPrompt: formData.useDefaultPrompt
    });
    onClose();
  };

  const handleReset = () => {
    setFormData({
      systemPrompt: DEFAULT_SYSTEM_PROMPT,
      useDefaultPrompt: true
    });
  };

  return (
    <div className="prompt-settings">
      <div className="prompt-settings__header">
        <h2 className="prompt-settings__title">系统 Prompt 设置</h2>
        <div className="prompt-settings__actions">
          <button
            onClick={handleReset}
            className="button button--secondary"
            title="重置为默认 Prompt"
          >
            重置
          </button>
          <button
            onClick={onClose}
            className="button button--icon"
          >
            <FiX />
          </button>
        </div>
      </div>
      <div className="prompt-settings__content">
        <div className="prompt-settings__field">
          <label className="prompt-settings__checkbox-label">
            <input
              type="checkbox"
              checked={formData.useDefaultPrompt}
              onChange={(e) => setFormData(prev => ({ ...prev, useDefaultPrompt: e.target.checked }))}
              className="prompt-settings__checkbox"
            />
            使用默认系统 Prompt
          </label>
          <textarea
            value={formData.useDefaultPrompt ? DEFAULT_SYSTEM_PROMPT : formData.systemPrompt}
            onChange={(e) => setFormData(prev => ({ ...prev, systemPrompt: e.target.value }))}
            placeholder="请输入自定义系统 Prompt..."
            className="prompt-settings__textarea"
            disabled={formData.useDefaultPrompt}
          />
        </div>
      </div>
      <div className="prompt-settings__footer">
        <button
          onClick={onClose}
          className="button button--secondary"
        >
          取消
        </button>
        <button
          onClick={handleSave}
          className="button button--primary"
        >
          保存
        </button>
      </div>
    </div>
  );
}; 