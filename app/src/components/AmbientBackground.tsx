import React from 'react';
import Svg, { Defs, RadialGradient, Stop, Rect } from 'react-native-svg';

export const AmbientBackground = () => (
  <Svg
    style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
    width="100%"
    height="100%"
    pointerEvents="none"
  >
    <Defs>
      <RadialGradient id="topRightGlow" cx="1" cy="0" rx="0.75" ry="0.6" fx="1" fy="0">
        <Stop offset="0" stopColor="#10b981" stopOpacity="0.32" />
        <Stop offset="0.25" stopColor="#34d399" stopOpacity="0.16" />
        <Stop offset="0.6" stopColor="#a7f3d0" stopOpacity="0.05" />
        <Stop offset="1" stopColor="#ffffff" stopOpacity="0" />
      </RadialGradient>

      <RadialGradient id="bottomLeftGlow" cx="0" cy="1" rx="0.75" ry="0.6" fx="0" fy="1">
        <Stop offset="0" stopColor="#047857" stopOpacity="0.28" />
        <Stop offset="0.25" stopColor="#10b981" stopOpacity="0.14" />
        <Stop offset="0.6" stopColor="#6ee7b7" stopOpacity="0.04" />
        <Stop offset="1" stopColor="#ffffff" stopOpacity="0" />
      </RadialGradient>
    </Defs>

    <Rect x="0" y="0" width="100%" height="100%" fill="url(#topRightGlow)" />
    <Rect x="0" y="0" width="100%" height="100%" fill="url(#bottomLeftGlow)" />
  </Svg>
);
