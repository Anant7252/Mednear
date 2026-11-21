import React from 'react';
import Svg, {
  Rect,
  Path,
  Circle,
  G,
} from 'react-native-svg';

interface MedNearIconSvgProps {
  size?: number;
  withCard?: boolean;
}

export const MedNearIconSvg = ({ size = 64, withCard = true }: MedNearIconSvgProps) => {
  const cardRadius = 24;

  if (!withCard) {
    return (
      <Svg width={size} height={size} viewBox="0 0 100 100">
        <Circle cx="50" cy="46" r="34" fill="#ecfdf5" />
        <Path
          d="M50 16 C34 16 22 28 22 44 C22 62 46.5 81.5 48.8 83.2 C49.5 83.8 50.5 83.8 51.2 83.2 C53.5 81.5 78 62 78 44 C78 28 66 16 50 16 Z"
          fill="#047857"
        />
        <Circle cx="50" cy="43" r="22" fill="#065f46" opacity="0.4" />
        <Rect
          x="39"
          y="27"
          width="22"
          height="32"
          rx="11"
          fill="none"
          stroke="#ffffff"
          strokeWidth="3"
        />
        <Path
          d="M50 34 V52 M41 43 H59"
          stroke="#ffffff"
          strokeWidth="4.5"
          strokeLinecap="round"
        />
      </Svg>
    );
  }

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Rect
        x="2"
        y="2"
        width="96"
        height="96"
        rx={cardRadius}
        fill="#f0fdf4"
        stroke="#10b981"
        strokeWidth="1.5"
        strokeOpacity="0.3"
      />

      <Circle cx="50" cy="46" r="32" fill="#d1fae5" opacity="0.7" />

      <Path
        d="M50 18 C35 18 24 29.5 24 44 C24 61.5 46.8 79.5 48.9 81.2 C49.6 81.8 50.4 81.8 51.1 81.2 C53.2 79.5 76 61.5 76 44 C76 29.5 65 18 50 18 Z"
        fill="#047857"
      />

      <Circle cx="50" cy="43" r="20" fill="#065f46" opacity="0.35" />

      <Rect
        x="40"
        y="28"
        width="20"
        height="30"
        rx="10"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2.8"
      />

      <Path
        d="M50 34 V52 M41 43 H59"
        stroke="#ffffff"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
    </Svg>
  );
};
