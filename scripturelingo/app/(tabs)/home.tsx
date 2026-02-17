import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StyleSheet, Text, View, Pressable } from 'react-native';

import { FadeInView, PrimaryButton, Screen, SectionCard, TopBar, palette } from '@/components/wireframe-ui';

export default function HomeScreen() {
  return (
    <Screen backgroundColor={palette.olive}>
      <TopBar
        title="Home"
        right={
          <View style={styles.rightIcons}>
            <Ionicons name="notifications" size={18} color={palette.blue} />
            <Pressable onPress={() => router.push('/settings')} hitSlop={10}>
              <Ionicons name="settings" size={20} color={palette.blue} />
            </Pressable>
          </View>
        }
      />

      <View style={styles.content}>
        <FadeInView delay={40}>
          <View style={styles.streakPill}>
            <Text style={styles.streak}>🔥 6 day streak</Text>
          </View>
        </FadeInView>

        <FadeInView delay={120}>
          <SectionCard>
            <Text style={styles.goalTitle}>Today&apos;s Goal</Text>
            <Text style={styles.goalCopy}>Build faith through one focused lesson.</Text>
            <PrimaryButton
              label="Start Lesson"
              color={palette.orange}
              onPress={() => router.push('/(tabs)/learn')}
            />
          </SectionCard>
        </FadeInView>

        <FadeInView delay={200}>
          <View style={styles.progressWrap}>
            <View style={styles.progressTrack}>
              <View style={styles.progressFill} />
            </View>
            <Text style={styles.meta}>XP 120 / 200</Text>
          </View>
        </FadeInView>

        <FadeInView delay={260}>
          <SectionCard>
            <Text style={styles.nextLabel}>Next Up</Text>
            <Text style={styles.next}>Alma 32: Faith</Text>
          </SectionCard>
        </FadeInView>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    gap: 14,
  },
  rightIcons: {
    width: 56,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  streakPill: {
    alignSelf: 'flex-start',
    backgroundColor: '#F2F7D9',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#FFFFFFA0',
  },
  streak: {
    color: '#708429',
    fontSize: 15,
    fontWeight: '700',
  },
  goalTitle: {
    color: '#43535E',
    fontSize: 24,
    marginBottom: 6,
    fontWeight: '700',
  },
  goalCopy: {
    color: '#6D7D86',
    fontSize: 15,
    marginBottom: 14,
  },
  progressWrap: {
    gap: 8,
  },
  progressTrack: {
    height: 10,
    borderRadius: 99,
    overflow: 'hidden',
    backgroundColor: '#D6DEBB',
  },
  progressFill: {
    width: '60%',
    height: '100%',
    backgroundColor: '#3FAFC4',
  },
  meta: {
    color: '#687B63',
    fontSize: 14,
    fontWeight: '600',
  },
  nextLabel: {
    color: '#72857A',
    fontSize: 14,
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.7,
  },
  next: {
    color: '#4A5A65',
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '700',
  },
});
