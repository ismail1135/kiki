import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function PhotoFrame() {
  return (
    <View style={styles.container}>
      {/* Dış çerçeve - koyu kahverengi */}
      <View style={styles.outerFrame}>
        {/* Orta çerçeve - kırmızımsı kahverengi */}
        <View style={styles.middleFrame}>
          {/* İç çerçeve - altın rengi */}
          <View style={styles.innerFrame}>
            {/* Fotoğraf alanı */}
            <View style={styles.photoArea}>
              {/* Buraya fotoğraf gelecek */}
            </View>
          </View>
        </View>
      </View>
      
      {/* Gölge efekti */}
      <View style={styles.shadow} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  outerFrame: {
    width: 320,
    height: 400,
    backgroundColor: '#6b4423',
    padding: 8,
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 8,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  middleFrame: {
    flex: 1,
    backgroundColor: '#8b4513',
    padding: 12,
    borderRadius: 2,
  },
  innerFrame: {
    flex: 1,
    backgroundColor: '#d4af37',
    padding: 3,
    borderRadius: 1,
  },
  photoArea: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 1,
  },
  shadow: {
    position: 'absolute',
    width: 320,
    height: 400,
    backgroundColor: 'transparent',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -160 }, { translateY: -200 }],
    zIndex: -1,
  },
});