import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { FadeInView, PrimaryButton, Screen, TopBar, palette } from '@/components/wireframe-ui';

export default function ReadingScreen() {
  return (
    <Screen backgroundColor={palette.sky} edges={['top', 'left', 'right', 'bottom']}>
      <TopBar title="Scripture Reading" onBack={() => router.back()} />

      <View style={styles.content}>
        <FadeInView delay={40}>
          <Text style={styles.chapter}>Alma 32:21</Text>
        </FadeInView>

        <FadeInView delay={120}>
          <View style={styles.quoteBox}>
            <Text style={styles.quoteText}>
              &quot;Faith is not to have a perfect knowledge of things; therefore if ye have faith ye
              hope for things which are not seen, which are true.&quot;
            </Text>
          </View>
        </FadeInView>
      </View>

      <FadeInView delay={220}>
        <View style={styles.actions}>
          <PrimaryButton label="Highlight" style={styles.actionBtn} />
          <PrimaryButton label="Add Note" color="#AFC0C9" style={styles.actionBtn} />
          <PrimaryButton
            label="Quiz"
            color={palette.navy}
            style={styles.quizBtn}
            onPress={() => router.push('/quiz/multiple-choice')}
          />
        </View>
      </FadeInView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 14,
  },
  chapter: {
    color: '#415B6C',
    fontSize: 30,
    fontWeight: '700',
    marginBottom: 16,
  },
  quoteBox: {
    borderColor: '#A4D4F0',
    borderWidth: 2,
    borderRadius: 14,
    backgroundColor: '#E6F7FF',
    padding: 16,
  },
  quoteText: {
    color: '#547082',
    fontSize: 20,
    lineHeight: 30,
  },
  actions: {
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 10,
    borderTopColor: '#FFFFFF88',
    borderTopWidth: 1,
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
    backgroundColor: '#CFE9F8',
  },
  actionBtn: {
    width: '48%',
    height: 42,
  },
  quizBtn: {
    width: '100%',
    height: 46,
  },
});
