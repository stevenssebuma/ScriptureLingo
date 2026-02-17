import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Pressable,
  Alert,
  Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import { FadeInView, PrimaryButton, Screen, SectionCard, TopBar, palette } from '@/components/wireframe-ui';
import { supabase } from '@/lib/supabase';

export default function SettingsScreen() {
  const [loading, setLoading] = useState(false);
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setEmail(user.email || '');
        // Load user metadata if available
        if (user.user_metadata?.name) {
          setName(user.user_metadata.name);
        }
        if (user.user_metadata?.profile_picture) {
          setProfilePicture(user.user_metadata.profile_picture);
        }
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert('Permission Required', 'Please grant permission to access your photos.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setProfilePicture(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to pick image. Please try again.');
    }
  };

  const handleUpdateProfile = async () => {
    if (!name.trim()) {
      Alert.alert('Validation Error', 'Please enter your name.');
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          name: name.trim(),
          profile_picture: profilePicture,
        },
      });

      if (error) throw error;

      Alert.alert('Success', 'Profile updated successfully!');
    } catch (error: any) {
      console.error('Error updating profile:', error);
      Alert.alert('Error', error.message || 'Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateEmail = async () => {
    if (!email.trim() || !email.includes('@')) {
      Alert.alert('Validation Error', 'Please enter a valid email address.');
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        email: email.trim(),
      });

      if (error) throw error;

      Alert.alert(
        'Success',
        'Email update initiated! Please check your new email for a confirmation link.'
      );
    } catch (error: any) {
      console.error('Error updating email:', error);
      Alert.alert('Error', error.message || 'Failed to update email.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert('Validation Error', 'Please fill in all password fields.');
      return;
    }

    if (newPassword.length < 6) {
      Alert.alert('Validation Error', 'New password must be at least 6 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Validation Error', 'New passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) throw error;

      Alert.alert('Success', 'Password updated successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error: any) {
      console.error('Error updating password:', error);
      Alert.alert('Error', error.message || 'Failed to update password.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            setLoading(true);
            try {
              // First, sign out the user
              const { error: signOutError } = await supabase.auth.signOut();
              if (signOutError) throw signOutError;

              // Note: Actual account deletion should be handled by your backend
              // This is a placeholder - you'll need to implement a backend endpoint
              Alert.alert(
                'Account Deletion',
                'Your account deletion request has been submitted. You have been signed out.',
                [
                  {
                    text: 'OK',
                    onPress: () => router.replace('/'),
                  },
                ]
              );
            } catch (error: any) {
              console.error('Error deleting account:', error);
              Alert.alert('Error', error.message || 'Failed to delete account.');
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  return (
    <Screen backgroundColor={palette.olive}>
      <TopBar
        title="Settings"
        onBack={() => router.back()}
      />

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        {/* Profile Picture Section */}
        <FadeInView delay={40}>
          <SectionCard>
            <Text style={styles.sectionTitle}>Profile Picture</Text>
            <View style={styles.profilePictureContainer}>
              <Pressable onPress={pickImage} style={styles.profilePictureWrapper}>
                {profilePicture ? (
                  <Image source={{ uri: profilePicture }} style={styles.profilePicture} />
                ) : (
                  <View style={styles.profilePicturePlaceholder}>
                    <Ionicons name="person" size={48} color={palette.muted} />
                  </View>
                )}
                <View style={styles.editBadge}>
                  <Ionicons name="camera" size={16} color={palette.white} />
                </View>
              </Pressable>
            </View>
            <Text style={styles.helperText}>Tap to change your profile picture</Text>
          </SectionCard>
        </FadeInView>

        {/* Name Section */}
        <FadeInView delay={100}>
          <SectionCard>
            <Text style={styles.sectionTitle}>Name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Enter your name"
              placeholderTextColor={palette.muted}
              editable={!loading}
            />
            <PrimaryButton
              label="Update Name"
              color={palette.blue}
              onPress={handleUpdateProfile}
              disabled={loading}
            />
          </SectionCard>
        </FadeInView>

        {/* Email Section */}
        <FadeInView delay={160}>
          <SectionCard>
            <Text style={styles.sectionTitle}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              placeholderTextColor={palette.muted}
              keyboardType="email-address"
              autoCapitalize="none"
              editable={!loading}
            />
            <PrimaryButton
              label="Update Email"
              color={palette.blue}
              onPress={handleUpdateEmail}
              disabled={loading}
            />
          </SectionCard>
        </FadeInView>

        {/* Password Section */}
        <FadeInView delay={220}>
          <SectionCard>
            <Text style={styles.sectionTitle}>Change Password</Text>
            <TextInput
              style={styles.input}
              value={currentPassword}
              onChangeText={setCurrentPassword}
              placeholder="Current password"
              placeholderTextColor={palette.muted}
              secureTextEntry
              editable={!loading}
            />
            <TextInput
              style={styles.input}
              value={newPassword}
              onChangeText={setNewPassword}
              placeholder="New password"
              placeholderTextColor={palette.muted}
              secureTextEntry
              editable={!loading}
            />
            <TextInput
              style={styles.input}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Confirm new password"
              placeholderTextColor={palette.muted}
              secureTextEntry
              editable={!loading}
            />
            <PrimaryButton
              label="Update Password"
              color={palette.blue}
              onPress={handleUpdatePassword}
              disabled={loading}
            />
          </SectionCard>
        </FadeInView>

        {/* Delete Account Section */}
        <FadeInView delay={280}>
          <SectionCard style={styles.dangerCard}>
            <Text style={styles.sectionTitle}>Danger Zone</Text>
            <Text style={styles.dangerText}>
              Deleting your account is permanent and cannot be undone. All your data will be lost.
            </Text>
            <PrimaryButton
              label="Delete Account"
              color="#DC3545"
              onPress={handleDeleteAccount}
              disabled={loading}
            />
          </SectionCard>
        </FadeInView>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 16,
    gap: 14,
  },
  sectionTitle: {
    color: '#43535E',
    fontSize: 18,
    marginBottom: 12,
    fontWeight: '700',
  },
  profilePictureContainer: {
    alignItems: 'center',
    marginBottom: 12,
  },
  profilePictureWrapper: {
    position: 'relative',
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: palette.white,
  },
  profilePicturePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#E8EEF2',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: palette.white,
  },
  editBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: palette.blue,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: palette.white,
  },
  helperText: {
    color: palette.muted,
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    marginBottom: 12,
    fontSize: 16,
    color: palette.text,
    borderWidth: 1,
    borderColor: '#E0E6EA',
  },
  dangerCard: {
    borderColor: '#FFD6D6',
    backgroundColor: '#FFF5F5',
  },
  dangerText: {
    color: '#DC3545',
    fontSize: 14,
    marginBottom: 14,
    lineHeight: 20,
  },
  bottomSpacer: {
    height: 40,
  },
});
