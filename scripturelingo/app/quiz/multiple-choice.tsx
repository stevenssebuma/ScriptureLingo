import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { FadeInView, PrimaryButton, Screen, TopBar, palette } from '@/components/wireframe-ui';

const options = [
  'Perfect knowledge',
  'Hopes for things unseen',
  'Obedience only',
  'Seeing miracles',
];

export default function QuizScreen() {
  const [selected, setSelected] = useState<string | null>('Hopes for things unseen');

  return (
    <Screen backgroundColor={palette.mint} edges={['top', 'left', 'right', 'bottom']}>
      <TopBar title="Multiple Choice" onBack={() => router.back()} />

      <View style={styles.content}>
        <FadeInView delay={30}>
          <Text style={styles.question}>What is faith?</Text>
        </FadeInView>

        {options.map((option, index) => {
          const isSelected = selected === option;
          return (
            <FadeInView key={option} delay={80 + index * 50}>
              <Pressable style={[styles.option, isSelected && styles.optionSelected]} onPress={() => setSelected(option)}>
                <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
                  {isSelected ? <Ionicons name="checkmark" size={15} color={palette.white} /> : null}
                </View>
                <Text style={[styles.optionText, isSelected && styles.optionTextSelected]}>{option}</Text>
              </Pressable>
            </FadeInView>
          );
        })}
      </View>

      <FadeInView delay={320}>
        <View style={styles.footer}>
          <PrimaryButton
            label="Check Answer"
            disabled={!selected}
            onPress={() => router.push('/lesson/complete')}
          />
        </View>
      </FadeInView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: 14,
    paddingTop: 22,
  },
  question: {
    color: '#47605B',
    fontSize: 30,
    marginBottom: 16,
    fontWeight: '700',
  },
  option: {
    minHeight: 58,
    borderWidth: 1,
    borderColor: '#FFFFFF82',
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#FFFFFF80',
  },
  optionSelected: {
    backgroundColor: '#F9EBB8',
    borderColor: '#E1C265',
  },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 2,
    borderColor: '#9CC3A8',
    borderRadius: 6,
  },
  checkboxSelected: {
    borderColor: palette.purple,
    backgroundColor: palette.purple,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionText: {
    color: '#60766F',
    fontSize: 18,
    fontWeight: '600',
  },
  optionTextSelected: {
    color: '#7E6524',
  },
  footer: {
    borderTopColor: '#FFFFFF86',
    borderTopWidth: 1,
    padding: 12,
    backgroundColor: '#CEE8D6',
  },
});
