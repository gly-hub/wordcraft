import { Theme } from './default';

export const coolTheme: Theme = {
  base: {
    fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '15px',
    lineHeight: '1.75',
    color: '#2d3436',
    letterSpacing: '0.02em',
    textAlign: 'left',
  },
  headings: {
    color: '#6c5ce7',
    fontWeight: '700',
    letterSpacing: '0.02em',
    h1: {
      fontSize: '32px',
      margin: '2em 0 1em',
      textAlign: 'center',
      borderBottom: 'none',
      paddingBottom: '0.5em',
      position: 'relative',
      background: 'linear-gradient(120deg, #6c5ce7 0%, #a55eea 100%)',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    h2: {
      fontSize: '24px',
      margin: '1.8em 0 1em',
      borderLeft: 'none',
      paddingLeft: '16px',
      color: '#4834d4',
      background: 'rgba(72, 52, 212, 0.1)',
      borderRadius: '8px',
      padding: '8px 16px',
      boxShadow: '0 4px 12px rgba(72, 52, 212, 0.15)',
    },
    h3: {
      fontSize: '20px',
      margin: '1.5em 0 0.8em',
      color: '#4834d4',
      background: 'rgba(72, 52, 212, 0.08)',
      padding: '8px 16px',
      borderRadius: '6px',
      borderLeft: '4px solid #4834d4',
    },
    h4: {
      fontSize: '18px',
      margin: '1.2em 0 0.6em',
      color: '#4834d4',
      padding: '4px 0',
      borderBottom: '2px dashed rgba(72, 52, 212, 0.4)',
    },
    h5: {
      fontSize: '16px',
      margin: '1em 0 0.6em',
      color: '#4834d4',
      padding: '4px 12px',
      background: 'rgba(72, 52, 212, 0.06)',
      borderRadius: '20px',
      display: 'inline-block',
    },
    h6: {
      fontSize: '15px',
      margin: '1em 0 0.6em',
      color: '#4834d4',
      paddingLeft: '12px',
      borderLeft: '2px solid rgba(72, 52, 212, 0.6)',
    },
  },
  paragraph: {
    margin: '1.2em 0',
    lineHeight: '1.8',
  },
  image: {
    maxWidth: '100%',
    margin: '1.5em auto',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
  code: {
    fontFamily: '"Fira Code", "SF Mono", Consolas, Monaco, monospace',
    fontSize: '14px',
    lineHeight: '1.6',
    block: {
      background: '#2d3436',
      padding: '20px',
      margin: '1.5em 0',
      borderRadius: '12px',
      color: '#dfe6e9',
    },
    inline: {
      background: 'rgba(108, 92, 231, 0.1)',
      padding: '2px 6px',
      borderRadius: '4px',
      color: '#6c5ce7',
      fontFamily: '"Fira Code", "SF Mono", Consolas, Monaco, monospace',
    },
  },
  table: {
    width: '100%',
    margin: '1.5em 0',
    fontSize: '14px',
    borderCollapse: 'separate',
    borderSpacing: '0',
    border: '1px solid #dfe6e9',
    cell: {
      padding: '12px 16px',
      border: '1px solid #dfe6e9',
    },
    header: {
      background: 'linear-gradient(45deg, #6c5ce7, #a55eea)',
      fontWeight: '600',
      border: '1px solid #dfe6e9',
      color: 'white',
    },
  },
  blockquote: {
    margin: '1.5em 0',
    padding: '16px 20px',
    background: 'linear-gradient(135deg, rgba(108, 92, 231, 0.1), rgba(165, 94, 234, 0.1))',
    borderRadius: '12px',
    color: '#6c5ce7',
    borderLeft: '4px solid #6c5ce7',
  },
  list: {
    margin: '1.2em 0',
    padding: '0 0 0 1.5em',
    item: {
      margin: '0.4em 0',
      lineHeight: '1.8',
    },
    unordered: {
      listStyleType: 'none',
      nestedLevel1: {
        listStyleType: 'none',
      },
      nestedLevel2: {
        listStyleType: 'none',
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
    color: '#6c5ce7',
    textDecoration: 'none',
    borderBottom: '2px solid rgba(108, 92, 231, 0.3)',
  },
  hr: {
    margin: '2em 0',
    border: 'none',
    height: '2px',
    background: 'linear-gradient(90deg, #6c5ce7, #a55eea)',
  },
  emphasis: {
    strong: {
      color: '#6c5ce7',
      fontWeight: '600',
    },
    em: {
      color: '#a55eea',
      fontStyle: 'italic',
    },
  },
}; 