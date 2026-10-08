import * as React from 'react';
export type IconName =
  | "IconArrowRight"
  | "IconCalendar"
  | "IconChevronSmallDown"
  | "IconChevronSmallRight"
  | "IconCross"
  | "IconMapPin"
  | "IconSearch"
  | "TypeQuote";
export interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName;
  size?: number | string;
}
export declare const Icon: React.FC<IconProps>;
export default Icon;
