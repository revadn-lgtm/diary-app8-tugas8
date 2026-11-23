
import {
  useState,
} from "react";

import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  useRouter,
} from "expo-router";

import DiaryCard from "../../src/components/DiaryCard";

import {
  toggleFavorite,
} from "../../src/features/diary/diarySlice";

import {
  useAppDispatch,
  useAppSelector,
} from "../../src/redux/hooks";

import {
  COLORS,
  RADIUS,
  SPACE,
  TYPO,
} from "../../src/styles/tokens";

const MOODS = [
  "Semua",
  "😊",
  "🎯",
  "😌",
  "🥳",
];

export default function HomeScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [selectedMood, setSelectedMood] =
    useState("Semua");

  const entries = useAppSelector(
    (state) => state.diary.entries
  );

  const totalDiary = entries.length;

  const totalFavorite = entries.filter(
    (item) => item.liked
  ).length;

  const filteredEntries =
    selectedMood === "Semua"
      ? entries
      : entries.filter(
          (item) => item.mood === selectedMood
        );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        Buku Harian
      </Text>

      <View style={styles.statistics}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>
            {totalDiary}
          </Text>
          <Text style={styles.statLabel}>
            Total Diary
          </Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statNumber}>
            {totalFavorite}
          </Text>
          <Text style={styles.statLabel}>
            Total Favorite
          </Text>
        </View>
      </View>

      <Text style={styles.filterTitle}>
        Filter berdasarkan Mood
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterScroll}
      >
        <View style={styles.filterRow}>
          {MOODS.map((item) => (
            <Pressable
              key={item}
              onPress={() => setSelectedMood(item)}
              style={[
                styles.filterButton,
                selectedMood === item &&
                  styles.selectedFilter,
              ]}
            >
              <Text
                style={[
                  styles.filterText,
                  selectedMood === item &&
                    styles.selectedFilterText,
                ]}
              >
                {item}
              </Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>

      <FlatList
        data={filteredEntries}
        keyExtractor={(item) =>
          String(item.id)
        }
        renderItem={({ item }) => (
          <DiaryCard
            title={item.title}
            date={item.date}
            preview={item.preview}
            mood={item.mood}
            liked={item.liked}
            onToggleFavorite={() =>
              dispatch(toggleFavorite(item.id))
            }
            onPress={() =>
              router.push({
                pathname: "/detail/[id]",
                params: {
                  id: String(item.id),
                },
              })
            }
          />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>
            {entries.length === 0
              ? "Belum ada diary. Yuk, buat diary pertamamu melalui tab Tambah."
              : "Belum ada diary dengan mood ini. Coba pilih mood lain."}
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACE.l,
    backgroundColor: COLORS.background,
  },

  header: {
    fontSize: TYPO.h1,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: SPACE.m,
  },

  statistics: {
    flexDirection: "row",
    gap: SPACE.m,
    marginBottom: SPACE.l,
  },

  statCard: {
    flex: 1,
    padding: SPACE.l,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  statNumber: {
    fontSize: 26,
    fontWeight: "700",
    color: COLORS.accent,
  },

  statLabel: {
    fontSize: TYPO.caption,
    color: COLORS.muted,
    marginTop: 4,
  },

  filterTitle: {
    fontSize: TYPO.body,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: SPACE.s,
  },

  filterScroll: {
    flexGrow: 0,
    marginBottom: SPACE.m,
  },

  filterRow: {
    flexDirection: "row",
    gap: SPACE.s,
  },

  filterButton: {
    paddingVertical: 9,
    paddingHorizontal: 15,
    borderRadius: RADIUS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
  },

  selectedFilter: {
    backgroundColor: COLORS.accent,
    borderColor: COLORS.accent,
  },

  filterText: {
    color: COLORS.text,
    fontWeight: "600",
  },

  selectedFilterText: {
    color: "#FFFFFF",
  },

  empty: {
    color: COLORS.muted,
    textAlign: "center",
    marginTop: SPACE.xl,
    lineHeight: 22,
    paddingHorizontal: SPACE.l,
  },
});
