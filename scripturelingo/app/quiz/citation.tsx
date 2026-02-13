import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { FadeInView, PrimaryButton, Screen, TopBar, palette } from '@/components/wireframe-ui';

const choices = ['Alma 32:21', 'Moroni 10:5', '1 Nephi 3:7', 'Ether 12:6'];

export default function CitationQuizScreen() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <Screen backgroundColor={palette.sky} edges={['top', 'left', 'right', 'bottom']}>
      <TopBar title="Citation" onBack={() => router.back()} />

      <View style={styles.content}>
        <FadeInView delay={30}>
          <Text style={styles.prompt}>Which scripture teaches faith in things unseen?</Text>
        </FadeInView>

        {choices.map((choice, index) => {
          const isSelected = selected === choice;
          return (
            <FadeInView key={choice} delay={90 + index * 50}>
              <Pressable style={[styles.choice, isSelected && styles.choiceSelected]} onPress={() => setSelected(choice)}>
                <Text style={[styles.choiceText, isSelected && styles.choiceTextSelected]}>{choice}</Text>
              </Pressable>
            </FadeInView>
          );
        })}
      </View>

      <FadeInView delay={320}>
        <View style={styles.footer}>
          <PrimaryButton
            label="Submit"
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
    paddingTop: 16,
    gap: 10,
  },
  prompt: {
    color: '#47627A',
    fontSize: 24,
    marginBottom: 8,
    fontWeight: '700',
    lineHeight: 30,
  },
  choice: {
    borderWidth: 1,
    borderColor: '#FFFFFF80',
    borderRadius: 12,
    padding: 14,
    backgroundColor: '#FFFFFF88',
  },
  choiceSelected: {
    borderColor: '#4A9DD0',
    backgroundColor: '#E5F5FF',
  },
  choiceText: {
    color: '#465D70',
    fontSize: 18,
    fontWeight: '600',
  },
  choiceTextSelected: {
    color: '#225F8A',
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#FFFFFF82',
    padding: 12,
    backgroundColor: '#CAE7F6',
  },
});
