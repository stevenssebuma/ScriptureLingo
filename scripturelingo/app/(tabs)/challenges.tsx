import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { FadeInView, PrimaryButton, Screen, SectionCard, TopBar, palette } from '@/components/wireframe-ui';

export default function ChallengesScreen() {
  return (
    <Screen backgroundColor={palette.sand} edges={['top', 'left', 'right', 'bottom']}>
      <TopBar title="Challenges" />

      <View style={styles.content}>
        <FadeInView delay={50}>
          <SectionCard>
            <Text style={styles.kicker}>This Week</Text>
            <Text style={styles.title}>Daily Streak Challenge</Text>
            <Text style={styles.copy}>Complete one lesson for 7 straight days.</Text>
            <PrimaryButton label="Start" style={styles.button} />
          </SectionCard>
        </FadeInView>

        <FadeInView delay={140}>
          <SectionCard>
            <Text style={styles.kicker}>Bonus</Text>
            <Text style={styles.title}>Citation Sprint</Text>
            <Text style={styles.copy}>Answer 5 citation questions in a row.</Text>
            <PrimaryButton label="Open Quiz" style={styles.button} onPress={() => router.push('/quiz/citation')} />
          </SectionCard>
        </FadeInView>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 14,
    gap: 12,
  },
  kicker: {
    color: '#907F61',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 6,
  },
  title: {
    color: '#4D5961',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 6,
  },
  copy: {
    color: palette.muted,
    fontSize: 15,
    marginBottom: 14,
    lineHeight: 21,
  },
  button: {
    height: 44,
  },
});
