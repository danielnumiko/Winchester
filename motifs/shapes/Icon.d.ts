import * as React from 'react';
export type IconName =
  | "MotifArchway"
  | "MotifChapel"
  | "MotifCurvedFrame"
  | "MotifFlower"
  | "MotifGreenery"
  | "MotifLectureTheatre"
  | "MotifStar"
  | "MotifStripes"
  | "MotifWestDowns";
export interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName;
  size?: number | string;
}
export declare const Icon: React.FC<IconProps>;
export default Icon;
