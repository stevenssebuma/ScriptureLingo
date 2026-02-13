import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { ConfettiBackground, FadeInView, PrimaryButton, Screen, TopBar, palette } from '@/components/wireframe-ui';

export default function LessonCompleteScreen() {
  return (
    <Screen backgroundColor={palette.sand} edges={['top', 'left', 'right', 'bottom']}>
      <ConfettiBackground>
        <TopBar title="" onBack={() => router.back()} />

        <View style={styles.content}>
          <FadeInView delay={40}>
            <Text style={styles.title}>Lesson Complete</Text>
          </FadeInView>
          <FadeInView delay={120}>
            <Text style={styles.xp}>+20 XP</Text>
          </FadeInView>
          <FadeInView delay={200}>
            <Text style={styles.streak}>Streak maintained</Text>
          </FadeInView>

          <FadeInView delay={260}>
            <PrimaryButton label="Continue" onPress={() => router.replace('/(tabs)/home')} />
          </FadeInView>
        </View>
      </ConfettiBackground>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    gap: 14,
  },
  title: {
    color: '#495864',
    fontSize: 34,
    textAlign: 'center',
    fontWeight: '700',
  },
  xp: {
    color: palette.blue,
    fontSize: 44,
    fontWeight: '800',
    textAlign: 'center',
  },
  streak: {
    color: '#748390',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
});
