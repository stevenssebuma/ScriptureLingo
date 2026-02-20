import { router } from 'expo-router';
import { useState, useEffect } from 'react';
import { Pressable, StyleSheet, Text, View, Alert, ActivityIndicator } from 'react-native';

import { FadeInView, PrimaryButton, Screen, TopBar, palette } from '@/components/wireframe-ui';
import { supabase } from '@/lib/supabase';
import { setUserGoal } from '@/lib/dailyGoalService';

const options = [
  { label: '5 minutes', value: 5 },
  { label: '10 minutes', value: 10 },
  { label: '15 minutes', value: 15 },
];

export default function DailyGoalScreen() {
  const [selected, setSelected] = useState(options[1]); // Default to 10 minutes
  const [loading, setLoading] = useState(false);

  const handleContinue = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        Alert.alert('Error', 'User not authenticated');
        return;
      }

      // Save the user's daily goal
      const success = await setUserGoal(user.id, selected.value);
      if (success) {
        router.replace('/(tabs)/home');
      } else {
        Alert.alert('Error', 'Failed to save daily goal. Please try again.');
      }
    } catch (error) {
      console.error('Error saving goal:', error);
      Alert.alert('Error', 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen backgroundColor={palette.mint}>
      <TopBar title="Daily Goal" onBack={() => router.back()} />

      <View style={styles.content}>
        <View>
          <FadeInView delay={20}>
            <Text style={styles.prompt}>How much time would you like each day?</Text>
            <Text style={styles.subtext}>
              Aim for 35-105 minutes per week. Starting with a realistic daily goal helps you stay consistent.
            </Text>
          </FadeInView>

          <View style={styles.optionWrap}>
            {options.map((option, index) => {
              const isSelected = selected.value === option.value;
              return (
                <FadeInView key={option.value} delay={80 + index * 60}>
                  <Pressable
                    style={[styles.row, isSelected && styles.rowSelected]}
                    onPress={() => setSelected(option)}>
                    <View style={[styles.radio, isSelected && styles.radioSelected]} />
                    <View style={styles.optionContent}>
                      <Text style={styles.rowText}>{option.label}</Text>
                      {option.value === 10 && (
                        <Text style={styles.recommendedLabel}>RECOMMENDED</Text>
                      )}
                    </View>
                  </Pressable>
                </FadeInView>
              );
            })}
          </View>
        </View>

        <FadeInView delay={320}>
          <PrimaryButton 
            label={loading ? "Saving..." : "Start Learning"} 
            onPress={handleContinue}
            disabled={loading}
          />
        </FadeInView>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 22,
    paddingBottom: 24,
    justifyContent: 'space-between',
  },
  prompt: {
    color: '#5B7D66',
    fontSize: 16,
    fontWeight: '600',
  },
  subtext: {
    color: '#7A9985',
    fontSize: 14,
    marginTop: 8,
    lineHeight: 20,
  },
  optionWrap: {
    marginTop: 14,
    gap: 10,
  },
  row: {
    borderWidth: 1,
    borderColor: '#FFFFFF70',
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#FFFFFF8A',
  },
  rowSelected: {
    borderColor: '#3F9BD3',
    backgroundColor: '#EAF7FF',
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#57B9AA',
    backgroundColor: '#FFFFFFB0',
  },
  radioSelected: {
    borderColor: palette.blue,
    backgroundColor: palette.blue,
  },
  optionContent: {
    flex: 1,
  },
  rowText: {
    color: '#425A50',
    fontSize: 18,
    fontWeight: '600',
  },
  recommendedLabel: {
    color: '#27AE60',
    fontSize: 11,
    fontWeight: '700',
    marginTop: 2,
    letterSpacing: 0.5,
  },
});
