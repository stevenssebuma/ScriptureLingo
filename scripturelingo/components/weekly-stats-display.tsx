import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Pressable, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getWeeklyStats, getUserGoal, setUserGoal } from '@/lib/dailyGoalService';

interface WeeklyStatsDisplayProps {
  userId: string;
  onGoalChange?: (newGoalMinutes: number) => void;
}

export const WeeklyStatsDisplay: React.FC<WeeklyStatsDisplayProps> = ({
  userId,
  onGoalChange,
}) => {
  const [stats, setStats] = useState<any>(null);
  const [dailyGoal, setDailyGoal] = useState(10);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [userId]);

  const loadData = async () => {
    try {
      const [statsData, goalData] = await Promise.all([
        getWeeklyStats(userId),
        getUserGoal(userId),
      ]);
      setStats(statsData);
      if (goalData) {
        setDailyGoal(goalData.daily_goal_minutes);
      }
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoalUpdate = async (newGoal: number) => {
    try {
      const success = await setUserGoal(userId, newGoal);
      if (success) {
        setDailyGoal(newGoal);
        if (onGoalChange) {
          onGoalChange(newGoal);
        }
        Alert.alert('Success', `Daily goal updated to ${newGoal} minutes`);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to update goal');
    }
  };

  if (loading || !stats) {
    return <View style={styles.container} />;
  }

  const progressPercentage = (stats.weeklyTotal / stats.maxWeekly) * 100;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weekly Goals & Limits</Text>

      {/* Main Stats */}
      <View style={styles.statsBox}>
        <View style={styles.statRow}>
          <View style={styles.statCol}>
            <Text style={styles.statLabel}>This Week</Text>
            <Text style={styles.statValue}>{stats.weeklyTotal} min</Text>
          </View>
          <View style={[styles.statCol, styles.statColRight]}>
            <Text style={styles.statLabel}>Daily Goal</Text>
            <Text style={styles.statValue}>{dailyGoal} min</Text>
          </View>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressSection}>
          <View style={styles.progressTrack}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${Math.min(progressPercentage, 100)}%`,
                  backgroundColor:
                    stats.weeklyTotal < stats.minWeekly
                      ? '#3FAFC4'
                      : stats.weeklyTotal >= stats.maxWeekly
                        ? '#27AE60'
                        : '#3FAFC4',
                },
              ]}
            />
          </View>
          <View style={styles.progressLabels}>
            <Text style={styles.progressLabel}>Min: {stats.minWeekly}m</Text>
            <Text style={styles.progressLabel}>Max: {stats.maxWeekly}m</Text>
          </View>
        </View>

        {/* Status Messages */}
        {!stats.minMet && (
          <View style={styles.alertBox}>
            <Ionicons name="alert-circle" size={16} color="#FF6B6B" />
            <Text style={styles.alertText}>
              You need {stats.remainingToMin} more minutes to reach your weekly minimum
            </Text>
          </View>
        )}

        {stats.minMet && !stats.maxReached && (
          <View style={styles.successBox}>
            <Ionicons name="checkmark-circle" size={16} color="#27AE60" />
            <Text style={styles.successText}>
              Great! You're on track. {stats.remainingToMax} minutes until you reach your max.
            </Text>
          </View>
        )}

        {stats.maxReached && (
          <View style={styles.maxBox}>
            <Ionicons name="checkmark-double" size={16} color="#27AE60" />
            <Text style={styles.maxText}>
              You've met your weekly goal! Rest and recharge tomorrow.
            </Text>
          </View>
        )}
      </View>

      {/* Daily Goal Options */}
      <View style={styles.goalSection}>
        <Text style={styles.sectionTitle}>Update Daily Goal</Text>
        <View style={styles.goalButtons}>
          {[5, 10, 15].map((goal) => (
            <Pressable
              key={goal}
              style={[
                styles.goalButton,
                dailyGoal === goal && styles.goalButtonActive,
              ]}
              onPress={() => handleGoalUpdate(goal)}>
              <Text
                style={[
                  styles.goalButtonText,
                  dailyGoal === goal && styles.goalButtonTextActive,
                ]}>
                {goal}m
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      {/* Limits Info */}
      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>Weekly Limits</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Minimum per week:</Text>
          <Text style={styles.infoValue}>{stats.minWeekly} minutes</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Maximum per week:</Text>
          <Text style={styles.infoValue}>{stats.maxWeekly} minutes</Text>
        </View>
        <Text style={styles.infoDescription}>
          Maintaining consistency within these limits helps you develop a healthy learning habit while preventing burnout.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8FAFB',
    borderRadius: 12,
    padding: 16,
    marginVertical: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#43535E',
    marginBottom: 16,
  },
  statsBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 14,
    marginBottom: 16,
    gap: 12,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCol: {
    flex: 1,
  },
  statColRight: {
    alignItems: 'flex-end',
  },
  statLabel: {
    fontSize: 12,
    color: '#9CA6A3',
    fontWeight: '600',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#3FAFC4',
  },
  progressSection: {
    gap: 8,
  },
  progressTrack: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E0E8E3',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressLabel: {
    fontSize: 11,
    color: '#72857A',
    fontWeight: '600',
  },
  alertBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFF3E0',
    borderRadius: 8,
    padding: 10,
    gap: 8,
  },
  alertText: {
    flex: 1,
    fontSize: 12,
    color: '#D84848',
    fontWeight: '500',
  },
  successBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#E8F5E9',
    borderRadius: 8,
    padding: 10,
    gap: 8,
  },
  successText: {
    flex: 1,
    fontSize: 12,
    color: '#27AE60',
    fontWeight: '500',
  },
  maxBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#E8F8F5',
    borderRadius: 8,
    padding: 10,
    gap: 8,
  },
  maxText: {
    flex: 1,
    fontSize: 12,
    color: '#27AE60',
    fontWeight: '500',
  },
  goalSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#43535E',
    marginBottom: 10,
  },
  goalButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  goalButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#F0F5F7',
    borderWidth: 1,
    borderColor: '#D0DCD9',
    alignItems: 'center',
  },
  goalButtonActive: {
    backgroundColor: '#3FAFC4',
    borderColor: '#3FAFC4',
  },
  goalButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#43535E',
  },
  goalButtonTextActive: {
    color: '#FFFFFF',
  },
  infoBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 14,
    gap: 8,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#43535E',
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  infoLabel: {
    fontSize: 12,
    color: '#72857A',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 12,
    color: '#43535E',
    fontWeight: '700',
  },
  infoDescription: {
    fontSize: 11,
    color: '#9CA6A3',
    lineHeight: 16,
    marginTop: 8,
    fontStyle: 'italic',
  },
});
