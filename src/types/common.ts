// 通用响应类型
export interface ApiResponse<T = any> {
  code: number;
  data: T;
  message: string;
}

// 分页请求参数
export interface PaginationParams {
  page: number;
  pageSize: number;
}

// 分页响应数据
export interface PaginatedData<T> {
  list: T[];
  total: number;
  page: number;
  pageSize: number;
}

// 通用组件Props
export interface BaseProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

// 主题相关类型
export type ThemeMode = 'light' | 'dark';

// 尺寸类型
export type Size = 'small' | 'medium' | 'large';

// 状态类型
export type Status = 'success' | 'error' | 'warning' | 'info';

// ID类型
export type ID = string | number; 