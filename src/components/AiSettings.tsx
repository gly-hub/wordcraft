import React, { useState } from 'react';
import { FiX } from 'react-icons/fi';
import { useAiSettings } from '../contexts/AiSettingsContext';

interface AiSettingsProps {
  onClose: () => void;
}

export const AiSettings: React.FC<AiSettingsProps> = ({ onClose }) => {
  const { settings, updateSettings } = useAiSettings();
  const [formData, setFormData] = useState({
    apiUrl: settings.apiUrl,
    apiKey: settings.apiKey,
    model: settings.model,
  });
  const [customModel, setCustomModel] = useState('');

  const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === 'custom') {
      setFormData(prev => ({ ...prev, model: customModel || '' }));
    } else {
      setFormData(prev => ({ ...prev, model: value }));
    }
  };

  const handleCustomModelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomModel(value);
    setFormData(prev => ({ ...prev, model: value }));
  };

  const isCustomModel = !['gpt-3.5-turbo', 'gpt-4', 'claude-2'].includes(formData.model);

  const handleSave = () => {
    updateSettings(formData);
    onClose();
  };

  return (
    <div className="settings">
      <div className="settings__header">
        <h2 className="settings__title">AI设置</h2>
        <button
          onClick={onClose}
          className="button button--icon"
        >
          <FiX />
        </button>
      </div>
      <div className="settings__content">
        <div className="settings__field">
          <label className="settings__label">API地址</label>
          <input
            type="text"
            value={formData.apiUrl}
            onChange={(e) => setFormData(prev => ({ ...prev, apiUrl: e.target.value }))}
            placeholder="请输入API地址"
            className="settings__input"
          />
        </div>
        <div className="settings__field">
          <label className="settings__label">API Key</label>
          <input
            type="password"
            value={formData.apiKey}
            onChange={(e) => setFormData(prev => ({ ...prev, apiKey: e.target.value }))}
            placeholder="请输入API Key"
            className="settings__input"
          />
        </div>
        <div className="settings__field">
          <label className="settings__label">模型选择</label>
          <div className="settings__model-select">
            <select
              value={isCustomModel ? 'custom' : formData.model}
              onChange={handleModelChange}
              className="settings__input"
            >
              <option value="gpt-3.5-turbo">GPT-3.5-Turbo</option>
              <option value="gpt-4">GPT-4</option>
              <option value="claude-2">Claude-2</option>
              <option value="custom">自定义</option>
            </select>
            {isCustomModel && (
              <input
                type="text"
                value={formData.model}
                onChange={handleCustomModelChange}
                placeholder="请输入自定义模型名称"
                className="settings__input"
                autoFocus
              />
            )}
          </div>
        </div>
      </div>
      <div className="settings__footer">
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