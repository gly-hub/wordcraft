import { Theme } from '../themes/default';

export function generateInlineStyles(theme: Theme) {
  return {
    div: {
      fontFamily: theme.base.fontFamily,
      fontSize: theme.base.fontSize,
      lineHeight: theme.base.lineHeight,
      color: theme.base.color,
      letterSpacing: theme.base.letterSpacing,
      textAlign: theme.base.textAlign,
    },
    h1: {
      fontWeight: theme.headings.fontWeight,
      color: theme.headings.h1.color || theme.headings.color,
      fontSize: theme.headings.h1.fontSize,
      margin: theme.headings.h1.margin,
      textAlign: theme.headings.h1.textAlign,
      lineHeight: '1.5',
      letterSpacing: theme.headings.letterSpacing,
      ...(theme.headings.h1.borderBottom && { borderBottom: theme.headings.h1.borderBottom }),
      ...(theme.headings.h1.paddingBottom && { paddingBottom: theme.headings.h1.paddingBottom }),
      ...(theme.headings.h1.position && { position: theme.headings.h1.position }),
      ...(theme.headings.h1.background && { background: theme.headings.h1.background }),
      ...(theme.headings.h1.padding && { padding: theme.headings.h1.padding }),
      ...(theme.headings.h1.borderRadius && { borderRadius: theme.headings.h1.borderRadius }),
      ...(theme.headings.h1.borderLeft && { borderLeft: theme.headings.h1.borderLeft }),
      ...(theme.headings.h1.boxShadow && { boxShadow: theme.headings.h1.boxShadow }),
      ...(theme.headings.h1.backgroundClip && { backgroundClip: theme.headings.h1.backgroundClip }),
      ...(theme.headings.h1.WebkitBackgroundClip && { WebkitBackgroundClip: theme.headings.h1.WebkitBackgroundClip }),
      ...(theme.headings.h1.WebkitTextFillColor && { WebkitTextFillColor: theme.headings.h1.WebkitTextFillColor }),
    },
    h2: {
      fontWeight: theme.headings.fontWeight,
      color: theme.headings.h2.color || theme.headings.color,
      fontSize: theme.headings.h2.fontSize,
      margin: theme.headings.h2.margin,
      lineHeight: '1.5',
      letterSpacing: theme.headings.letterSpacing,
      borderLeft: theme.headings.h2.borderLeft,
      paddingLeft: theme.headings.h2.paddingLeft,
      background: theme.headings.h2.background,
      padding: theme.headings.h2.padding,
      borderRadius: theme.headings.h2.borderRadius,
      boxShadow: theme.headings.h2.boxShadow,
      borderBottom: theme.headings.h2.borderBottom,
      backgroundClip: theme.headings.h2.backgroundClip,
      WebkitBackgroundClip: theme.headings.h2.WebkitBackgroundClip,
      WebkitTextFillColor: theme.headings.h2.WebkitTextFillColor,
    },
    h3: {
      fontWeight: theme.headings.fontWeight,
      color: theme.headings.h3.color || theme.headings.color,
      fontSize: theme.headings.h3.fontSize,
      margin: theme.headings.h3.margin,
      lineHeight: '1.5',
      letterSpacing: theme.headings.letterSpacing,
      background: theme.headings.h3.background,
      padding: theme.headings.h3.padding,
      borderRadius: theme.headings.h3.borderRadius,
      borderLeft: theme.headings.h3.borderLeft,
      boxShadow: theme.headings.h3.boxShadow,
      borderBottom: theme.headings.h3.borderBottom,
    },
    h4: {
      fontWeight: theme.headings.fontWeight,
      color: theme.headings.h4.color || theme.headings.color,
      fontSize: theme.headings.h4.fontSize,
      margin: theme.headings.h4.margin,
      lineHeight: '1.5',
      letterSpacing: theme.headings.letterSpacing,
      background: theme.headings.h4.background,
      padding: theme.headings.h4.padding,
      borderRadius: theme.headings.h4.borderRadius,
      borderLeft: theme.headings.h4.borderLeft,
      boxShadow: theme.headings.h4.boxShadow,
      borderBottom: theme.headings.h4.borderBottom,
    },
    h5: {
      fontWeight: theme.headings.fontWeight,
      color: theme.headings.h5.color || theme.headings.color,
      fontSize: theme.headings.h5.fontSize,
      margin: theme.headings.h5.margin,
      lineHeight: '1.5',
      letterSpacing: theme.headings.letterSpacing,
      background: theme.headings.h5.background,
      padding: theme.headings.h5.padding,
      borderRadius: theme.headings.h5.borderRadius,
      borderLeft: theme.headings.h5.borderLeft,
      boxShadow: theme.headings.h5.boxShadow,
      borderBottom: theme.headings.h5.borderBottom,
    },
    h6: {
      fontWeight: theme.headings.fontWeight,
      color: theme.headings.h6.color || theme.headings.color,
      fontSize: theme.headings.h6.fontSize,
      margin: theme.headings.h6.margin,
      lineHeight: '1.5',
      letterSpacing: theme.headings.letterSpacing,
      background: theme.headings.h6.background,
      padding: theme.headings.h6.padding,
      borderRadius: theme.headings.h6.borderRadius,
      borderLeft: theme.headings.h6.borderLeft,
      boxShadow: theme.headings.h6.boxShadow,
      borderBottom: theme.headings.h6.borderBottom,
    },
    p: {
      margin: theme.paragraph.margin,
      lineHeight: theme.paragraph.lineHeight,
    },
    img: {
      maxWidth: theme.image.maxWidth,
      height: 'auto',
      margin: theme.image.margin,
      display: 'block',
      borderRadius: theme.image.borderRadius,
    },
    pre: {
      fontFamily: theme.code.fontFamily,
      fontSize: theme.code.fontSize,
      lineHeight: theme.code.lineHeight,
      background: theme.code.block.background,
      padding: theme.code.block.padding,
      margin: theme.code.block.margin,
      borderRadius: theme.code.block.borderRadius,
      color: theme.code.block.color,
      overflow: 'auto',
    },
    codeInline: {
      fontFamily: theme.code.fontFamily,
      background: theme.code.inline.background,
      padding: theme.code.inline.padding,
      borderRadius: theme.code.inline.borderRadius,
      fontSize: '0.9em',
      color: theme.code.inline.color,
    },
    codeBlock: {
      fontFamily: theme.code.fontFamily,
    },
    table: {
      borderCollapse: 'collapse' as const,
      width: theme.table.width,
      margin: theme.table.margin,
      fontSize: theme.table.fontSize,
      borderSpacing: theme.table.borderSpacing,
      border: theme.table.border,
    },
    th: {
      border: theme.table.header.border,
      padding: theme.table.cell.padding,
      background: theme.table.header.background,
      fontWeight: theme.table.header.fontWeight,
    },
    td: {
      border: theme.table.cell.border,
      padding: theme.table.cell.padding,
    },
    blockquote: {
      margin: theme.blockquote.margin,
      padding: theme.blockquote.padding,
      background: theme.blockquote.background,
      borderRadius: theme.blockquote.borderRadius,
      color: theme.blockquote.color,
      borderLeft: theme.blockquote.borderLeft,
    },
    ul: {
      margin: theme.list.margin,
      padding: theme.list.padding,
      listStyleType: theme.list.unordered.listStyleType,
    },
    ol: {
      margin: theme.list.margin,
      padding: theme.list.padding,
      listStyleType: theme.list.ordered.listStyleType,
    },
    ulNested1: {
      margin: theme.list.margin,
      padding: theme.list.padding,
      listStyleType: theme.list.unordered.nestedLevel1.listStyleType,
    },
    ulNested2: {
      margin: theme.list.margin,
      padding: theme.list.padding,
      listStyleType: theme.list.unordered.nestedLevel2.listStyleType,
    },
    olNested1: {
      margin: theme.list.margin,
      padding: theme.list.padding,
      listStyleType: theme.list.ordered.nestedLevel1.listStyleType,
    },
    olNested2: {
      margin: theme.list.margin,
      padding: theme.list.padding,
      listStyleType: theme.list.ordered.nestedLevel2.listStyleType,
    },
    li: {
      margin: theme.list.item.margin,
      lineHeight: theme.list.item.lineHeight,
    },
    a: {
      color: theme.link.color,
      textDecoration: theme.link.textDecoration,
      borderBottom: theme.link.borderBottom,
    },
    hr: {
      margin: theme.hr.margin,
      border: 'none',
      borderTop: theme.hr.border,
    },
    strong: {
      color: theme.emphasis.strong.color,
      fontWeight: theme.emphasis.strong.fontWeight,
    },
    em: {
      color: theme.emphasis.em.color,
      fontStyle: theme.emphasis.em.fontStyle,
    },
    code: {
      fontFamily: theme.code.fontFamily,
      fontSize: theme.code.fontSize,
      lineHeight: theme.code.lineHeight,
      background: theme.code.inline.background,
      padding: theme.code.inline.padding,
      borderRadius: theme.code.inline.borderRadius,
      color: theme.code.inline.color,
    },
  };
}

