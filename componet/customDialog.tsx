import {
  Modal,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

interface DialogButton {
  text: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

interface CustomDialogProps {
  visible: boolean;
  title: string;
  message: string;
  buttons?: DialogButton[];
  onCancel?: () => void;
  onConfirm?: () => void;
  overlayColor?: string;
  overlayOpacity?: number;
  dialogStyle?: ViewStyle;
  titleStyle?: TextStyle;
  messageStyle?: TextStyle;
  children?: React.ReactNode;
}

const CustomDialog: React.FC<CustomDialogProps> = ({
  visible,
  title,
  message,
  buttons = [],
  onCancel,
  onConfirm,
  overlayColor,
  overlayOpacity,
  dialogStyle,
  titleStyle,
  messageStyle,
  children,
}) => {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={[styles.overlay, { backgroundColor: overlayColor }]}>
        <View style={[styles.dialog, dialogStyle]}>
          {title && <Text style={[styles.title, titleStyle]}>{title}</Text>}
          {message && (
            <Text style={[styles.message, messageStyle]}>{message}</Text>
          )}

          {children && <View style={{ marginVertical: 10 }}>{children}</View>}

          <View style={styles.buttonContainer}>
            {buttons.map((btn, idx) => (
              <TouchableOpacity
                key={idx}
                style={[styles.button, btn.style]}
                onPress={btn.onPress}
              >
                <Text style={[styles.buttonText, btn.textStyle]}>
                  {btn.text}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  dialog: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 40,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  message: { fontSize: 15, color: "#555", textAlign: "center" },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    flexWrap: "wrap",
  },
  button: {
    marginHorizontal: 5,
    marginVertical: 5,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: '#007bff',
    alignItems: "center",
    minWidth: 100,
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
});

export default CustomDialog;
