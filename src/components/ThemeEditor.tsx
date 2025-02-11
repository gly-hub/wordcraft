import React, { useState } from 'react';
import { Theme } from '../themes/default';
import { CSSProperties } from 'react';

// 添加渐变方向选项
const gradientDirections = {
  'to right': '从左到右',
  'to left': '从右到左',
  '45deg': '45度',
  '90deg': '90度',
  '135deg': '135度',
  '180deg': '180度',
} as const;

// 定义标题样式类型
type HeadingStyle = CSSProperties & {
  background?: string;
  color?: string;
  padding?: string;
  borderRadius?: string;
  borderLeft?: string;
  boxShadow?: string;
  fontSize?: string;
  margin?: string;
  textAlign?: string;
  position?: string;
  paddingBottom?: string;
  borderBottom?: string;
};

// 定义标题级别类型
type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

// 基础主题模板
const baseTheme: Theme = {
  base: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '15px',
    lineHeight: '1.75',
    color: '#333333',
    letterSpacing: '0.02em',
    textAlign: 'left',
  },
  headings: {
    color: '#333333',
    fontWeight: '600',
    letterSpacing: '0.02em',
    h1: {
      fontSize: '24px',
      margin: '1.5em 0 1em',
      textAlign: 'center',
      borderBottom: '1px solid #eaeaea',
      paddingBottom: '0.5em',
      position: 'relative',
    },
    h2: {
      fontSize: '20px',
      margin: '1.5em 0 1em',
      borderLeft: '4px solid #eaeaea',
      paddingLeft: '12px',
      color: '#333333',
    },
    h3: {
      fontSize: '18px',
      margin: '1.2em 0 0.8em',
      color: '#333333',
    },
    h4: {
      fontSize: '16px',
      margin: '1em 0 0.8em',
      color: '#333333',
    },
    h5: {
      fontSize: '15px',
      margin: '1em 0 0.8em',
      color: '#333333',
    },
    h6: {
      fontSize: '14px',
      margin: '1em 0 0.8em',
      color: '#333333',
    },
  },
  paragraph: {
    margin: '1em 0',
    lineHeight: '1.75',
  },
  image: {
    maxWidth: '100%',
    margin: '1em auto',
    borderRadius: '4px',
  },
  code: {
    fontFamily: 'Consolas, Monaco, "Courier New", monospace',
    fontSize: '14px',
    lineHeight: '1.6',
    block: {
      background: '#f5f5f5',
      padding: '16px',
      margin: '1em 0',
      borderRadius: '4px',
      color: '#333333',
    },
    inline: {
      background: '#f5f5f5',
      padding: '2px 4px',
      borderRadius: '3px',
      color: '#333333',
      fontFamily: 'Consolas, Monaco, "Courier New", monospace',
    },
  },
  table: {
    width: '100%',
    margin: '1em 0',
    fontSize: '14px',
    borderCollapse: 'collapse',
    borderSpacing: '0',
    border: '1px solid #eaeaea',
    cell: {
      padding: '8px 16px',
      border: '1px solid #eaeaea',
    },
    header: {
      background: '#f5f5f5',
      fontWeight: '600',
      border: '1px solid #eaeaea',
      color: '#333333',
    },
  },
  blockquote: {
    margin: '1em 0',
    padding: '12px 16px',
    background: '#f5f5f5',
    borderRadius: '4px',
    color: '#666666',
    borderLeft: '4px solid #eaeaea',
  },
  list: {
    margin: '1em 0',
    padding: '0 0 0 1.5em',
    item: {
      margin: '0.3em 0',
      lineHeight: '1.75',
    },
    unordered: {
      listStyleType: 'disc',
      nestedLevel1: {
        listStyleType: 'circle',
      },
      nestedLevel2: {
        listStyleType: 'square',
      },
    },
    ordered: {
      listStyleType: 'decimal',
      nestedLevel1: {
        listStyleType: 'lower-alpha',
      },
      nestedLevel2: {
        listStyleType: 'lower-roman',
      },
    },
  },
  link: {
    color: '#0066cc',
    textDecoration: 'none',
    borderBottom: '1px solid #0066cc',
  },
  hr: {
    margin: '1.5em 0',
    border: '1px solid #eaeaea',
  },
  emphasis: {
    strong: {
      color: '#333333',
      fontWeight: '600',
    },
    em: {
      color: '#666666',
      fontStyle: 'italic',
    },
  },
} as const;

// 标题样式模板类型
interface HeadingStyleTemplate {
  name: string;
  style: HeadingStyle;
}