export function applyThemeStyles(content: string, theme: Theme) {
  const styles = generateInlineStyles(theme);
  
  const styleToString = (style: Record<string, string | number | undefined>) => {
    return Object.entries(style)
      .filter(([, value]) => value !== undefined)
      .map(([key, value]) => `${key.replace(/[A-Z]/g, m => `-${m.toLowerCase()}`)}:${value}`)
      .join(';');
  };
  
  return content
    .replace(/<div[^>]*>/g, `<div style="${styleToString(styles.div)}">`)
    .replace(/<h1[^>]*>(.*?)<\/h1>/g, `<h1 style="${styleToString(styles.h1)}">$1</h1>`)
    .replace(/<h2[^>]*>(.*?)<\/h2>/g, `<h2 style="${styleToString(styles.h2)}">$1</h2>`)
    .replace(/<h3[^>]*>(.*?)<\/h3>/g, `<h3 style="${styleToString(styles.h3)}">$1</h3>`)
    .replace(/<h4[^>]*>(.*?)<\/h4>/g, `<h4 style="${styleToString(styles.h4)}">$1</h4>`)
    .replace(/<h5[^>]*>(.*?)<\/h5>/g, `<h5 style="${styleToString(styles.h5)}">$1</h5>`)
    .replace(/<h6[^>]*>(.*?)<\/h6>/g, `<h6 style="${styleToString(styles.h6)}">$1</h6>`)
    .replace(/<p[^>]*>(.*?)<\/p>/g, `<p style="${styleToString(styles.p)}">$1</p>`)
    .replace(/<img([^>]*)>/g, (_, attrs) => {
      // 提取原始链接
      const originSrcMatch = attrs.match(/data-origin-src="([^"]+)"/);
      const originSrc = originSrcMatch ? originSrcMatch[1] : '';
      
      // 提取 alt 文本
      const altMatch = attrs.match(/alt="([^"]*)"/);
      const alt = altMatch ? altMatch[1] : '';

      // 使用原始链接
      const src = originSrc || attrs.match(/src="([^"]+)"/)?.[1] || '';
      
      return `<img src="${src}" alt="${alt}" style="${styleToString(styles.img)}" data-type="jpeg" class="rich_pages wxw-img" />`;
    })
    .replace(/<pre[^>]*>([\s\S]*?)<\/pre>/g, `<pre style="${styleToString(styles.pre)}">$1</pre>`)
    .replace(/<code[^>]*>([\s\S]*?)<\/code>/g, (_, content) => {
      // 检查是否在 pre 标签内（代码块）
      const isInPre = content.includes('class="language-') || content.includes('<pre');
      // 如果是代码块使用 codeBlock 样式，否则使用 codeInline 样式
      const style = isInPre ? styles.codeBlock : styles.codeInline;
      return `<code style="${styleToString(style)}">${content}</code>`;
    })
    .replace(/<table[^>]*>/g, `<table style="${styleToString(styles.table)}">`)
    .replace(/<th[^>]*>(.*?)<\/th>/g, `<th style="${styleToString(styles.th)}">$1</th>`)
    .replace(/<td[^>]*>(.*?)<\/td>/g, `<td style="${styleToString(styles.td)}">$1</td>`)
    .replace(/<blockquote[^>]*>(.*?)<\/blockquote>/g, `<blockquote style="${styleToString(styles.blockquote)}">$1</blockquote>`)
    .replace(/<ul[^>]*>/g, `<ul style="${styleToString(styles.ul)}">`)
    .replace(/<ol[^>]*>/g, `<ol style="${styleToString(styles.ol)}">`)
    .replace(/<li[^>]*>(.*?)<\/li>/g, `<li style="${styleToString(styles.li)}">$1</li>`)
    .replace(/<a([^>]*)>(.*?)<\/a>/g, `<a$1 style="${styleToString(styles.a)}">$2</a>`)
    .replace(/<hr[^>]*>/g, `<hr style="${styleToString(styles.hr)}" />`)
    .replace(/<strong[^>]*>(.*?)<\/strong>/g, `<strong style="${styleToString(styles.strong)}">$1</strong>`)
    .replace(/<em[^>]*>(.*?)<\/em>/g, `<em style="${styleToString(styles.em)}">$1</em>`);
} 