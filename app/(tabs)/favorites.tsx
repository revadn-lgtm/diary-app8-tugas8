
import {
    Alert,
    FlatList,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";

import {
    useRouter,
} from "expo-router";

import {
    useAppDispatch,
    useAppSelector,
} from "../../src/redux/hooks";

import {
    clearAllFavorites,
    toggleFavorite,
} from "../../src/features/diary/diarySlice";

import DiaryCard from "../../src/components/DiaryCard";

import {
    COLORS,
    RADIUS,
    SPACE,
    TYPO,
} from "../../src/styles/tokens";

export default function FavoritesScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const favoriteEntries = useAppSelector(
    (state) =>
      state.diary.entries.filter(
        (entry) => entry.liked
      )
  );

  const confirmClearFavorites = () => {
    Alert.alert(
      "Hapus Semua Favorite",
      "Apakah kamu yakin ingin menghapus semua diary dari daftar favorite?",
      [
        {
          text: "Batal",
          style: "cancel",
        },
        {
          text: "Hapus Semua",
          style: "destructive",
          onPress: () => {
            dispatch(clearAllFavorites());
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        Favorite
      </Text>

      <Text style={styles.counter}>
        {favoriteEntries.length} diary favorite
      </Text>

      {favoriteEntries.length > 0 && (
        <Pressable
          onPress={confirmClearFavorites}
          style={styles.clearButton}
        >
          <Text style={styles.clearButtonText}>
            Hapus Semua Favorite
          </Text>
        </Pressable>
      )}

      <FlatList
        data={favoriteEntries}
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
            Belum ada diary favorite.
            {"\n"}
            Tekan ikon hati pada diary untuk menambahkannya.
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
  },

  counter: {
    color: COLORS.muted,
    marginBottom: SPACE.m,
  },

  clearButton: {
    padding: 12,
    borderRadius: RADIUS.card,
    backgroundColor: COLORS.danger,
    alignItems: "center",
    marginBottom: SPACE.m,
  },

  clearButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },

  empty: {
    color: COLORS.muted,
    textAlign: "center",
    marginTop: SPACE.xl,
    lineHeight: 22,
  },
});
