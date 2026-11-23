
import {
    useEffect,
    useState,
} from "react";

import {
    Alert,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

import {
    useLocalSearchParams,
    useRouter,
} from "expo-router";

import {
    useAppDispatch,
    useAppSelector,
} from "../../src/redux/hooks";

import {
    editDiary,
} from "../../src/features/diary/diarySlice";

import {
    COLORS,
    RADIUS,
    SPACE,
} from "../../src/styles/tokens";

const MOODS = [
  "😊",
  "🎯",
  "😌",
  "🥳",
];

export default function EditScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { id } = useLocalSearchParams<{
    id: string;
  }>();

  const entry = useAppSelector(
    (state) =>
      state.diary.entries.find(
        (item) => item.id === Number(id)
      )
  );

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [mood, setMood] = useState("😊");

  useEffect(() => {
    if (entry) {
      setTitle(entry.title);
      setBody(entry.body);
      setMood(entry.mood);
    }
  }, [entry]);

  const saveChanges = () => {
    if (title.trim().length < 3) {
      Alert.alert(
        "Validasi",
        "Judul diary minimal 3 karakter."
      );
      return;
    }

    if (!body.trim()) {
      Alert.alert(
        "Validasi",
        "Isi diary wajib diisi."
      );
      return;
    }

    dispatch(
      editDiary({
        id: Number(id),
        title: title.trim(),
        body: body.trim(),
        mood,
      })
    );

    Alert.alert(
      "Berhasil",
      "Diary berhasil diperbarui."
    );

    router.replace({
      pathname: "/detail/[id]",
      params: {
        id: String(id),
      },
    });
  };

  if (!entry) {
    return (
      <View style={styles.container}>
        <Text>Diary tidak ditemukan.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        Edit Diary
      </Text>

      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Judul diary"
        style={styles.input}
      />

      <TextInput
        value={body}
        onChangeText={setBody}
        placeholder="Ceritakan harimu..."
        multiline
        style={[
          styles.input,
          styles.bodyInput,
        ]}
      />

      <Text style={styles.label}>
        Pilih Mood
      </Text>

      <View style={styles.moodRow}>
        {MOODS.map((item) => (
          <Pressable
            key={item}
            onPress={() => setMood(item)}
            style={[
              styles.moodButton,
              mood === item && styles.selectedMood,
            ]}
          >
            <Text style={styles.mood}>
              {item}
            </Text>
          </Pressable>
        ))}
      </View>

      <Pressable
        onPress={saveChanges}
        style={styles.button}
      >
        <Text style={styles.buttonText}>
          Simpan Perubahan
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACE.l,
    gap: SPACE.m,
    backgroundColor: COLORS.background,
  },

  heading: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.text,
  },

  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.card,
    padding: 12,
    backgroundColor: COLORS.surface,
  },

  bodyInput: {
    minHeight: 140,
    textAlignVertical: "top",
  },

  label: {
    fontWeight: "600",
    color: COLORS.text,
  },

  moodRow: {
    flexDirection: "row",
    gap: SPACE.s,
  },

  moodButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    backgroundColor: COLORS.surface,
  },

  selectedMood: {
    borderColor: COLORS.accent,
    borderWidth: 2,
  },

  mood: {
    fontSize: 28,
  },

  button: {
    padding: 14,
    borderRadius: RADIUS.card,
    backgroundColor: COLORS.accent,
    alignItems: "center",
  },

  buttonText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
});
