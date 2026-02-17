import { router } from 'expo-router';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

import { FadeInView, PrimaryButton, Screen, SectionCard, TopBar, palette } from '@/components/wireframe-ui';

// Mock leaderboard data - replace with actual data from your backend
const leaderboardData = [
  { id: 1, name: 'Sarah Johnson', points: 2450, rank: 1 },
  { id: 2, name: 'David Kim', points: 2180, rank: 2 },
  { id: 3, name: 'Maria Garcia', points: 1920, rank: 3 },
];

export default function ChallengesScreen() {
  return (
    <Screen backgroundColor={palette.sand} edges={['top', 'left', 'right', 'bottom']}>
      <TopBar title="Challenges" />

      <ScrollView style={styles.scrollView}>
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

          <FadeInView delay={230}>
            <SectionCard>
              <Text style={styles.kicker}>Top Performers</Text>
              <Text style={styles.title}>Leaderboard</Text>
              <Text style={styles.copy}>Top 3 users with the most points this month.</Text>
              
              <View style={styles.leaderboard}>
                {leaderboardData.map((user, index) => (
                  <View key={user.id} style={styles.leaderboardItem}>
                    <View style={[
                      styles.rankBadge,
                      index === 0 && styles.rankBadgeGold,
                      index === 1 && styles.rankBadgeSilver,
                      index === 2 && styles.rankBadgeBronze,
                    ]}>
                      <Text style={styles.rankText}>{user.rank}</Text>
                    </View>
                    <View style={styles.userInfo}>
                      <Text style={styles.userName}>{user.name}</Text>
                      <Text style={styles.userPoints}>{user.points.toLocaleString()} points</Text>
                    </View>
                    {index === 0 && <Text style={styles.trophy}>🏆</Text>}
                    {index === 1 && <Text style={styles.trophy}>🥈</Text>}
                    {index === 2 && <Text style={styles.trophy}>🥉</Text>}
                  </View>
                ))}
              </View>
            </SectionCard>
          </FadeInView>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
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
  leaderboard: {
    marginTop: 8,
    gap: 12,
  },
  leaderboardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9F7F4',
    padding: 14,
    borderRadius: 12,
    gap: 12,
  },
  rankBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E5DFD6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rankBadgeGold: {
    backgroundColor: '#FFD700',
  },
  rankBadgeSilver: {
    backgroundColor: '#C0C0C0',
  },
  rankBadgeBronze: {
    backgroundColor: '#CD7F32',
  },
  rankText: {
    color: '#4D5961',
    fontSize: 18,
    fontWeight: '700',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    color: '#4D5961',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  userPoints: {
    color: palette.muted,
    fontSize: 14,
  },
  trophy: {
    fontSize: 24,
  },
});
