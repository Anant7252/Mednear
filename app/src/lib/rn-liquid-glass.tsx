import React from 'react';
import {
  Platform,
  requireNativeComponent,
  StyleSheet,
  View,
  processColor,
  type ColorValue,
  type ViewProps,
} from 'react-native';

export interface LiquidGlassViewProps extends ViewProps {
  cornerRadius?: number;
  refraction?: number;
  bevel?: number;
  dispersion?: number;
  blurRadius?: number;
  saturation?: number;
  highlight?: number;
  tintColor?: ColorValue;
  live?: boolean;
}

const getNativeGlass = () => {
  if (Platform.OS !== 'android') return null;
  try {
    const { UIManager } = require('react-native');
    if (
      UIManager &&
      typeof UIManager.hasViewManagerConfig === 'function' &&
      UIManager.hasViewManagerConfig('LiquidGlassView')
    ) {
      return requireNativeComponent<any>('LiquidGlassView');
    }
    return null;
  } catch {
    return null;
  }
};

const NativeGlass = getNativeGlass();

export function LiquidGlassView({
  style,
  children,
  tintColor = 'rgba(255, 255, 255, 0.45)',
  cornerRadius = 24,
  ...rest
}: LiquidGlassViewProps) {
  if (!NativeGlass) {
    return (
      <View
        {...rest}
        style={[
          {
            backgroundColor: tintColor,
            borderRadius: cornerRadius,
            borderWidth: 1.2,
            borderColor: 'rgba(255, 255, 255, 0.95)',
            overflow: 'hidden',
          },
          style,
        ]}
      >
        {children}
      </View>
    );
  }

  return (
    <NativeGlass
      {...rest}
      cornerRadius={cornerRadius}
      tintColor={processColor(tintColor)}
      style={style}
    >
      {children}
    </NativeGlass>
  );
}

export default LiquidGlassView;
