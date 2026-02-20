import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Pressable, Animated } from 'react-native';
import { palette } from '@/components/wireframe-ui';

interface DailyTimerProps {
  goalMinutes: number;
  onSessionEnd?: () => void;
  isActive: boolean;
}

export const DailyTimer: React.FC<DailyTimerProps> = ({
  goalMinutes,
  onSessionEnd,
  isActive,
}) => {
  const [sessionTime, setSessionTime] = useState(0); // in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [countdownAnimation] = useState(new Animated.Value(1));

  const goalSeconds = goalMinutes * 60;
  const remainingSeconds = Math.max(0, goalSeconds - sessionTime);
  const isCountingDown = remainingSeconds <= 10 && remainingSeconds > 0;

  // Countdown animation trigger
  useEffect(() => {
    if (isCountingDown && !isRunning) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(countdownAnimation, {
            toValue: 1.2,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(countdownAnimation, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [isCountingDown]);

  // Timer interval
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && isActive && sessionTime < goalSeconds) {
      interval = setInterval(() => {
        setSessionTime((prev) => {
          const newTime = prev + 1;
          if (newTime >= goalSeconds && onSessionEnd) {
            setIsRunning(false);
            onSessionEnd();
          }
          return newTime;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, isActive, sessionTime, goalSeconds, onSessionEnd]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setSessionTime(0);
    setIsRunning(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = (sessionTime / goalSeconds) * 100;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>Today's Goal</Text>
        <Text style={styles.goalText}>{goalMinutes} minutes</Text>

        {/* Progress Bar */}
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${progressPercentage}%` }]} />
        </View>

        {/* Timer Display */}
        <Animated.View
          style={[
            styles.timerDisplay,
            isCountingDown && {
              transform: [{ scale: countdownAnimation }],
              borderColor: '#FF6B6B',
            },
          ]}>
          <Text style={[styles.timerText, isCountingDown && styles.timerTextWarning]}>
            {formatTime(sessionTime)}
          </Text>
          <Text style={styles.timerLabel}>elapsed</Text>
        </Animated.View>

        {/* Remaining Time */}
        <View style={styles.remainingWrap}>
          <Text style={styles.remainingLabel}>Time Remaining</Text>
          <Text style={styles.remainingTime}>{formatTime(remainingSeconds)}</Text>
        </View>

        {/* Controls */}
        <View style={styles.controls}>
          <Pressable
            style={[styles.button, styles.buttonPrimary]}
            onPress={toggleTimer}
            disabled={!isActive}>
            <Text style={styles.buttonText}>{isRunning ? 'Pause' : 'Start'}</Text>
          </Pressable>

          <Pressable
            style={[styles.button, styles.buttonSecondary]}
            onPress={resetTimer}
            disabled={!isActive}>
            <Text style={styles.buttonTextSecondary}>Reset</Text>
          </Pressable>
        </View>

        {/* Countdown Warning */}
        {isCountingDown && (
          <View style={styles.warningBanner}>
            <Text style={styles.warningText}>⏱️ 10 seconds remaining!</Text>
          </View>
        )}

        {/* Completion Message */}
        {sessionTime >= goalSeconds && (
          <View style={styles.completionBanner}>
            <Text style={styles.completionText}>✨ Goal reached! Great job!</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  label: {
    fontSize: 14,
    color: '#72857A',
    marginBottom: 8,
    textTransform: 'uppercase',
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  goalText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#3FAFC4',
    marginBottom: 16,
  },
  progressTrack: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E0E8E3',
    overflow: 'hidden',
    marginBottom: 20,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#3FAFC4',
    borderRadius: 4,
  },
  timerDisplay: {
    backgroundColor: '#F8FAFB',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E0E8E3',
    padding: 20,
    alignItems: 'center',
    marginBottom: 16,
  },
  timerText: {
    fontSize: 48,
    fontWeight: '700',
    color: '#43535E',
    fontVariant: ['tabular-nums'],
  },
  timerTextWarning: {
    color: '#FF6B6B',
  },
  timerLabel: {
    fontSize: 12,
    color: '#9CA6A3',
    marginTop: 4,
    fontWeight: '500',
  },
  remainingWrap: {
    backgroundColor: '#F0F5F7',
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
    alignItems: 'center',
  },
  remainingLabel: {
    fontSize: 12,
    color: '#72857A',
    fontWeight: '600',
    marginBottom: 4,
  },
  remainingTime: {
    fontSize: 24,
    fontWeight: '700',
    color: '#3F9BD3',
    fontVariant: ['tabular-nums'],
  },
  controls: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPrimary: {
    backgroundColor: '#3FAFC4',
  },
  buttonSecondary: {
    backgroundColor: '#E8EFED',
    borderWidth: 1,
    borderColor: '#D0DCD9',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonTextSecondary: {
    color: '#43535E',
    fontSize: 16,
    fontWeight: '600',
  },
  warningBanner: {
    backgroundColor: '#FFF3E0',
    borderLeftWidth: 4,
    borderLeftColor: '#FF6B6B',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  warningText: {
    color: '#D84848',
    fontWeight: '600',
    fontSize: 14,
  },
  completionBanner: {
    backgroundColor: '#E8F8F5',
    borderLeftWidth: 4,
    borderLeftColor: '#27AE60',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  completionText: {
    color: '#27AE60',
    fontWeight: '600',
    fontSize: 14,
  },
});
