import React, { useState } from 'react';
import {
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { AppIcon } from '@/components/AppIcon';
import { COLOR_THEMES, Language, ThemeMode, TRANSLATIONS } from '@/constants/Translations';

interface UploadImageModalProps {
  visible: boolean;
  onClose: () => void;
  onImageUploaded: (title: string, uri: string) => void;
  language?: Language;
  themeMode?: ThemeMode;
}

async function ensureBase64Uri(uri: string): Promise<string> {
  if (!uri) return uri;
  if (uri.startsWith('data:') || uri.startsWith('http://') || uri.startsWith('https://')) {
    return uri;
  }
  try {
    const response = await fetch(uri);
    const blob = await response.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result);
        } else {
          resolve(uri);
        }
      };
      reader.onerror = () => resolve(uri);
      reader.readAsDataURL(blob);
    });
  } catch (e) {
    return uri;
  }
}

export const UploadImageModal: React.FC<UploadImageModalProps> = ({
  visible,
  onClose,
  onImageUploaded,
  language = 'bm',
  themeMode = 'light',
}) => {
  const [title, setTitle] = useState('');
  const [selectedUri, setSelectedUri] = useState<string | null>(null);
  const [urlInput, setUrlInput] = useState('');
  const [useUrl, setUseUrl] = useState(false);

  const t = TRANSLATIONS[language];
  const colors = COLOR_THEMES[themeMode];

  const handlePickFromGallery = async () => {
    try {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) {
        alert(t.alertSelectImage);
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        quality: 0.5,
        base64: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        let uri = asset.uri;
        if (asset.base64) {
          const mimeType = asset.mimeType || 'image/jpeg';
          uri = `data:${mimeType};base64,${asset.base64}`;
        } else {
          uri = await ensureBase64Uri(asset.uri);
        }
        setSelectedUri(uri);
      }
    } catch (e) {
      console.warn('Error launching image picker:', e);
    }
  };

  const handleWebFileChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setSelectedUri(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    const rawUri = useUrl ? urlInput.trim() : selectedUri;
    const finalTitle = title.trim() || 'My Drawing';

    if (!rawUri) {
      alert(t.alertSelectImage);
      return;
    }

    const finalUri = await ensureBase64Uri(rawUri);
    onImageUploaded(finalTitle, finalUri);
    // Reset state
    setTitle('');
    setSelectedUri(null);
    setUrlInput('');
    setUseUrl(false);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="fade" transparent onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <View
          style={[
            styles.modalCard,
            { backgroundColor: colors.cardBackground, borderColor: colors.cardBorder },
          ]}
        >
          <View style={styles.titleGroup}>
            <AppIcon name="image" size={20} color={colors.textPrimary} />
            <Text style={[styles.modalTitle, { color: colors.textPrimary }]}>
              {t.uploadModalTitle}
            </Text>
          </View>
          <Text style={[styles.modalSub, { color: colors.textSecondary }]}>
            {t.uploadModalSub}
          </Text>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: colors.textPrimary }]}>
              {t.drawingTitleLabel}
            </Text>
            <TextInput
              style={[
                styles.textInput,
                {
                  backgroundColor: colors.buttonBackground,
                  borderColor: colors.buttonBorder,
                  color: colors.textPrimary,
                },
              ]}
              placeholder={t.drawingTitlePlaceholder}
              value={title}
              onChangeText={setTitle}
              placeholderTextColor={colors.textSecondary}
            />
          </View>

          <View
            style={[
              styles.tabToggle,
              { backgroundColor: colors.buttonBackground },
            ]}
          >
            <TouchableOpacity
              style={[
                styles.toggleBtn,
                !useUrl && {
                  backgroundColor: colors.cardBackground,
                  borderWidth: 1,
                  borderColor: colors.cardBorder,
                },
              ]}
              onPress={() => setUseUrl(false)}
            >
              <View style={styles.tabContent}>
                <AppIcon
                  name="image"
                  size={14}
                  color={!useUrl ? colors.textPrimary : colors.textSecondary}
                />
                <Text
                  style={[
                    styles.toggleText,
                    { color: !useUrl ? colors.textPrimary : colors.textSecondary },
                  ]}
                >
                  {t.deviceGalleryTab}
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.toggleBtn,
                useUrl && {
                  backgroundColor: colors.cardBackground,
                  borderWidth: 1,
                  borderColor: colors.cardBorder,
                },
              ]}
              onPress={() => setUseUrl(true)}
            >
              <View style={styles.tabContent}>
                <AppIcon
                  name="link"
                  size={14}
                  color={useUrl ? colors.textPrimary : colors.textSecondary}
                />
                <Text
                  style={[
                    styles.toggleText,
                    { color: useUrl ? colors.textPrimary : colors.textSecondary },
                  ]}
                >
                  {t.imageUrlTab}
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {!useUrl ? (
            <View
              style={[
                styles.pickerBox,
                { backgroundColor: colors.buttonBackground, borderColor: colors.buttonBorder },
              ]}
            >
              {selectedUri ? (
                <View style={styles.previewContainer}>
                  <View style={styles.tagGroup}>
                    <AppIcon name="check" size={14} color={colors.textPrimary} />
                    <Text style={[styles.previewTag, { color: colors.textPrimary }]}>
                      {t.imageSelectedTag}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={[styles.repickBtn, { backgroundColor: colors.buttonBorder }]}
                    onPress={() => setSelectedUri(null)}
                  >
                    <Text style={[styles.repickText, { color: colors.textPrimary }]}>
                      {t.changeImageBtn}
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.uploadArea}>
                  {Platform.OS === 'web' ? (
                    <label
                      style={{
                        cursor: 'pointer',
                        backgroundColor: colors.darkButtonBackground,
                        color: colors.darkButtonText,
                        padding: '10px 16px',
                        borderRadius: '8px',
                        fontSize: '13px',
                        fontWeight: '700',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                      } as any}
                    >
                      <span>{t.openGalleryBtn}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleWebFileChange}
                        style={{ display: 'none' }}
                      />
                    </label>
                  ) : (
                    <TouchableOpacity
                      style={[styles.pickImageBtn, { backgroundColor: colors.darkButtonBackground }]}
                      onPress={handlePickFromGallery}
                    >
                      <AppIcon name="folder" size={14} color={colors.darkButtonText} />
                      <Text style={[styles.pickImageText, { color: colors.darkButtonText }]}>
                        {t.openGalleryBtn}
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}
            </View>
          ) : (
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: colors.textPrimary }]}>
                {t.enterUrlLabel}
              </Text>
              <TextInput
                style={[
                  styles.textInput,
                  {
                    backgroundColor: colors.buttonBackground,
                    borderColor: colors.buttonBorder,
                    color: colors.textPrimary,
                  },
                ]}
                placeholder="https://images.unsplash.com/photo-..."
                value={urlInput}
                onChangeText={setUrlInput}
                placeholderTextColor={colors.textSecondary}
              />
            </View>
          )}

          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={[
                styles.cancelBtn,
                { backgroundColor: colors.buttonBackground, borderColor: colors.buttonBorder },
              ]}
              onPress={onClose}
            >
              <Text style={[styles.cancelText, { color: colors.textPrimary }]}>{t.cancel}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.submitBtn, { backgroundColor: colors.darkButtonBackground }]}
              onPress={handleSubmit}
            >
              <Text style={[styles.submitText, { color: colors.darkButtonText }]}>
                {t.saveAndTrace}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 24,
    width: '100%',
    maxWidth: 460,
    gap: 16,
  },
  titleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
  },
  modalSub: {
    fontSize: 12,
    marginTop: -8,
  },
  inputGroup: {
    gap: 6,
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 9,
    fontSize: 13,
  },
  tabToggle: {
    flexDirection: 'row',
    borderRadius: 8,
    padding: 3,
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: 7,
    alignItems: 'center',
    borderRadius: 6,
  },
  tabContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  toggleText: {
    fontSize: 12,
    fontWeight: '600',
  },
  pickerBox: {
    minHeight: 80,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
  },
  uploadArea: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  pickImageBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  pickImageText: {
    fontSize: 13,
    fontWeight: '700',
  },
  previewContainer: {
    alignItems: 'center',
    gap: 8,
  },
  tagGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  previewTag: {
    fontWeight: '800',
    fontSize: 13,
  },
  repickBtn: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 6,
  },
  repickText: {
    fontSize: 11,
    fontWeight: '700',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
    marginTop: 8,
  },
  cancelBtn: {
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 8,
    borderWidth: 1,
  },
  cancelText: {
    fontSize: 13,
    fontWeight: '600',
  },
  submitBtn: {
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 8,
  },
  submitText: {
    fontSize: 13,
    fontWeight: '700',
  },
});
