import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { FadeInView, PrimaryButton, Screen, palette } from '@/components/wireframe-ui';

export default function IndexScreen() {
  return (
    <Screen backgroundColor={palette.lavender} edges={['top', 'left', 'right', 'bottom']}>
      <View style={styles.glowOne} />
      <View style={styles.glowTwo} />
      <View style={styles.content}>
        <FadeInView delay={40}>
          <Text style={styles.title}>Scripture{`\n`}Lingo</Text>
          <Text style={styles.subtitle}>Learn the scriptures daily</Text>
        </FadeInView>

        <FadeInView delay={140}>
          <PrimaryButton
            label="Get Started"
            color={palette.purple}
            onPress={() => router.push('/onboarding/choose-scriptures')}
          />
        </FadeInView>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: 22,
    paddingVertical: 42,
    justifyContent: 'space-between',
  },
  glowOne: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: '#FFFFFF38',
    top: -40,
    right: -40,
  },
  glowTwo: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#A48EEA66',
    bottom: 80,
    left: -40,
  },
  title: {
    color: '#45505B',
    fontSize: 46,
    fontWeight: '700',
    lineHeight: 54,
    marginTop: 94,
    marginBottom: 10,
    letterSpacing: 0.4,
  },
  subtitle: {
    color: '#61727D',
    fontSize: 19,
    lineHeight: 26,
  },
});
