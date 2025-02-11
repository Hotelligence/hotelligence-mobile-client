import { View, Text, StyleSheet, Image, Pressable } from 'react-native'
import { COLOR } from '@/assets/colors/Colors';
import { Building } from 'lucide-react-native';
import { isoStringToTruncatedSearchDate } from '@/utils/ValueConverter';

const RecentSearchedCard= ({ searchKeyword, period, numOfGuests, diffDays, style, onPress }) => {
  return (
    <Pressable style={[styles.container, style]} onPress={onPress}>
      <Building size={24} strokeWidth={2.5} color={COLOR.primary_blue_100} />
      <View style={[styles.content_container]}>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
          {searchKeyword}
        </Text>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.period}>
          {isoStringToTruncatedSearchDate(period?.checkinDate)} - {isoStringToTruncatedSearchDate(period?.checkoutDate)}
        </Text>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={styles.num_of_guest_room}
        >
          {numOfGuests} khách | {diffDays} đêm
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: 240,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: COLOR.primary_blue_50,
    paddingVertical: 15,
    paddingHorizontal: 10,
  },

  content_container: {
    marginHorizontal: 10,
  },

  title: {
    fontWeight: 500,
    fontSize: 16,
    marginBottom: 4,
  },

  period: {
    fontSize: 14,
    marginVertical: 2,
    color: COLOR.primary_blue_50
  },

  num_of_guest_room: {
    fontSize: 14,
    color: COLOR.primary_blue_50
  },
});

export default RecentSearchedCard