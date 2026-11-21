import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  StyleSheet,
  Animated,
  useWindowDimensions,
} from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Home,
  Search,
  Plus,
  Clock,
  User,
} from 'lucide-react-native';

const TAB_CONFIG: Record<
  string,
  {
    width: number;
    offset: number;
    radii: {
      borderTopLeftRadius: number;
      borderTopRightRadius: number;
      borderBottomLeftRadius: number;
      borderBottomRightRadius: number;
    };
  }
> = {
  Home: {
    width: 82,
    offset: 0,
    radii: {
      borderTopLeftRadius: 22,
      borderTopRightRadius: 22,
      borderBottomLeftRadius: 22,
      borderBottomRightRadius: 22,
    },
  },
  Search: {
    width: 90,
    offset: -4,
    radii: {
      borderTopLeftRadius: 22,
      borderTopRightRadius: 8,
      borderBottomLeftRadius: 22,
      borderBottomRightRadius: 22,
    },
  },
  Reservations: {
    width: 82,
    offset: 4,
    radii: {
      borderTopLeftRadius: 8,
      borderTopRightRadius: 22,
      borderBottomLeftRadius: 22,
      borderBottomRightRadius: 22,
    },
  },
  Profile: {
    width: 92,
    offset: 0,
    radii: {
      borderTopLeftRadius: 22,
      borderTopRightRadius: 22,
      borderBottomLeftRadius: 22,
      borderBottomRightRadius: 22,
    },
  },
};

interface TabItemProps {
  routeName: string;
  label: string;
  IconComponent: React.ComponentType<{ size: number; color: string }>;
  isFocused: boolean;
  onPress: () => void;
}

const TabButton: React.FC<TabItemProps> = ({
  routeName,
  label,
  IconComponent,
  isFocused,
  onPress,
}) => {
  const scaleAnim = useRef(new Animated.Value(isFocused ? 1 : 0.95)).current;
  const bounceAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isFocused) {
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: 1.18,
          duration: 130,
          useNativeDriver: true,
        }),
        Animated.spring(bounceAnim, {
          toValue: 1,
          friction: 4,
          tension: 140,
          useNativeDriver: true,
        }),
      ]).start();
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        tension: 120,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(scaleAnim, {
        toValue: 0.95,
        friction: 6,
        useNativeDriver: true,
      }).start();
    }
  }, [isFocused]);

  return (
    <TouchableOpacity
      key={routeName}
      onPress={onPress}
      activeOpacity={0.75}
      style={styles.tabButton}
    >
      <Animated.View
        style={[
          styles.tabContent,
          { transform: [{ scale: isFocused ? bounceAnim : scaleAnim }] },
        ]}
      >
        <IconComponent
          size={20}
          color={isFocused ? '#047857' : '#94a3b8'}
        />
        {isFocused && (
          <Text style={styles.activeLabel}>
            {label}
          </Text>
        )}
      </Animated.View>
    </TouchableOpacity>
  );
};

