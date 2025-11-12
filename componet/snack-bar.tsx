import React, { useCallback, useEffect, useRef } from 'react';
import { Animated, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

// TypeScript Interface
export interface SnackbarProps {
  visible: boolean;
  message: string;
  duration?: number;
  position?: 'top' | 'bottom' | 'center';
  backgroundColor?: string;
  textColor?: string;
  icon?: React.ReactNode;
  buttonText?: string;
  onButtonPress?: () => void;
  onDismiss?: () => void;
}

// Snackbar Component - BU KOMPONENTI EXPORT EDİYORUZ
const Snackbar: React.FC<SnackbarProps> = ({ 
  visible, 
  message, 
  duration = 3000,
  position = 'bottom',
  backgroundColor = '#323232',
  textColor = '#FFFFFF',
  icon = null,
  buttonText = null,
  onButtonPress = null,
  onDismiss = null
}) => {
  const translateY = useRef(new Animated.Value(position === 'top' ? -100 : 100)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  const hideSnackbar = useCallback(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: position === 'top' ? -100 : 100,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      if (onDismiss) onDismiss();
    });
  }, [position, translateY, opacity, onDismiss]);

  useEffect(() => {
    if (visible) {
      // Göster
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      // Otomatik gizle
      const timer = setTimeout(() => {
        hideSnackbar();
      }, duration);

      return () => clearTimeout(timer);
    } else {
      hideSnackbar();
    }
  }, [visible, duration, hideSnackbar, translateY, opacity]);

  if (!visible) return null;

  const getPositionStyle = () => {
    switch (position) {
      case 'top':
        return { top: 50 };
      case 'center':
        return { top: '45%' as any };
      case 'bottom':
      default:
        return { bottom: 50 };
    }
  };

  return (
    <Animated.View
      style={[
        styles.snackbar,
        { 
          backgroundColor,
          opacity,
          transform: [{ translateY }],
        },
        getPositionStyle(),
      ]}
    >
      <View style={styles.content}>
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        <Text style={[styles.message, { color: textColor }]} numberOfLines={2}>
          {message}
        </Text>
        {buttonText && onButtonPress && (
          <TouchableOpacity onPress={onButtonPress} style={styles.button}>
            <Text style={[styles.buttonText, { color: textColor }]}>
              {buttonText}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  snackbar: {
    position: 'absolute',
    left: 20,
    right: 20,
    borderRadius: 8,
    padding: 16,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    maxWidth: width - 40,
    zIndex: 9999,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconContainer: {
    marginRight: 12,
  },
  message: {
    flex: 1,
    fontSize: 15,
    lineHeight: 20,
  },
  button: {
    marginLeft: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default Snackbar;
