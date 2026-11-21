import React, { useState } from 'react';
import { View, StyleSheet, LayoutChangeEvent } from 'react-native';
import Svg, { Path } from 'react-native-svg';

interface CurvedBottomBorderProps {
  isFocused: boolean;
  activeColor?: string;
  inactiveColor?: string;
  radius?: number;
  strokeWidth?: number;
}

export const CurvedBottomBorder = ({
  isFocused,
  activeColor = '#047857',
  inactiveColor = '#cbd5e1',
  radius = 16,
  strokeWidth = 2,
}: CurvedBottomBorderProps) => {
  const [layout, setLayout] = useState({ width: 0, height: 0 });

  const onLayout = (e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    if (width !== layout.width || height !== layout.height) {
      setLayout({ width, height });
    }
  };

  const w = layout.width;
  const h = layout.height;
  const r = radius;
  const color = isFocused ? activeColor : inactiveColor;
  const sw = isFocused ? strokeWidth + 0.5 : strokeWidth;

  const d =
    w > 0 && h > 0
      ? `M 1 ${Math.max(0, h - r)} A ${r} ${r} 0 0 0 ${1 + r} ${h - 1} L ${Math.max(1 + r, w - 1 - r)} ${h - 1} A ${r} ${r} 0 0 0 ${w - 1} ${Math.max(0, h - r)}`
      : '';

  return (
    <View
      onLayout={onLayout}
      style={StyleSheet.absoluteFill}
      pointerEvents="none"
    >
      {w > 0 && h > 0 && (
        <Svg width={w} height={h}>
          <Path
            d={d}
            fill="none"
            stroke={color}
            strokeWidth={sw}
            strokeLinecap="round"
          />
        </Svg>
      )}
    </View>
  );
};
