import { StyleSheet, Text, View, Pressable } from 'react-native'
import { ChevronDown } from '@/assets/icons'
import { COLOR } from '@/assets/colors/Colors'

const FilterSelection = ({ filterCategory, numOfFilters = 0, style, disabled, onPress, }) => {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={[styles.container, style, {backgroundColor: numOfFilters > 0 ? COLOR.tertiary_blue_40 : "#FFFFFF"}]}
    >
      <Text style={[styles.filter_text, {marginHorizontal: 5,}]}>{filterCategory}</Text>
      {numOfFilters > 0 && <Text style={styles.filter_text}>({numOfFilters})</Text>}
      <ChevronDown width={20} height={20} fill={"#000000"} />
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
  },

})

export default FilterSelection;