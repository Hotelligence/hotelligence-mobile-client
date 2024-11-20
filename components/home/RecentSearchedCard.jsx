import { View, Text, StyleSheet, Image, Pressable } from 'react-native'
import { Building } from '@/assets/icons';
import { COLOR } from '@/assets/colors/Colors';

const RecentSearchedCard= ({ title, period, numOfGuestRoom, style, isPressable, onPress }) => {
  return (
    <Pressable disabled={!isPressable} style={[styles.container, style]}>
      <Building fill={COLOR.primary_blue_100} width={24} height={24} />
      <View style={[styles.content_container]}>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
          {title}
        </Text>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.period}>
          {period?.checkinDate} - {period?.checkoutDate}
        </Text>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={styles.num_of_guest_room}
        >
          {numOfGuestRoom?.numOfGuest} khách | {numOfGuestRoom?.numOfRoom} phòng
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
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