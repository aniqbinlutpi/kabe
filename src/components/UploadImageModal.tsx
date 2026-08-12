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

interface UploadImageModalProps {
  visible: boolean;
  onClose: () => void;
  onImageUploaded: (title: string, uri: string) => void;
}

export const UploadImageModal: React.FC<UploadImageModalProps> = ({
  visible,
  onClose,
  onImageUploaded,
}) => {
  const [title, setTitle] = useState('');
  const [selectedUri, setSelectedUri] = useState<string | null>(null);
  const [urlInput, setUrlInput] = useState('');
  const [useUrl, setUseUrl] = useState(false);

  // Native Image Picker (iOS & Android Photo Gallery)
  const handlePickFromGallery = async () => {
    try {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) {
        alert('Kebenaran galeri diperlukan untuk memilih gambar dari peranti anda.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        quality: 0.9,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setSelectedUri(result.assets[0].uri);
      }
    } catch (e) {
      console.warn('Error launching image picker:', e);
    }
  };

  // Web File Picker Fallback
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

  const handleSubmit = () => {
    const finalUri = useUrl ? urlInput.trim() : selectedUri;
    const finalTitle = title.trim() || 'Lukisan Saya';

    if (!finalUri) {
      alert('Sila pilih gambar dari galeri peranti!');
      return;
    }

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
        <View style={styles.modalCard}>
          <Text style={styles.modalTitle}>Muat Naik Gambar Baru</Text>
          <Text style={styles.modalSub}>
            Pilih gambar dari galeri peranti untuk dijadikan corak tekap lukisan.
          </Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Tajuk Lukisan</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Contoh: Lukisan Kucing Saya"
              value={title}
              onChangeText={setTitle}
              placeholderTextColor="#A1A1AA"
            />
          </View>

          <View style={styles.tabToggle}>
            <TouchableOpacity
              style={[styles.toggleBtn, !useUrl && styles.toggleBtnActive]}
              onPress={() => setUseUrl(false)}
            >
              <Text style={[styles.toggleText, !useUrl && styles.toggleTextActive]}>
                🖼️ Galeri Peranti
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.toggleBtn, useUrl && styles.toggleBtnActive]}
              onPress={() => setUseUrl(true)}
            >
              <Text style={[styles.toggleText, useUrl && styles.toggleTextActive]}>
                🔗 URL Gambar
              </Text>
            </TouchableOpacity>
          </View>

          {!useUrl ? (
            <View style={styles.pickerBox}>
              {selectedUri ? (
                <View style={styles.previewContainer}>
                  <Text style={styles.previewTag}>✓ Gambar Dipilih Dari Galeri</Text>
                  <TouchableOpacity
                    style={styles.repickBtn}
                    onPress={() => setSelectedUri(null)}
                  >
                    <Text style={styles.repickText}>Tukar Gambar</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.uploadArea}>
                  {Platform.OS === 'web' ? (
                    <label
                      style={{
                        cursor: 'pointer',
                        backgroundColor: '#09090B',
                        color: '#FFFFFF',
                        padding: '10px 16px',
                        borderRadius: '8px',
                        fontSize: '13px',
                        fontWeight: '700',
                        display: 'inline-block',
                      } as any}
                    >
                      <span>📂 Buka Galeri Gambar</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleWebFileChange}
                        style={{ display: 'none' }}
                      />
                    </label>
                  ) : (
                    <TouchableOpacity
                      style={styles.pickImageBtn}
                      onPress={handlePickFromGallery}
                    >
                      <Text style={styles.pickImageText}>📂 Buka Galeri Gambar</Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}
            </View>
          ) : (
            <View style={styles.inputGroup}>
              <Text style={styles.label}>URL Gambar Direct (https://...)</Text>
              <TextInput
                style={styles.textInput}
                placeholder="https://images.unsplash.com/photo-..."
                value={urlInput}
                onChangeText={setUrlInput}
                placeholderTextColor="#A1A1AA"
              />
            </View>
          )}

          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
              <Text style={styles.cancelText}>Batal</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
              <Text style={styles.submitText}>Simpan & Tekap</Text>
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
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E4E4E7',
    padding: 24,
    width: '100%',
    maxWidth: 460,
    gap: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#09090B',
  },
  modalSub: {
    fontSize: 12,
    color: '#71717A',
    marginTop: -8,
  },
  inputGroup: {
    gap: 6,
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
    color: '#09090B',
    textTransform: 'uppercase',
  },
  textInput: {
    backgroundColor: '#FAFAFA',
    borderWidth: 1,
    borderColor: '#E4E4E7',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 9,
    fontSize: 13,
    color: '#09090B',
  },
  tabToggle: {
    flexDirection: 'row',
    backgroundColor: '#F4F4F5',
    borderRadius: 8,
    padding: 3,
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: 7,
    alignItems: 'center',
    borderRadius: 6,
  },
  toggleBtnActive: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E4E4E7',
  },
  toggleText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#71717A',
  },
  toggleTextActive: {
    color: '#09090B',
    fontWeight: '700',
  },
  pickerBox: {
    minHeight: 80,
    borderWidth: 1,
    borderColor: '#D4D4D8',
    borderStyle: 'dashed',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#FAFAFA',
  },
  uploadArea: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  pickImageBtn: {
    backgroundColor: '#09090B',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  pickImageText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  previewContainer: {
    alignItems: 'center',
    gap: 8,
  },
  previewTag: {
    color: '#09090B',
    fontWeight: '800',
    fontSize: 13,
  },
  repickBtn: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    backgroundColor: '#E4E4E7',
    borderRadius: 6,
  },
  repickText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#09090B',
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
    backgroundColor: '#F4F4F5',
    borderWidth: 1,
    borderColor: '#E4E4E7',
  },
  cancelText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#09090B',
  },
  submitBtn: {
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 8,
    backgroundColor: '#09090B',
  },
  submitText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
