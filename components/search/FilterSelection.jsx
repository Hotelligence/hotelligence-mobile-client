import { StyleSheet, Text, View, Pressable } from 'react-native'
import { ChevronDown } from 'lucide-react-native'
import { COLOR } from '@/assets/colors/Colors'

const FilterSelection = ({ filterCategory, numOfFilters = 0, style, disabled, onPress, }) => {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={[styles.container, style, {backgroundColor: numOfFilters > 0 ? COLOR.tertiary_blue_40 : COLOR.primary_white_100}]}
    >
      <Text style={[styles.filter_text, {marginHorizontal: 5,}]}>{filterCategory}</Text>
      {numOfFilters > 0 && <Text style={styles.filter_text}>({numOfFilters})</Text>}
      <ChevronDown size={20} color={COLOR.primary_blue_100} strokeWidth={2.5} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 30,
    paddingHorizontal: 10,
  },

  filter_text: {
    fontSize: 16,
    color: COLOR.primary_blue_100,
  },

})

export default FilterSelection;