// 标题样式模板
const headingStyleTemplates: Record<string, HeadingStyleTemplate> = {
  default: {
    name: '默认样式',
    style: {
      background: 'none',
      color: '#333333',
      padding: '0',
      borderRadius: '0',
      borderLeft: 'none',
      boxShadow: 'none',
    }
  },
  redLine: {
    name: '创新与传承',
    style: {
      background: '#ee827c',
      color: '#ffffff',
      padding: '8px 16px',
      borderRadius: '0',
      borderLeft: 'none',
      boxShadow: 'none',
      borderBottom: '2px solid #ffffff',
      margin: '1.5em 0 1em',
    }
  },
  gradient: {
    name: '渐变背景',
    style: {
      background: 'linear-gradient(90deg, #6c5ce7 0%, #a55eea 100%)',
      color: '#ffffff',
      padding: '8px 16px',
      borderRadius: '8px',
      borderLeft: 'none',
      boxShadow: '0 4px 12px rgba(108, 92, 231, 0.2)',
    }
  },
  leftBorder: {
    name: '左侧边框',
    style: {
      background: 'rgba(108, 92, 231, 0.1)',
      color: '#6c5ce7',
      padding: '8px 16px',
      borderRadius: '4px',
      borderLeft: '4px solid #6c5ce7',
      boxShadow: 'none',
    }
  },
  pill: {
    name: '胶囊形状',
    style: {
      background: '#f5f5f5',
      color: '#333333',
      padding: '4px 16px',
      borderRadius: '20px',
      borderLeft: 'none',
      boxShadow: 'none',
    }
  },
  ribbon: {
    name: '丝带形状',
    style: {
      background: 'linear-gradient(45deg, #ff7675 0%, #ff9f9f 100%)',
      color: '#ffffff',
      padding: '8px 16px',
      borderRadius: '4px 16px 16px 4px',
      borderLeft: 'none',
      boxShadow: '2px 2px 4px rgba(0,0,0,0.1)',
    }
  },
};

interface ThemeEditorProps {
  onSave: (theme: Theme) => void;
  onClose: () => void;
  initialTheme?: Theme | null;
}

