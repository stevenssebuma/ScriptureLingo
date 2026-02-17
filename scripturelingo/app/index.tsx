import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';

import { FadeInView, PrimaryButton, Screen } from '@/components/wireframe-ui';

export default function IndexScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const glow = useSharedValue(0.9);

  useEffect(() => {
    glow.value = withRepeat(withTiming(1.15, { duration: 2600 }), -1, true);
  }, [glow]);

  const glowStyle = useAnimatedStyle(() => ({
    transform: [{ scale: glow.value }],
    opacity: 0.18 + (glow.value - 0.9) * 0.35,
  }));

  return (
    <Screen backgroundColor={stylesTokens.deepBlue} edges={['top', 'left', 'right', 'bottom']}>
      <Animated.View style={[styles.glowOne, glowStyle]} />
      <Animated.View style={[styles.glowTwo, glowStyle]} />
      <View style={styles.content}>
        <FadeInView delay={40} style={styles.card}>
          <Text style={styles.brand}>ScriptureLingo</Text>
          <Text style={styles.brandSub}>Learn scripture daily</Text>

          <Text style={styles.heading}>Welcome Back</Text>
          <Text style={styles.copy}>Sign in to continue your daily scripture journey.</Text>

          <View style={styles.inputWrap}>
            <Ionicons name="mail-outline" size={20} color={stylesTokens.inputIcon} />
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email address"
              placeholderTextColor={stylesTokens.inputPlaceholder}
              autoCapitalize="none"
              autoComplete="email"
              keyboardType="email-address"
              style={styles.input}
            />
          </View>

          <View style={styles.inputWrap}>
            <Ionicons name="lock-closed-outline" size={20} color={stylesTokens.inputIcon} />
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              placeholderTextColor={stylesTokens.inputPlaceholder}
              secureTextEntry
              style={styles.input}
            />
          </View>

          <FadeInView delay={160}>
            <PrimaryButton
              label="Log In"
              color={stylesTokens.buttonBlue}
              onPress={() => router.push('/onboarding/get-started')}
            />
          </FadeInView>

          <FadeInView delay={230} style={styles.orWrap}>
            <View style={styles.orLine} />
            <Text style={styles.orText}>OR</Text>
            <View style={styles.orLine} />
          </FadeInView>

          <FadeInView delay={290}>
            <Text style={styles.signupCopy}>Don&apos;t have an account?</Text>
            <Pressable style={styles.signupButton} onPress={() => router.push('/onboarding/get-started')}>
              <Text style={styles.signupButtonText}>Create Account</Text>
            </Pressable>
          </FadeInView>
        </FadeInView>
      </View>
    </Screen>
  );
}

const stylesTokens = {
  deepBlue: '#0E1A63',
  cardTop: '#F7F9FF',
  cardBottom: '#EEF2FD',
  navyText: '#1A2E5B',
  mutedText: '#455D89',
  inputBorder: '#B8C7E6',
  inputIcon: '#5A6F95',
  inputPlaceholder: '#647CA8',
  buttonBlue: '#2456D3',
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: 18,
    paddingVertical: 28,
    justifyContent: 'center',
  },
  glowOne: {
    position: 'absolute',
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: '#5A78FF',
    top: -70,
    right: -70,
  },
  glowTwo: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: '#3F56D8',
    bottom: -30,
    left: -40,
  },
  card: {
    backgroundColor: stylesTokens.cardTop,
    borderRadius: 28,
    padding: 24,
    borderWidth: 1,
    borderColor: '#FFFFFF66',
    shadowColor: '#050D36',
    shadowOpacity: 0.28,
    shadowOffset: { width: 0, height: 16 },
    shadowRadius: 30,
    elevation: 12,
  },
  brand: {
    color: stylesTokens.navyText,
    fontSize: 44,
    lineHeight: 50,
    fontWeight: '800',
    textAlign: 'center',
    marginTop: 4,
  },
  brandSub: {
    color: stylesTokens.mutedText,
    fontSize: 18,
    lineHeight: 24,
    textAlign: 'center',
    marginTop: 2,
    marginBottom: 30,
  },
  heading: {
    color: stylesTokens.navyText,
    fontSize: 38,
    lineHeight: 44,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 10,
  },
  copy: {
    color: stylesTokens.mutedText,
    fontSize: 16,
    lineHeight: 23,
    textAlign: 'center',
    marginBottom: 18,
  },
  inputWrap: {
    height: 56,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: stylesTokens.inputBorder,
    backgroundColor: stylesTokens.cardBottom,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  input: {
    flex: 1,
    color: stylesTokens.navyText,
    fontSize: 18,
    marginLeft: 10,
  },
  orWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 18,
    marginBottom: 14,
  },
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#C5D1E9',
  },
  orText: {
    color: '#5F7195',
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.6,
  },
  signupCopy: {
    color: stylesTokens.navyText,
    textAlign: 'center',
    fontSize: 17,
    marginBottom: 12,
  },
  signupButton: {
    height: 52,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: stylesTokens.buttonBlue,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3F7FF',
  },
  signupButtonText: {
    color: '#1D48B7',
    fontSize: 19,
    fontWeight: '800',
  },
});
