import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface Book {
  id: number;
  title: string;
  color: string;
  author: string;
  cellId?: string;
}

interface Book3DProps {
  book: Book;
  index: number;
}

interface ShelfCellProps {
  row: number;
  col: number;
  books: Book[];
  onPress: (row: number, col: number) => void;
}

const { width, height } = Dimensions.get("window");

const SAMPLE_BOOKS: Book[] = [
  { id: 1, title: "Suç ve Ceza", color: "#8B4513", author: "Dostoyevski" },
  { id: 2, title: "1984", color: "#2C3E50", author: "Orwell" },
  { id: 3, title: "Simyacı", color: "#E67E22", author: "Coelho" },
  { id: 4, title: "Savaş ve Barış", color: "#C0392B", author: "Tolstoy" },
  { id: 5, title: "Beyaz Diş", color: "#7F8C8D", author: "London" },
];

// 3D Kitap Komponenti
const Book3D: React.FC<Book3DProps> = ({ book, index }) => (
  <View
    style={[
      styles.book,
      {
        backgroundColor: book.color,
        left: index * 35,
      },
    ]}
  >
    <View style={styles.bookSpine}>
      <Text style={styles.bookTitle} numberOfLines={2}>
        {book.title}
      </Text>
    </View>
    <View style={styles.bookEdge} />
    <View style={styles.bookTop} />
  </View>
);

