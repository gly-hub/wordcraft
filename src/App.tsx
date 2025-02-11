import React, { useEffect, useState, useRef } from 'react';
import TurndownService from 'turndown';
import { FiCopy, FiCheck, FiSmartphone, FiMonitor, FiSun, FiFeather, FiMessageSquare } from 'react-icons/fi';
import Preview from './components/Preview';
import { applyThemeStyles } from './utils/themeUtils';
import { ThemeProvider, useTheme, ThemeName } from './contexts/ThemeContext';
import { ThemeEditor } from './components/ThemeEditor';
import { AiChat, Message } from './components/AiChat';
import { AiSettings } from './components/AiSettings';
import { AiSettingsProvider } from './contexts/AiSettingsContext';

const turndownService = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  emDelimiter: '*',
  bulletListMarker: '-',
  strongDelimiter: '**',
  br: ''
});

// 保留特定的 HTML 标签
turndownService.keep(['div', 'span', 'pre', 'code']);

// 获取单元格对齐方式的辅助函数
function getCellAlignment(cell: HTMLElement): string {
  const style = cell.getAttribute('style') || '';
  const className = cell.getAttribute('class') || '';
  
  // 优先检查 style 属性中的对齐方式
  if (style.includes('text-align: center') || className.includes('align-center')) {
    return ':---:';
  }
  if (style.includes('text-align: right') || className.includes('align-right')) {
    return '---:';
  }
  if (style.includes('text-align: left') || className.includes('align-left')) {
    return ':---';
  }
  return '---'; // 默认左对齐
}

// 处理图片的辅助函数
function processImage(img: HTMLImageElement): string {
  let src = img.getAttribute('src') || '';
  const alt = img.alt || '';
  const originSrc = img.getAttribute('data-origin-src');
  const tokenSrc = img.getAttribute('data-token-src');
  
  // 获取图片尺寸
  const width = img.getAttribute('width') || img.style.width || '';
  const height = img.getAttribute('height') || img.style.height || '';
  const style = img.getAttribute('style') || '';
  
  // 从 style 中提取宽高（如果存在）
  const widthMatch = style.match(/width:\s*(\d+)px/);
  const heightMatch = style.match(/height:\s*(\d+)px/);
  const styleWidth = widthMatch ? widthMatch[1] : '';
  const styleHeight = heightMatch ? heightMatch[1] : '';
  
  // 优先使用原始图片链接
  if (originSrc) {
    src = originSrc;
  } else if (tokenSrc) {
    src = tokenSrc;
  }
  
  // 如果是 base64 图片，直接使用
  if (src.startsWith('data:image')) {
    return `![${alt}](${src})`;
  }

  
  // 构建 HTML 格式的图片标签以保持尺寸
  const actualWidth = width || styleWidth;
  const actualHeight = height || styleHeight;
  
  if (actualWidth || actualHeight) {
    const sizeStyle = [];
    if (actualWidth) sizeStyle.push(`width: ${actualWidth}px`);
    if (actualHeight) sizeStyle.push(`height: ${actualHeight}px`);
    return `<img src="${src}" alt="${alt}" style="${sizeStyle.join('; ')}" />`;
  }
  
  return `![${alt}](${src})`;
}

// 处理单元格内容的辅助函数
function processCellContent(cell: HTMLElement): string {
  // 处理图片
  const img = cell.querySelector('img');
  if (img) {
    return processImage(img);
  }

  // 处理加粗
  const boldText = Array.from(cell.querySelectorAll('strong, b')).map(b => b.textContent).join(' ');
  if (boldText) {
    return `**${boldText}**`;
  }

  // 处理普通文本
  const text = cell.textContent?.trim() || '';
  return text.replace(/\|/g, '\\|'); // 转义表格中的竖线
}

// 配置图片转换规则
turndownService.addRule('image', {
  filter: 'img',
  replacement: function(content, node) {
    const img = node as HTMLImageElement;
    return processImage(img);
  }
});

// 自定义规则处理代码块
turndownService.addRule('codeBlock', {
  filter: function(node: HTMLElement) {
    return (
      node.nodeName === 'PRE' &&
      node.firstChild?.nodeName === 'CODE'
    );
  },
  replacement: function(content: string, node: Node) {
    const code = node.firstChild as HTMLElement;
    const className = code?.getAttribute('class') || '';
    const language = className.replace(/^language-/, '') || '';
    const text = code?.textContent || '';
    return `\n\`\`\`${language}\n${text.trim()}\n\`\`\`\n`;
  }
});