export const CustomTabBar: React.FC<BottomTabBarProps> = ({
  state,
  navigation,
}) => {
  const { width } = useWindowDimensions();
  const barWidth = width - 32;
  const currentRouteName = state.routes[state.index].name;

  const activeConfig = TAB_CONFIG[currentRouteName] || TAB_CONFIG.Home;

  const slotWidth = (barWidth - 74) / 4;
  const targetPositions: Record<string, number> = {
    Home: 8 + slotWidth * 0.5,
    Search: 8 + slotWidth * 1.5,
    Reservations: 8 + 58 + slotWidth * 2.5,
    Profile: 8 + 58 + slotWidth * 3.5,
  };

  const dropletX = useRef(new Animated.Value(targetPositions.Home)).current;
  const dropletWidth = useRef(new Animated.Value(activeConfig.width)).current;
  const dropletStretch = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const rawTargetX = targetPositions[currentRouteName] ?? targetPositions.Home;
    const finalTargetX = rawTargetX + activeConfig.offset;

    Animated.parallel([
      Animated.spring(dropletWidth, {
        toValue: activeConfig.width,
        friction: 5,
        tension: 120,
        useNativeDriver: false,
      }),
      Animated.sequence([
        Animated.timing(dropletStretch, {
          toValue: 1.16,
          duration: 90,
          useNativeDriver: false,
        }),
        Animated.spring(dropletStretch, {
          toValue: 1,
          friction: 4,
          tension: 130,
          useNativeDriver: false,
        }),
      ]),
      Animated.spring(dropletX, {
        toValue: finalTargetX,
        friction: 6,
        tension: 110,
        useNativeDriver: false,
      }),
    ]).start();
  }, [currentRouteName, barWidth, slotWidth]);

  const handleTabPress = (routeName: string) => {
    const targetRoute = state.routes.find((r) => r.name === routeName);
    if (!targetRoute) return;

    const isFocused = currentRouteName === routeName;
    const event = navigation.emit({
      type: 'tabPress',
      target: targetRoute.key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(routeName);
    }
  };

  const centerButtonGlowShift =
    currentRouteName === 'Search'
      ? { shadowOffset: { width: -3, height: 7 } }
      : currentRouteName === 'Reservations'
      ? { shadowOffset: { width: 3, height: 7 } }
      : { shadowOffset: { width: 0, height: 8 } };

  return (
    <View style={styles.outerContainer} pointerEvents="box-none">
      <View style={styles.glassDock}>
        <View style={styles.webGlassBackdrop} />

        <LinearGradient
          colors={['rgba(255, 255, 255, 0.88)', 'rgba(255, 255, 255, 0.62)']}
          style={StyleSheet.absoluteFill}
        />

        <Animated.View
          style={[
            styles.animatedWaterDroplet,
            activeConfig.radii,
            {
              left: dropletX,
              width: dropletWidth,
              transform: [
                { translateX: Animated.multiply(dropletWidth, -0.5) },
                { scaleX: dropletStretch },
              ],
            },
          ]}
        >
          <LinearGradient
            colors={['rgba(16, 185, 129, 0.22)', 'rgba(5, 150, 105, 0.10)']}
            style={StyleSheet.absoluteFill}
          />
        </Animated.View>

        <View style={styles.topReflectiveGlow} />

        <View style={styles.tabRow}>
          <TabButton
            routeName="Home"
            label="Home"
            IconComponent={Home}
            isFocused={currentRouteName === 'Home'}
            onPress={() => handleTabPress('Home')}
          />

          <TabButton
            routeName="Search"
            label="Search"
            IconComponent={Search}
            isFocused={currentRouteName === 'Search'}
            onPress={() => handleTabPress('Search')}
          />

          <View style={styles.centerButtonSpacer} />

          <TabButton
            routeName="Reservations"
            label="Hold"
            IconComponent={Clock}
            isFocused={currentRouteName === 'Reservations'}
            onPress={() => handleTabPress('Reservations')}
          />

          <TabButton
            routeName="Profile"
            label="Profile"
            IconComponent={User}
            isFocused={currentRouteName === 'Profile'}
            onPress={() => handleTabPress('Profile')}
          />
        </View>
      </View>

      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => handleTabPress('Search')}
        style={[styles.floatingCenterButtonContainer, centerButtonGlowShift]}
      >
        <LinearGradient
          colors={['#10b981', '#047857']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.floatingCenterButton}
        >
          <View style={styles.centerButtonGloss} />
          <Plus size={24} color="#ffffff" strokeWidth={2.6} />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 24 : 16,
    left: 16,
    right: 16,
    alignItems: 'center',
    zIndex: 99,
  },
  glassDock: {
    width: '100%',
    borderRadius: 32,
    overflow: 'hidden',
    borderWidth: 1.2,
    borderColor: 'rgba(255, 255, 255, 0.95)',
    shadowColor: '#064e3b',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.72)',
    position: 'relative',
  },
  webGlassBackdrop: {
    ...(StyleSheet.absoluteFill as any),
    backgroundColor: 'rgba(255, 255, 255, 0.76)',
    backdropFilter: 'blur(18px)',
  } as any,
  animatedWaterDroplet: {
    position: 'absolute',
    top: 5,
    bottom: 5,
    overflow: 'hidden',
    borderWidth: 1.2,
    borderColor: 'rgba(16, 185, 129, 0.32)',
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.22,
    shadowRadius: 8,
  },
  topReflectiveGlow: {
    position: 'absolute',
    top: 0,
    left: 24,
    right: 24,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
  },
  tabRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingVertical: 8,
    zIndex: 2,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
  tabContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    minHeight: 38,
  },
  activeLabel: {
    marginLeft: 6,
    fontSize: 12,
    fontWeight: '900',
    color: '#064e3b',
    letterSpacing: -0.2,
  },
  centerButtonSpacer: {
    width: 58,
    height: 38,
  },
  floatingCenterButtonContainer: {
    position: 'absolute',
    top: -20,
    padding: 3.5,
    borderRadius: 9999,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderWidth: 1.2,
    borderColor: 'rgba(255, 255, 255, 0.95)',
    shadowColor: '#059669',
    shadowOpacity: 0.38,
    shadowRadius: 12,
    elevation: 14,
    zIndex: 100,
  },
  floatingCenterButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  centerButtonGloss: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 26,
    backgroundColor: 'rgba(255, 255, 255, 0.24)',
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
  },
});
