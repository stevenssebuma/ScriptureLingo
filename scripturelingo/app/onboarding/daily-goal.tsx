import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { FadeInView, PrimaryButton, Screen, TopBar, palette } from '@/components/wireframe-ui';

const options = ['5 minutes', '10 minutes', '15 minutes'];

export default function DailyGoalScreen() {
  const [selected, setSelected] = useState('10 minutes');

  return (
    <Screen backgroundColor={palette.mint}>
      <TopBar title="Daily Goal" onBack={() => router.back()} />

      <View style={styles.content}>
        <View>
          <FadeInView delay={20}>
            <Text style={styles.prompt}>How much time would you like each day?</Text>
          </FadeInView>

          <View style={styles.optionWrap}>
            {options.map((option, index) => {
              const isSelected = selected === option;
              return (
                <FadeInView key={option} delay={80 + index * 60}>
                  <Pressable
                    key={option}
                    style={[styles.row, isSelected && styles.rowSelected]}
                    onPress={() => setSelected(option)}>
                    <View style={[styles.radio, isSelected && styles.radioSelected]} />
                    <Text style={styles.rowText}>{option}</Text>
                  </Pressable>
                </FadeInView>
              );
            })}
          </View>
        </View>

        <FadeInView delay={320}>
          <PrimaryButton label="Start Learning" onPress={() => router.replace('/(tabs)/home')} />
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
  rowText: {
    color: '#425A50',
    fontSize: 18,
    fontWeight: '600',
  },
});
