import { Ionicons } from '@expo/vector-icons';
import { useMemo } from 'react';
import { Pressable, StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import Animated, { FadeInDown, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

export const palette = {
  lavender: '#C8BFF7',
  lavenderDark: '#7569A8',
  sky: '#BEE9FF',
  mint: '#D7F2DF',
  sand: '#F6E8D4',
  olive: '#E4EAC8',
  orange: '#E59A52',
  blue: '#2F78BE',
  navy: '#1C5E99',
  purple: '#8E37D7',
  teal: '#29A3B2',
  border: '#0000001A',
  text: '#4C5A63',
  muted: '#7A8A94',
  white: '#FFFFFF',
  shadow: '#112233',
};

export function Screen({
  children,
  backgroundColor,
  edges = ['top', 'right', 'left'],
}: {
  children: React.ReactNode;
  backgroundColor: string;
  edges?: ('top' | 'right' | 'bottom' | 'left')[];
}) {
  return (
    <SafeAreaView style={[styles.screen, { backgroundColor }]} edges={edges}>
      {children}
    </SafeAreaView>
  );
}

export function TopBar({
  title,
  onBack,
  right,
}: {
  title: string;
  onBack?: () => void;
  right?: React.ReactNode;
}) {
  return (
    <View style={styles.topBar}>
      {onBack ? (
        <Pressable onPress={onBack} hitSlop={10} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color={palette.navy} />
        </Pressable>
      ) : (
        <View style={styles.backPlaceholder} />
      )}
      <Text style={styles.topBarTitle}>{title}</Text>
      <View style={styles.backPlaceholder}>{right}</View>
    </View>
  );
}

export function PrimaryButton({
  label,
  onPress,
  color = palette.blue,
  style,
  disabled,
}: {
  label: string;
  onPress?: () => void;
  color?: string;
  style?: ViewStyle;
  disabled?: boolean;
}) {
  const pressScale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pressScale.value }],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        disabled={disabled}
        onPress={onPress}
        onPressIn={() => {
          pressScale.value = withSpring(0.98, { damping: 16, stiffness: 320 });
        }}
        onPressOut={() => {
          pressScale.value = withSpring(1, { damping: 16, stiffness: 320 });
        }}
        style={[styles.button, { backgroundColor: color, opacity: disabled ? 0.55 : 1 }, style]}>
        <Text style={styles.buttonText}>{label}</Text>
      </Pressable>
    </Animated.View>
  );
}

export function SectionCard({ children, style }: { children: React.ReactNode; style?: ViewStyle }) {
  return <View style={[styles.sectionCard, style]}>{children}</View>;
}

export function FadeInView({
  children,
  delay = 0,
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  style?: StyleProp<ViewStyle>;
}) {
  const entering = useMemo(() => FadeInDown.duration(420).delay(delay), [delay]);
  return (
    <Animated.View entering={entering} style={style}>
      {children}
    </Animated.View>
  );
}

export function ConfettiBackground({ children }: { children: React.ReactNode }) {
  return <View style={styles.confettiBackground}>{children}</View>;
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  topBar: {
    minHeight: 60,
    borderBottomWidth: 1,
    borderBottomColor: palette.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF36',
  },
  backButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF88',
  },
  backPlaceholder: {
    width: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topBarTitle: {
    color: '#5A6B75',
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 26,
    letterSpacing: 0.2,
  },
  button: {
    height: 50,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: palette.shadow,
    shadowOpacity: 0.18,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 10,
    elevation: 3,
  },
  buttonText: {
    color: palette.white,
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  sectionCard: {
    borderColor: '#FFFFFF90',
    borderWidth: 1,
    borderRadius: 14,
    backgroundColor: '#FFFFFFA0',
    padding: 16,
    shadowColor: palette.shadow,
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 2,
  },
  confettiBackground: {
    flex: 1,
    backgroundColor: '#F5E3C8',
  },
});
