import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { FadeInView, PrimaryButton, Screen, TopBar, palette } from '@/components/wireframe-ui';

const items = ['Book of Mormon', 'Bible (KJV)', 'Doctrine & Covenants', 'Pearl of Great Price'];

export default function ChooseScripturesScreen() {
  const [selected, setSelected] = useState<string[]>(['Bible (KJV)']);

  const toggle = (item: string) => {
    setSelected((current) =>
      current.includes(item) ? current.filter((value) => value !== item) : [...current, item]
    );
  };

  return (
    <Screen backgroundColor={palette.sky}>
      <TopBar title="Choose Scriptures" onBack={() => router.back()} />

      <View style={styles.content}>
        <View>
          <FadeInView delay={20}>
            <Text style={styles.prompt}>Select your study sources</Text>
          </FadeInView>

          {items.map((item, index) => {
            const isSelected = selected.includes(item);
            return (
              <FadeInView key={item} delay={80 + index * 50}>
                <Pressable key={item} style={[styles.row, isSelected && styles.rowSelected]} onPress={() => toggle(item)}>
                  <View style={[styles.checkbox, isSelected && styles.checkboxSelected]} />
                  <Text style={styles.rowText}>{item}</Text>
                </Pressable>
              </FadeInView>
            );
          })}
        </View>

        <FadeInView delay={320}>
          <PrimaryButton
            label="Continue"
            disabled={selected.length === 0}
            onPress={() => router.push('/onboarding/daily-goal')}
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
    color: '#5F7888',
    fontSize: 16,
    marginBottom: 14,
    fontWeight: '600',
  },
  row: {
    borderWidth: 1,
    borderColor: '#FFFFFF60',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 12,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#FFFFFF80',
  },
  rowSelected: {
    borderColor: '#42BFC6',
    backgroundColor: '#E8FCFD',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#5EB7C2',
    backgroundColor: '#FFFFFFBB',
  },
  checkboxSelected: {
    backgroundColor: '#46CDC4',
    borderColor: '#46CDC4',
  },
  rowText: {
    color: '#455561',
    fontSize: 18,
    fontWeight: '600',
  },
});
