import { StyleSheet, Text, View, Pressable } from 'react-native'
import { COLOR } from '@/assets/colors/Colors';
import { ChevronLeft } from '@/assets/icons';

const GeneralHeader = ({ title, style, onBackPress }) => {
  return (
    <View style={[styles.container, style]}>
      <Pressable style={styles.back_button} onPress={onBackPress}>
        <ChevronLeft width={32} height={32} fill={COLOR.primary_gold_120}/>
      </Pressable>
      <Text style={styles.title_text}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "12%",
    borderBottomWidth: 1,
    borderBottomColor: COLOR.primary_blue_50,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    paddingBottom: 10,
  },

  back_button: {
    position: "absolute",
    left: 10,
    bottom: 6,
  },

  title_text: {
    fontWeight: 500,
    fontSize: 20,
  },
});

export default GeneralHeader
