import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { FadeInView, PrimaryButton, Screen, TopBar, palette } from '@/components/wireframe-ui';

const lessons = [
  { id: 'intro', label: 'Intro', status: 'done' },
  { id: '1nephi', label: '1 Nephi', status: 'done' },
  { id: '2nephi', label: '2 Nephi', status: 'done' },
  { id: 'jacob', label: 'Jacob', status: 'current' },
  { id: 'enos', label: 'Enos', status: 'locked' },
] as const;

export default function LearnScreen() {
  return (
    <Screen backgroundColor={palette.mint} edges={['top', 'left', 'right', 'bottom']}>
      <TopBar title="Book of Mormon" />

      <View style={styles.content}>
        {lessons.map((item, index) => (
          <FadeInView key={item.id} delay={50 + index * 45}>
            <Pressable
              style={[styles.lessonRow, item.status === 'current' && styles.lessonCurrent]}
              onPress={item.status !== 'locked' ? () => router.push('/lesson/reading') : undefined}>
              <View style={styles.timeline}>
                {index > 0 ? <View style={styles.lineTop} /> : null}
                <View
                  style={[
                    styles.dot,
                    item.status === 'current' && styles.dotCurrent,
                    item.status === 'locked' && styles.dotLocked,
                  ]}>
                  {item.status === 'done' ? (
                    <Ionicons name="checkmark" size={16} color={palette.white} />
                  ) : item.status === 'locked' ? (
                    <Ionicons name="lock-closed" size={15} color={palette.white} />
                  ) : (
                    <Text style={styles.dotText}>a</Text>
                  )}
                </View>
              </View>

              <Text style={[styles.lessonLabel, item.status === 'locked' && styles.lockedLabel]}>{item.label}</Text>
              {item.status === 'locked' && <Ionicons name="lock-closed" size={14} color="#76909C" />}
            </Pressable>
          </FadeInView>
        ))}
      </View>

      <FadeInView delay={320}>
        <View style={styles.actions}>
          <PrimaryButton label="Highlight" style={styles.actionBtn} />
          <PrimaryButton label="Add Note" color="#9FB5C1" style={styles.actionBtn} />
        </View>
      </FadeInView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: 14,
    paddingTop: 10,
    gap: 8,
  },
  lessonRow: {
    minHeight: 68,
    borderRadius: 12,
    borderColor: '#FFFFFF80',
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF7A',
  },
  lessonCurrent: {
    borderColor: '#3AA5D4',
    backgroundColor: '#EAF7FF',
  },
  timeline: {
    width: 32,
    alignItems: 'center',
  },
  lineTop: {
    position: 'absolute',
    top: -22,
    width: 2,
    height: 22,
    backgroundColor: palette.purple,
  },
  dot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: palette.blue,
  },
  dotCurrent: {
    backgroundColor: '#2387C8',
  },
  dotLocked: {
    backgroundColor: '#76909C',
  },
  dotText: {
    color: palette.white,
    fontSize: 18,
    fontWeight: '700',
  },
  lessonLabel: {
    color: '#415863',
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
  },
  lockedLabel: {
    color: '#80939E',
  },
  actions: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: 'row',
    gap: 8,
    backgroundColor: '#D8EFD7',
    borderTopColor: '#FFFFFF88',
    borderTopWidth: 1,
  },
  actionBtn: {
    flex: 1,
    height: 44,
  },
});
