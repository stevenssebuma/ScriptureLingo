import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import { FadeInView, PrimaryButton, Screen, SectionCard, TopBar, palette } from '@/components/wireframe-ui';
import { router } from 'expo-router';

const month = new Date().toLocaleString('default', { month: 'long' });

export default function ProfileScreen() {
  return (
    <Screen backgroundColor={palette.lavender} edges={['top', 'left', 'right', 'bottom']}>
      <TopBar title="Profile" />

      <View style={styles.content}>
        <FadeInView delay={40}>
          <SectionCard style={styles.progressCard}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={30} color="#8A8A8A" />
            </View>
            <View>
              <Text style={styles.heading}>Your Progress</Text>
              <Text style={styles.sub}>12 Day Streak</Text>
            </View>
          </SectionCard>
        </FadeInView>

        <FadeInView delay={120}>
          <View style={styles.xpRow}>
            <Ionicons name="medal" size={20} color={palette.muted} />
            <Text style={styles.xpText}>1,250 XP</Text>
          </View>
        </FadeInView>

        <FadeInView delay={180}>
          <Text style={styles.badgesTitle}>Badges</Text>
          <View style={styles.badgesRow}>
            <SectionCard style={styles.badge}>
              <Ionicons name="shield-half" size={34} color="#909090" />
              <Text style={styles.badgeText}>BOM Beginner</Text>
            </SectionCard>
            <SectionCard style={styles.badge}>
              <Ionicons name="ribbon" size={34} color="#909090" />
              <Text style={styles.badgeText}>Scripture Scholar</Text>
            </SectionCard>
            <SectionCard style={styles.badge}>
              <Ionicons name="trophy" size={34} color="#909090" />
              <Text style={styles.badgeText}>1st Place for {month}</Text>
            </SectionCard>
          </View>
        </FadeInView>

        <FadeInView delay={260}>
          <PrimaryButton label="View Stats" color="#80A9CB" />
        </FadeInView>
        <FadeInView delay={260}>
          <PrimaryButton label="Logout" color="#80A9CB" onPress={() => router.push('/')} />
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
  progressCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#ECECEC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    color: '#495864',
    fontSize: 21,
    fontWeight: '700',
  },
  sub: {
    color: palette.muted,
    fontSize: 15,
    marginTop: 3,
  },
  xpRow: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FFFFFF8C',
    paddingVertical: 12,
    paddingHorizontal: 12,
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    backgroundColor: '#FFFFFF8A',
  },
  xpText: {
    color: '#4F5E69',
    fontSize: 28,
    fontWeight: '700',
  },
  badgesTitle: {
    color: '#6D7A88',
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '600',
  },
  badgesRow: {
    flexDirection: 'row',
    gap: 10,
  },
  badge: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
    minHeight: 108,
    justifyContent: 'center',
  },
  badgeText: {
    color: palette.text,
    fontSize: 12,
    textAlign: 'center',
  },
});
