import type { IconCategory } from "@/enums";
import type { Component } from "vue";
import type { IconSize, IconType } from "@/enums";

export type IWidgetComponent = {
  size: IconSize;
  type: IconType;
} & Component;

export interface INavConfig {
  id: string;
  name: string;
  icon: string;
  children: IWidgetItem[];
}

export interface IWidget {
  key: string;
  category: IconCategory;
  title: string;
  desc: string;
  label: string;
  widgets: Record<IWidgetComponent>;
}

export interface IWidgetItem {
  id: string;
  // 卡片名称
  name: string;
  // 卡片大小
  size: IconSize;
  // 卡片类型
  type: IconType;
  // 组件名称
  component?: string;
  // 背景颜色
  backgroundColor?: string;
  // 图片地址
  src?: string;
  // 跳转链接
  url?: string;
  // 视图
  view?: string;
  // 描述
  desc?: string;
  // 文字图标的文字
  iconText?: string;
  // 卡片配置
  config?: any;
  x?: number;
  y?: number;
  w?: number;
  h?: number;
}

export interface ProjectConfig {
  // 是否加载所有卡片
  loadAllWidget: boolean;
}

export interface UserConfig {
  // 登陆令牌
  token: string;
}
