import { COLOR } from '@/assets/colors/Colors'
import { View, Text, Pressable, StyleSheet } from 'react-native'
import { Map } from '@/assets/icons'

const SubmitButton = ({ text, style, disabled, isDisplayIcon, onPress }) => {
  return (
    <Pressable style={[styles.container, style]}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: COLOR.primary_blue_100,
    width: "100%",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
  },

  text: {
    fontWeight: 500,
    fontSize: 18,
    color: COLOR.primary_gold_100,
  },

  icon: {},
});

export default SubmitButton