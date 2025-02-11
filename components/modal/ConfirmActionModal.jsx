import { StyleSheet, Text, View, Modal, Pressable } from "react-native";
import { COLOR } from "@/assets/colors/Colors";
import { SubmitButton, SecondaryButton } from "@/components/search";

const ConfirmActionModal = ({
  visible,
  title,
  confirmationText,
  cancelButtonText = "Hủy",
  confirmButtonText = "Xác nhận",
  onConfirmPress,
  onClose,
}) => {
  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <Pressable style={styles.modal_overlay} onPress={onClose}>
        <View style={styles.modal_content}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.confirm_text}>{confirmationText}</Text>

          <View style={styles.button_container}>
            <SecondaryButton
              onPress={onClose}
              style={styles.button}
              fontSize={16}
              text={cancelButtonText}
            />
            <SubmitButton
              onPress={onConfirmPress}
              style={styles.button}
              fontSize={16}
              text={confirmButtonText}
            />
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal_overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  modal_content: {
    backgroundColor: COLOR.primary_white_100,
    borderRadius: 12,
    padding: 20,
    width: "80%",
  },

  title: {
    fontSize: 24,
    fontWeight: "600",
    color: COLOR.primary_blue_100,
    marginBottom: 12,
    textAlign: "center",
  },

  confirm_text: {
    fontSize: 16,
    color: COLOR.primary_blue_100,
    marginBottom: 20,
    textAlign: "center",
  },

  button_container: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },

  button: {
    flex: 1,
  },
});

export default ConfirmActionModal;
