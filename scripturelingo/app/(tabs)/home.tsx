import { Ionicons } from '@expo/vector-icons';
import { router, useFocusEffect } from 'expo-router';
import { useState, useCallback } from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView, Alert } from 'react-native';

import { FadeInView, PrimaryButton, Screen, SectionCard, TopBar, palette } from '@/components/wireframe-ui';
import { DailyTimer } from '@/components/daily-timer';
import { supabase } from '@/lib/supabase';
import {
  getUserGoal,
  getWeeklyStats,
  logUsageTime,
  canStartSession,
} from '@/lib/dailyGoalService';

export default function HomeScreen() {
  const [dailyGoalMinutes, setDailyGoalMinutes] = useState(10);
  const [weeklyStats, setWeeklyStats] = useState<any>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [timerKey, setTimerKey] = useState(0);
  const [sessionActive, setSessionActive] = useState(false);

  // Load user and their goal settings
  useFocusEffect(
    useCallback(() => {
      loadUserData();
    }, [])
  );

  const loadUserData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);

        // Get user's daily goal
        const goal = await getUserGoal(user.id);
        if (goal) {
          setDailyGoalMinutes(goal.daily_goal_minutes);
        }

        // Get weekly stats
        const stats = await getWeeklyStats(user.id);
        setWeeklyStats(stats);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const handleStartSession = async () => {
    if (!userId) {
      Alert.alert('Error', 'User not authenticated');
      return;
    }

    const sessionCheck = await canStartSession(userId, dailyGoalMinutes);
    if (!sessionCheck.canStart) {
      Alert.alert('Weekly Limit Reached', sessionCheck.reason);
      return;
    }

    setSessionActive(true);
  };

  const handleSessionEnd = async () => {
    if (userId) {
      await logUsageTime(userId, dailyGoalMinutes);
      setSessionActive(false);
      setTimerKey((prev) => prev + 1); // Reset timer
      
      // Reload weekly stats
      const stats = await getWeeklyStats(userId);
      setWeeklyStats(stats);

      Alert.alert('Great Job!', `You've completed ${dailyGoalMinutes} minutes. Keep it up!`);
    }
  };

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

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <FadeInView delay={40}>
          <View style={styles.streakPill}>
            <Text style={styles.streak}>🔥 6 day streak</Text>
          </View>
        </FadeInView>

        {/* Daily Timer */}
        <FadeInView delay={80}>
          <DailyTimer
            key={timerKey}
            goalMinutes={dailyGoalMinutes}
            isActive={sessionActive}
            onSessionEnd={handleSessionEnd}
          />
        </FadeInView>

        {/* Weekly Stats */}
        {weeklyStats && (
          <FadeInView delay={160}>
            <View style={styles.statsCard}>
              <Text style={styles.statsTitle}>Weekly Progress</Text>
              <View style={styles.statsContent}>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>This Week</Text>
                  <Text style={styles.statValue}>{weeklyStats.weeklyTotal} min</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>Target Range</Text>
                  <Text style={styles.statValue}>
                    {weeklyStats.minMet ? '✓' : '○'} {weeklyStats.minWeekly}-{weeklyStats.maxWeekly}
                  </Text>
                </View>
              </View>

              {!weeklyStats.minMet && (
                <View style={styles.warningBox}>
                  <Ionicons name="alert-circle" size={16} color="#FF6B6B" />
                  <Text style={styles.warningText}>
                    You need {weeklyStats.remainingToMin} more minutes to reach your weekly minimum
                  </Text>
                </View>
              )}

              {weeklyStats.maxReached && (
                <View style={styles.maxBox}>
                  <Ionicons name="checkmark-circle" size={16} color="#27AE60" />
                  <Text style={styles.maxText}>
                    You've reached your weekly maximum! Well done!
                  </Text>
                </View>
              )}
            </View>
          </FadeInView>
        )}

        <FadeInView delay={240}>
          <SectionCard>
            <Text style={styles.goalTitle}>Continue Learning</Text>
            <Text style={styles.goalCopy}>Build faith through focused lessons.</Text>
            <PrimaryButton
              label="Start Lesson"
              color={palette.orange}
              onPress={() => router.push('/(tabs)/learn')}
            />
          </SectionCard>
        </FadeInView>

        <FadeInView delay={240}>
          <SectionCard>
            <Text style={styles.goalTitle}>Continue Learning</Text>
            <Text style={styles.goalCopy}>Build faith through focused lessons.</Text>
            <PrimaryButton
              label="Start Lesson"
              color={palette.orange}
              onPress={() => router.push('/(tabs)/learn')}
            />
          </SectionCard>
        </FadeInView>

        <FadeInView delay={320}>
          <View style={styles.progressWrap}>
            <View style={styles.progressTrack}>
              <View style={styles.progressFill} />
            </View>
            <Text style={styles.meta}>XP 120 / 200</Text>
          </View>
        </FadeInView>

        <FadeInView delay={380}>
          <SectionCard>
            <Text style={styles.nextLabel}>Next Up</Text>
            <Text style={styles.next}>Alma 32: Faith</Text>
          </SectionCard>
        </FadeInView>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 20,
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
  statsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    gap: 12,
  },
  statsTitle: {
    color: '#72857A',
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  statsContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#9CA6A3',
    fontWeight: '500',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#3FAFC4',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#E0E8E3',
  },
  warningBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF3E0',
    borderRadius: 8,
    padding: 12,
    gap: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#FF6B6B',
  },
  warningText: {
    flex: 1,
    fontSize: 12,
    color: '#D84848',
    fontWeight: '500',
  },
  maxBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F8F5',
    borderRadius: 8,
    padding: 12,
    gap: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#27AE60',
  },
  maxText: {
    flex: 1,
    fontSize: 12,
    color: '#27AE60',
    fontWeight: '500',
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