export const ThemeEditor: React.FC<ThemeEditorProps> = ({ onSave, onClose, initialTheme }) => {
  const [theme, setTheme] = useState<Theme>(initialTheme || baseTheme);
  const [selectedHeadingLevel, setSelectedHeadingLevel] = useState<HeadingLevel>('h1');
  const [selectedTemplate, setSelectedTemplate] = useState<string>('default');

  const handleChange = (path: string, value: string) => {
    const pathArray = path.split('.');
    setTheme(prev => {
      const newTheme = { ...prev };
      let current = newTheme as Record<string, unknown>;
      
      // 遍历路径并设置值
      for (let i = 0; i < pathArray.length - 1; i++) {
        current = current[pathArray[i]] as Record<string, unknown>;
      }
      current[pathArray[pathArray.length - 1]] = value;

      return newTheme;
    });
  };

  const extractGradientInfo = (background: string) => {
    if (!background || !background.includes('linear-gradient')) {
      return {
        direction: 'to right' as const,
        colors: ['#ee827c', '#ee827c'] as [string, string]
      };
    }

    const match = background.match(/linear-gradient\((.*?),(.*?),(.*?)\)/);
    if (match) {
      const [, direction, color1, color2] = match;
      const trimmedColor1 = color1?.trim() || '#ee827c';
      const trimmedColor2 = color2?.trim() || '#ee827c';
      return {
        direction: direction.trim() as keyof typeof gradientDirections,
        colors: [trimmedColor1, trimmedColor2] as [string, string]
      };
    }

    return {
      direction: 'to right' as const,
      colors: ['#ee827c', '#ee827c'] as [string, string]
    };
  };

  const checkIfGradient = (background: string) => {
    return background?.includes('linear-gradient') || false;
  };

  const handleHeadingLevelChange = (level: HeadingLevel) => {
    const heading = theme.headings[level];
    
    setSelectedHeadingLevel(level);

    // 检查当前样式是否匹配任何模板
    const templateKey = getCurrentTemplateKey(heading as HeadingStyle);
    setSelectedTemplate(templateKey);
  };

  const getCurrentTemplateKey = (style: HeadingStyle) => {
    return Object.entries(headingStyleTemplates).find(([, template]) => {
      const templateStyle = template.style;
      return Object.entries(templateStyle).every(([key, value]) => style[key as keyof HeadingStyle] === value);
    })?.[0] || '';
  };

  const applyHeadingStyle = (templateStyle: HeadingStyle, templateKey: string) => {
    setSelectedTemplate(templateKey);
    setTheme(prev => {
      const newTheme = { ...prev };
      const heading = (newTheme.headings as Record<string, HeadingStyle>)[selectedHeadingLevel];
      
      // 清除之前的样式
      heading.background = 'none';
      heading.color = newTheme.headings.color;
      heading.padding = '0';
      heading.borderRadius = '0';
      heading.borderLeft = 'none';
      heading.boxShadow = 'none';

      // 应用新样式
      Object.entries(templateStyle).forEach(([key, value]) => {
        if (value !== undefined) {
          heading[key as keyof HeadingStyle] = value;
        }
      });

      return newTheme;
    });
  };

  // 添加统一的颜色输入组件
  const ColorInput = ({ 
    label, 
    value, 
    onChange, 
    supportsGradient = false
  }: { 
    label: string;
    value: string;
    onChange: (value: string) => void;
    supportsGradient?: boolean;
  }) => {
    const [isGradient, setIsGradient] = useState(() => checkIfGradient(value));
    const [colors, setColors] = useState(() => {
      if (checkIfGradient(value)) {
        const { colors } = extractGradientInfo(value);
        return { 
          color1: colors[0] || '#000000', 
          color2: colors[1] || '#000000' 
        };
      }
      return { 
        color1: value === 'none' ? '#000000' : value, 
        color2: value === 'none' ? '#000000' : value 
      };
    });
    const [direction, setDirection] = useState(() => {
      if (checkIfGradient(value)) {
        const { direction } = extractGradientInfo(value);
        return direction as keyof typeof gradientDirections;
      }
      return 'to right';
    });

    const handleColorChange = (newColors: { color1: string; color2: string }, newDirection?: string) => {
      if (isGradient) {
        const gradientValue = `linear-gradient(${newDirection || direction}, ${newColors.color1}, ${newColors.color2})`;
        onChange(gradientValue);
      } else {
        onChange(newColors.color1);
      }
    };

    return (
      <div className="theme-editor__form-group">
        <label className="theme-editor__label">{label}</label>
        <div className="theme-editor__input-wrapper">
          <div className="theme-editor__input-row">
            <input
              type="color"
              value={colors.color1}
              onChange={(e) => {
                const newColors = { ...colors, color1: e.target.value };
                setColors(newColors);
                handleColorChange(newColors);
              }}
              className="theme-editor__input theme-editor__input--color"
            />
            <input
              type="text"
              value={colors.color1}
              onChange={(e) => {
                const newColors = { ...colors, color1: e.target.value };
                setColors(newColors);
                handleColorChange(newColors);
              }}
              className="theme-editor__input"
            />
            {supportsGradient && (
              <label className="theme-editor__gradient-toggle">
                <input
                  type="checkbox"
                  checked={isGradient}
                  onChange={(e) => {
                    setIsGradient(e.target.checked);
                    if (e.target.checked) {
                      const gradientValue = `linear-gradient(to right, ${colors.color1}, ${colors.color2})`;
                      onChange(gradientValue);
                    } else {
                      onChange(colors.color1);
                    }
                  }}
                />
                渐变
              </label>
            )}
          </div>

          {isGradient && supportsGradient && (
            <>
              <div className="theme-editor__input-row">
                <label className="theme-editor__label">结束颜色</label>
                <input
                  type="color"
                  value={colors.color2}
                  onChange={(e) => {
                    const newColors = { ...colors, color2: e.target.value };
                    setColors(newColors);
                    handleColorChange(newColors);
                  }}
                  className="theme-editor__input theme-editor__input--color"
                />
                <input
                  type="text"
                  value={colors.color2}
                  onChange={(e) => {
                    const newColors = { ...colors, color2: e.target.value };
                    setColors(newColors);
                    handleColorChange(newColors);
                  }}
                  className="theme-editor__input"
                />
              </div>
              <div className="theme-editor__input-row">
                <label className="theme-editor__label">渐变方向</label>
                <select
                  value={direction}
                  onChange={(e) => {
                    setDirection(e.target.value as keyof typeof gradientDirections);
                    handleColorChange(colors, e.target.value);
                  }}
                  className="theme-editor__input"
                >
                  {Object.entries(gradientDirections).map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  // 添加回 renderTextInput 函数
  const renderTextInput = (label: string, path: string, value: string) => (
    <div className="theme-editor__form-group">
      <label className="theme-editor__label">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => handleChange(path, e.target.value)}
        className="theme-editor__input"
      />
    </div>
  );

  // 添加回 renderColorInput 函数
  const renderColorInput = (label: string, path: string, value: string) => (
    <div className="theme-editor__form-group">
      <label className="theme-editor__label">{label}</label>
      <input
        type="color"
        value={value === 'none' || !value ? '#000000' : value}
        onChange={(e) => handleChange(path, e.target.value)}
        className="theme-editor__input theme-editor__input--color"
      />
      <input
        type="text"
        value={value || 'none'}
        onChange={(e) => handleChange(path, e.target.value)}
        className="theme-editor__input"
      />
    </div>
  );

  return (
    <div className="theme-editor">
      <div className="theme-editor__container">
        <div className="theme-editor__header">
          <h2 className="theme-editor__title">自定义主题</h2>
          <button
            onClick={onClose}
            className="theme-editor__close"
          >
            ✕
          </button>
        </div>
        
        <div className="theme-editor__content">
          <div className="theme-editor__section">
            {/* 基础样式 */}
            <div className="theme-editor__section">
              <h3 className="theme-editor__section-title">基础样式</h3>
              {renderTextInput('字体', 'base.fontFamily', theme.base.fontFamily)}
              {renderTextInput('字体大小', 'base.fontSize', theme.base.fontSize)}
              {renderColorInput('文字颜色', 'base.color', theme.base.color)}
            </div>

            {/* 标题样式 */}
            <div className="theme-editor__section">
              <h3 className="theme-editor__section-title">标题样式</h3>
              <div className="theme-editor__heading-tabs">
                {['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].map((level) => (
                  <button
                    key={level}
                    onClick={() => handleHeadingLevelChange(level as HeadingLevel)}
                    className={`theme-editor__tab ${
                      selectedHeadingLevel === level ? 'theme-editor__tab--active' : ''
                    }`}
                  >
                    {level.toUpperCase()}
                  </button>
                ))}
              </div>

              <div className="theme-editor__templates">
                {Object.entries(headingStyleTemplates).map(([key, template]) => (
                  <button
                    key={key}
                    onClick={() => applyHeadingStyle(template.style, key)}
                    className={`theme-editor__template ${
                      selectedTemplate === key ? 'theme-editor__template--active' : ''
                    }`}
                  >
                    <span className="theme-editor__template-name">{template.name}</span>
                    <div
                      className="theme-editor__template-preview"
                      style={template.style}
                    >
                      示例文本
                    </div>
                  </button>
                ))}
              </div>

              <div className="theme-editor__form">
                <ColorInput
                  label="背景颜色"
                  value={theme.headings[selectedHeadingLevel].background || 'none'}
                  onChange={(value) => handleChange(`headings.${selectedHeadingLevel}.background`, value)}
                  supportsGradient={true}
                />
                {renderColorInput('文字颜色', `headings.${selectedHeadingLevel}.color`, theme.headings[selectedHeadingLevel].color || theme.headings.color)}
                {renderTextInput('内边距', `headings.${selectedHeadingLevel}.padding`, theme.headings[selectedHeadingLevel].padding || '0')}
                {renderTextInput('圆角', `headings.${selectedHeadingLevel}.borderRadius`, theme.headings[selectedHeadingLevel].borderRadius || '0')}
                {renderTextInput('边框', `headings.${selectedHeadingLevel}.borderLeft`, theme.headings[selectedHeadingLevel].borderLeft || 'none')}
                {renderTextInput('阴影', `headings.${selectedHeadingLevel}.boxShadow`, theme.headings[selectedHeadingLevel].boxShadow || 'none')}
              </div>
            </div>

            {/* 代码样式 */}
            <div className="theme-editor__section">
              <h3 className="theme-editor__section-title">代码样式</h3>
              {renderTextInput('代码字体', 'code.fontFamily', theme.code.fontFamily)}
              {renderColorInput('背景色', 'code.block.background', theme.code.block.background)}
              {renderColorInput('文字颜色', 'code.block.color', theme.code.block.color)}
            </div>

            {/* 引用样式 */}
            <div className="theme-editor__section">
              <h3 className="theme-editor__section-title">引用样式</h3>
              {renderColorInput('背景色', 'blockquote.background', theme.blockquote.background)}
              {renderColorInput('文字颜色', 'blockquote.color', theme.blockquote.color)}
              {renderTextInput('边框', 'blockquote.borderLeft', theme.blockquote.borderLeft)}
            </div>
          </div>
        </div>

        <div className="theme-editor__footer">
          <button
            onClick={onClose}
            className="button button--secondary"
          >
            取消
          </button>
          <button
            onClick={() => onSave(theme)}
            className="button button--primary"
          >
            保存主题
          </button>
        </div>
      </div>
    </div>
  );
}; 