// Raf Hücresi Komponenti
const ShelfCell: React.FC<ShelfCellProps> = ({ row, col, books, onPress }) => {
  const cellId = `${row}-${col}`;
  const cellBooks = books.filter((b: Book) => b.cellId === cellId);

  return (
    <TouchableOpacity
      style={styles.cell}
      onPress={() => onPress(row, col)}
      activeOpacity={0.7}
    >
      {/* Raf arka duvarı - derinlik efekti */}
      <View style={styles.cellBack} />

      {/* Raf tabanı */}
      <View style={styles.cellBottom} />

      {/* Sol duvar - perspektif */}
      <View style={styles.cellLeft} />

      {/* Kitaplar */}
      <View style={styles.booksContainer}>
        {cellBooks.map((book: Book, index: number) => (
          <Book3D key={book.id} book={book} index={index} />
        ))}
      </View>

      {/* Boş hücre göstergesi */}
      {cellBooks.length === 0 && (
        <View style={styles.emptyCell}>
          <Text style={styles.plusIcon}>+</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const Home = () => {
  const router = useRouter();
  const [books, setBooks] = useState<Book[]>([
    { ...SAMPLE_BOOKS[0], cellId: "0-0" },
    { ...SAMPLE_BOOKS[1], cellId: "0-0" },
    { ...SAMPLE_BOOKS[2], cellId: "1-1" },
    { ...SAMPLE_BOOKS[3], cellId: "2-0" },
    { ...SAMPLE_BOOKS[4], cellId: "2-2" },
    { ...SAMPLE_BOOKS[0], cellId: "0-1" },
    { ...SAMPLE_BOOKS[1], cellId: "1-0" },
    { ...SAMPLE_BOOKS[2], cellId: "1-2" },
    { ...SAMPLE_BOOKS[3], cellId: "2-1" },
    { ...SAMPLE_BOOKS[4], cellId: "2-2" },
  ]);

  const handleCellPress = (row: number, col: number): void => {
    const cellId = `${row}-${col}`;
    console.log(`Hücre seçildi: Satır ${row + 1}, Sütun ${col + 1}`);
  };

  return (
    <ImageBackground
      source={require("../assets/images/dk.jpeg")}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Duvar Çerçevesi */}
        <View style={styles.wallFrameContainer}>
          <Pressable onPress={()=> router.push('/studio')}>
            <View style={styles.wallFrame}>{/* Çerçeve içeriği */}</View>
          </Pressable>
        </View>

        {/* Ana Layout Container */}
        <View style={styles.mainLayout}>
          {/* Kallax Kitaplık */}
          <View style={styles.shelfWrapper}>
            <View style={styles.shelfContainer}>
              {/* Kallax çerçevesi */}
              <View style={styles.frame}>
                <View style={styles.frameTop} />
                <View style={styles.frameLeft} />
                <View style={styles.frameRight} />
                <View style={styles.frameBottom} />
              </View>

              {/* 3x3 Grid */}
              <View style={styles.grid}>
                {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((row: number) => (
                  <View key={row} style={styles.row}>
                    {[0, 1, 2].map((col: number) => (
                      <ShelfCell
                        key={`${row}-${col}`}
                        row={row}
                        col={col}
                        books={books}
                        onPress={handleCellPress}
                      />
                    ))}
                  </View>
                ))}
              </View>
            </View>
          </View>

          {/* Tip Box - Kallax'ın hemen üstünde */}
          <View style={styles.tipBoxContainer}>
            <View style={styles.tipBox}>
              <Text style={styles.tipText}>💡 İpucu</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default Home;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: height * 0.05, // Ekranın %5'i kadar üstten başla
  },

  // Duvar Çerçevesi
  wallFrameContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: height * 0.04, // Kallax ile arası ferah olsun
  },
  wallFrame: {
    width: width * 0.2, // Ekran genişliğinin %85'i
    aspectRatio: 2 / 3, // Sabit oran (genişlik/yükseklik)
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },

  // Ana Layout
  mainLayout: {
    width: "100%",
    alignItems: "center",
  },

  // Tip Box Container
  tipBoxContainer: {
    width: "100%",
    alignItems: "flex-end",
    paddingHorizontal: width * 0.05, // Ekranın %5'i kadar padding
    marginTop: -20, // Kallax'a yapışık olsun
    zIndex: 10,
  },
  tipBox: {
    width: width * 0.25, // Ekran genişliğinin %35'i
    aspectRatio: 6 / 2, // Genişliğin yarısı kadar yükseklik
    backgroundColor: "rgba(255, 59, 48, 0.9)",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  tipText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },

  // Kallax Kitaplık
  shelfWrapper: {
    width: "100%",
    alignItems: "center",
    paddingHorizontal: width * 0.0,
  },
  shelfContainer: {
    width: "300%",
    aspectRatio: 1, // Kare şeklinde
    maxWidth: "100%",
    position: "relative",
  },

  // Kallax Çerçevesi
  frame: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  frameTop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 30,
    backgroundColor: "#ECF0F1",
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  frameLeft: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    width: 15,
    backgroundColor: "#ECF0F1",
    shadowColor: "#000",
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  frameRight: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    width: 15,
    backgroundColor: "#D5DBDB",
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  frameBottom: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 12,
    backgroundColor: "#D5DBDB",
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
  },

  // Grid ve Hücreler
  grid: {
    flex: 1,
    padding: 12,
  },
  row: {
    flexDirection: "row",
    flex: 1,
  },
  cell: {
    flex: 1,
    margin: 0,
    borderRadius: 0,
    borderColor: "#E8E8E8",
    borderWidth: 3,
    position: "relative",
    overflow: "hidden",
  },
  cellBack: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderWidth: 1,
    borderColor: "#D0D0D0",
  },
  cellBottom: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 30,
    backgroundColor: "#DCDCDC",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  cellLeft: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    width: 5,
    backgroundColor: "#E0E0E0",
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },

  // Kitap Stilleri
  booksContainer: {
    position: "absolute",
    bottom: 10,
    left: 10,
    right: 10,
    height: "70%",
    flexDirection: "row",
  },
  book: {
    position: "absolute",
    bottom: 0,
    width: 30,
    height: "100%",
    borderRadius: 2,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  bookSpine: {
    flex: 1,
    padding: 0,
    justifyContent: "center",
    borderRightWidth: 2,
    borderRightColor: "rgba(0,0,0,0.2)",
  },
  bookTitle: {
    transform: [{ rotate: "-90deg" }],
    fontSize: 8,
    fontWeight: "bold",
    color: "#FFF",
    textAlign: "center",
  },
  bookEdge: {
    position: "absolute",
    right: -4,
    top: 0,
    bottom: 0,
    width: 4,
    backgroundColor: "rgba(0,0,0,0.9)",
  },
  bookTop: {
    position: "absolute",
    top: -2,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: "rgba(255,255,255,0.3)",
  },

  // Boş Hücre
  emptyCell: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  plusIcon: {
    fontSize: 40,
    color: "#BDC3C7",
    fontWeight: "200",
  },
});