// 配置表格转换规则
turndownService.addRule('table', {
  filter: 'table',
  replacement: function(content: string, node: Node) {
    const table = node as HTMLTableElement;
    let markdown = '\n';
    
    // 处理表头
    const headerRow = table.querySelector('tr');
    if (headerRow) {
      const headers = Array.from(headerRow.querySelectorAll('th,td')).map(cell => {
        return processCellContent(cell as HTMLElement);
      });
      
      // 获取每列的对齐方式
      const alignments = Array.from(headerRow.querySelectorAll('th,td')).map(cell => {
        return getCellAlignment(cell as HTMLElement);
      });

      markdown += '| ' + headers.join(' | ') + ' |\n';
      markdown += '|' + alignments.join('|') + '|\n';
    }

    // 处理表格内容
    const rows = Array.from(table.querySelectorAll('tr')).slice(1);
    rows.forEach(row => {
      const cells = Array.from(row.querySelectorAll('td')).map(cell => {
        return processCellContent(cell as HTMLElement);
      });
      markdown += '| ' + cells.join(' | ') + ' |\n';
    });

    return markdown + '\n';
  }
});

const defaultContent = ``;

const Home: React.FC = () => {
  const [markdown, setMarkdown] = useState(defaultContent);
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isMobilePreview, setIsMobilePreview] = useState(true);
  const previewRef = useRef<HTMLDivElement>(null);
  const previewWrapperRef = useRef<HTMLDivElement>(null);
  const { themeName, setTheme, currentTheme, setCustomTheme, isUsingCustomTheme, customTheme } = useTheme();
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const themeMenuRef = useRef<HTMLDivElement>(null);
  const [showThemeEditor, setShowThemeEditor] = useState(false);
  const [showAiChat, setShowAiChat] = useState(false);
  const [showAiSettings, setShowAiSettings] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{
    role: 'assistant',
    content: `你好！我是你的文章优化助手，一位专业的时事焦点评论家。我可以帮你：

• 分析文章结构和论点
• 优化文章表达和逻辑
• 补充相关时事背景
• 提供专业的评论视角
• 改进文章的说服力

你可以直接发送文章内容，或者告诉我你想写什么主题，我们一起探讨和完善。

💡 提示：可以点击右上角的地球图标开启联网搜索，我将为你提供最新的时事参考。`,
    status: 1
  }]);

  const messageState = {
    messages,
    setMessages
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (previewWrapperRef.current) {
      previewWrapperRef.current.scrollTop = 0;
    }
  }, [isMobilePreview]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (themeMenuRef.current && !themeMenuRef.current.contains(event.target as Node)) {
        setIsThemeMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleCopyToWeixin = async () => {
    try {
      const container = document.createElement('div');
      container.style.position = 'absolute';
      container.style.left = '-9999px';
      document.body.appendChild(container);

      // 创建一个临时的预览容器
      const tempPreview = document.createElement('div');
      
      // 复制预览区域的内容
      if (previewRef.current) {
        const content = previewRef.current.innerHTML;
        tempPreview.innerHTML = applyThemeStyles(content, currentTheme);
      }
      
      // 创建包含样式的HTML blob
      const blob = new Blob([tempPreview.innerHTML], { type: 'text/html' });
      
      // 复制到剪贴板
      await navigator.clipboard.write([
        new ClipboardItem({
          'text/html': blob
        })
      ]);
      
      // 清理
      document.body.removeChild(container);
      
      // 显示成功提示
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('复制失败:', error);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const html = e.clipboardData.getData('text/html');
    const plainText = e.clipboardData.getData('text/plain');
    
    if (html) {
      e.preventDefault();
      
      // 如果是纯代码块，直接使用纯文本
      if (plainText.startsWith('```') || (
        html.includes('class="language-') && 
        !html.includes('<table') && 
        !html.includes('<p') && 
        !html.includes('<h')
      )) {
        setMarkdown(plainText);
        return;
      }
      
      // 预处理 HTML
      const cleanHtml = html
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        // 预处理代码块，避免内部内容被转义
        .replace(/<pre><code[^>]*>([\s\S]*?)<\/code><\/pre>/g, (match, p1) => {
          return match.replace(p1, p1
            .replace(/\\/g, '\\\\')
            .replace(/\*/g, '\\*')
            .replace(/\[/g, '\\[')
            .replace(/\]/g, '\\]')
            .replace(/\(/g, '\\(')
            .replace(/\)/g, '\\)')
          );
        });
        
      let markdownContent = turndownService.turndown(cleanHtml);
      
      // 后处理 Markdown，移除不必要的转义
      markdownContent = markdownContent
        .replace(/\\</g, '<')
        .replace(/\\>/g, '>')
        .replace(/\\\*/g, '*')
        .replace(/\\\[/g, '[')
        .replace(/\\\]/g, ']')
        .replace(/\\\(/g, '(')
        .replace(/\\\)/g, ')')
        .replace(/\\\{/g, '{')
        .replace(/\\\}/g, '}')
        .replace(/\\`/g, '`')
        // 修复连续的转义反斜杠
        .replace(/\\\\/g, '\\')
        // 修复代码块内的转义
        .replace(/```[\s\S]*?```/g, match => 
          match.replace(/\\([\\*\[\](){}])/g, '$1')
        );
        
      setMarkdown(markdownContent);
    }
  };

  // 主题切换按钮配置
  const themeButtons = [
    { name: 'default', icon: FiSun, title: '默认主题' },
    { name: 'cool', icon: FiFeather, title: '酷炫主题' }
  ];

  if (!mounted) {
    return (
      <div className="app">
        <div className="editor__container">
          <div className="editor__header" />
          <div className="editor__content" />
        </div>
        <div className="preview__container">
          <div className="preview__content" />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="app">
        {/* 左侧编辑器 */}
        <div className="editor__container">
          <div className="editor__header">
            <svg className="editor__header-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 13H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10 9H9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="editor__header-title">markdown 排版工具</span>
            <span className="editor__header-subtitle">排版工具</span>
          </div>
          <div className="editor__content">
            <textarea
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              placeholder="在这里输入 Markdown 内容..."
              onPaste={handlePaste}
              className="editor__textarea"
            />
          </div>
        </div>

        {/* 右侧预览 */}
        <div ref={previewWrapperRef} className="preview__container">
          <div className={`preview__content ${isMobilePreview ? 'preview__content--mobile' : ''}`}>
            {isMobilePreview && (
              <div className="preview__phone-notch">
                <div className="preview__phone-notch-speaker" />
                <div className="preview__phone-notch-camera" />
              </div>
            )}
            <div className={`preview__scroll ${isMobilePreview ? 'preview__scroll--mobile' : ''}`}>
              <div ref={previewRef}>
                <Preview content={markdown} />
              </div>
            </div>
          </div>

          {/* 功能按钮组 */}
          <div className="preview__actions">
            <button
              onClick={() => setShowAiChat(true)}
              title="AI助手"
              className="preview-action"
            >
              <FiMessageSquare />
            </button>

            <div className="theme-switcher">
              <button
                onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
                title="切换主题"
                className={`theme-switcher__toggle ${isThemeMenuOpen ? 'theme-switcher__toggle--active' : ''}`}
              >
                <FiSun />
              </button>

              {isThemeMenuOpen && (
                <div className="theme-switcher__menu">
                  {themeButtons.map(({ name, icon: Icon, title }) => (
                    <button
                      key={name}
                      onClick={() => {
                        setTheme(name as ThemeName);
                        setIsThemeMenuOpen(false);
                      }}
                      className={`theme-switcher__button ${
                        themeName === name && !isUsingCustomTheme ? 'theme-switcher__button--active' : ''
                      }`}
                    >
                      <Icon />
                      <span>{title}</span>
                    </button>
                  ))}
                  <button
                    onClick={() => {
                      setShowThemeEditor(true);
                      setIsThemeMenuOpen(false);
                    }}
                    className={`theme-switcher__button ${
                      isUsingCustomTheme ? 'theme-switcher__button--active' : ''}`}
                  >
                    <FiFeather />
                    <span>自定义主题</span>
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => setIsMobilePreview(!isMobilePreview)}
              title={isMobilePreview ? '切换到电脑预览' : '切换到手机预览'}
              className="preview-action"
            >
              {isMobilePreview ? <FiMonitor /> : <FiSmartphone />}
            </button>

            <button
              onClick={handleCopyToWeixin}
              title={copied ? '已复制' : '复制到公众号'}
              className="preview-action"
            >
              {copied ? <FiCheck /> : <FiCopy />}
            </button>
          </div>
        </div>
      </div>

      {/* AI对话框 */}
      {showAiChat && (
        <div className="modal">
          <AiChat
            onClose={() => setShowAiChat(false)}
            onOpenSettings={() => {
              setShowAiSettings(true);
              setShowAiChat(false);
            }}
            onApplyToEditor={(content) => {
              setMarkdown(content);
              setShowAiChat(false);
            }}
            editorContent={markdown}
            messageState={messageState}
          />
        </div>
      )}

      {/* AI设置弹框 */}
      {showAiSettings && (
        <div className="modal">
          <AiSettings onClose={() => setShowAiSettings(false)} />
        </div>
      )}

      {/* 主题编辑器 */}
      {showThemeEditor && (
        <ThemeEditor
          initialTheme={isUsingCustomTheme ? customTheme : null}
          onSave={(theme) => {
            setCustomTheme(theme);
            setShowThemeEditor(false);
          }}
          onClose={() => setShowThemeEditor(false)}
        />
      )}
    </>
  );
};

// 包装组件
export default function App() {
  return (
    <ThemeProvider>
      <AiSettingsProvider>
        <Home />
      </AiSettingsProvider>
    </ThemeProvider>
  );
}