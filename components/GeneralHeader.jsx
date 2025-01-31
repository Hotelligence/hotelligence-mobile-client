import { StyleSheet, Text, View, StatusBar } from 'react-native'
import { COLOR } from '@/assets/colors/Colors';
import { ChevronLeft } from 'lucide-react-native';
import { CircleButton } from './search';

const GeneralHeader = ({ title, style, onBackPress }) => {
  return (
    <View style={[styles.container, style]}>
      <CircleButton
        Icon={ChevronLeft}
        onPress={onBackPress}
        style={styles.back_button}
      />
      <Text ellipsizeMode='tail' numberOfLines={1} style={styles.title_text}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 93,
    borderBottomWidth: 1,
    borderBottomColor: COLOR.primary_blue_50,
    backgroundColor: COLOR.primary_white_100,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    paddingBottom: 10,
  },

  back_button: {
    position: "absolute",
    left: 20,
    bottom: 6,
  },

  title_text: {
    fontWeight: 500,
    fontSize: 20,
    width: "65%",
    textAlign: "center",
  },
});

export default GeneralHeader
