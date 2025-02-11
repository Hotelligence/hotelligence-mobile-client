import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
  RefreshControl,
  StatusBar,
} from "react-native";
import { COLOR } from "@/assets/colors/Colors";
import { Plus } from "lucide-react-native";
import { formatVND } from "@/utils/ValueConverter";
import { NoImage, CircleButton } from "@/components/search";
import { X, Trash2 } from "lucide-react-native";
import {
  getRoomComparisonListAPI,
  removeRoomFromComparisonListAPI,
  removeAllRoomsFromComparisonListAPI,
} from "@/api/RoomServices";
import { HttpStatusCode } from "axios";
import { useUser } from "@clerk/clerk-expo";
import ScreenSpinner from "@/components/ScreenSpinner";
import { useRouter } from "expo-router";

const ComparisonScreen = () => {
  const { user } = useUser();
  const router = useRouter();

  const [compareRooms, setCompareRooms] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchComparisonList = async (userID) => {
    setLoading(true);
    const response = await getRoomComparisonListAPI(userID);
    if (response.status === HttpStatusCode.Ok) {
      if (response.data) {
        setCompareRooms(response.data.comparedRooms);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchComparisonList(user.id);
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchComparisonList(user.id);
    setRefreshing(false);
  };

  const onAddRoomPress = (hotelID) => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    router.push({
      pathname: "/hotels/[hotelID]",
      params: {
        hotelID: hotelID,
        fromDate: new Date(),
        toDate: tomorrow,
        numOfAdults: 1,
        numOfChild: 0,
      },
    });
  }

  const onDeleteAllPress = async (userID) => {
    const response = await removeAllRoomsFromComparisonListAPI(userID);
    if (response.status === HttpStatusCode.Ok) {
      setCompareRooms([]);
    }
  }

  const categories = [
    "Tên phòng",
    "Loại phòng",
    "Số giường",
    "Loại giường",
    "Số lượng người lớn tối đa",
    "Số lượng trẻ em tối đa",
    "Mô tả",
    "Giá gốc",
    "Giảm giá",
    "Giá sau khi giảm",
  ];

  const TableColumn = ({ room, index }) => {
    const [imageError, setImageError] = useState(false);

    const handleRemoveRoomPress = async (roomID) => {
      const response = await removeRoomFromComparisonListAPI(user.id, roomID);
      if (response.status === HttpStatusCode.Ok) {
        console.log("Removed");
        setCompareRooms((prev) => prev.filter((_, i) => i !== index));
        // setCompareRooms(compareRooms.filter((room) => room.id !== roomID));
      }
    }

    return (
      <View style={styles.room_column}>
        <View style={{ height: 120, paddingTop: 10 }}>
          <CircleButton
            Icon={X}
            size={20}
            style={styles.delete_button}
            onPress={() => handleRemoveRoomPress(room.id)}
          />
          {imageError ? (
            <NoImage style={styles.room_image} />
          ) : (
            <Image
              style={styles.room_image}
              source={{
                uri: room?.images[0],
              }}
              onError={() => setImageError(true)}
            />
          )}
        </View>
        <View style={styles.cell}>
          <Text style={styles.room_name}>{room?.roomName}</Text>
        </View>
        <View style={styles.cell}>
          <Text style={styles.cell_text}>{room?.roomType}</Text>
        </View>
        <View style={styles.cell}>
          <Text style={styles.cell_text}>{room?.numOfBeds}</Text>
        </View>
        <View style={styles.cell}>
          <Text style={styles.cell_text}>{room?.bedType}</Text>
        </View>
        <View style={styles.cell}>
          <Text style={styles.cell_text}>{room?.maxAdults}</Text>
        </View>
        <View style={styles.cell}>
          <Text style={styles.cell_text}>{room?.maxChildren}</Text>
        </View>
        <View style={styles.cell}>
          <Text ellipsizeMode="tail" numberOfLines={2} style={styles.cell_text}>
            {room?.description}
          </Text>
        </View>
        <View style={styles.cell}>
          <Text style={styles.cell_text}>{formatVND(room?.originPrice)} đ</Text>
        </View>
        <View style={styles.cell}>
          <Text style={styles.cell_text}>{room?.discountPercentage}%</Text>
        </View>
        <View style={styles.cell}>
          <Text style={styles.cell_text}>
            {formatVND(room?.discountedPrice)} đ
          </Text>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <>
        <StatusBar
          barStyle={"light-content"}
          translucent={true}
          backgroundColor="transparent"
        />
        <ScreenSpinner />
      </>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={COLOR.primary_gold_100}
        />
      }
    >
      <Text style={styles.title}>So sánh phòng</Text>
      {/* Categories column */}
      {compareRooms.length > 0 ? (
        <View style={{ flexDirection: "row" }}>
          <View style={styles.categories_column}>
            <View style={{ height: 120, alignItems: "center", justifyContent: "center"}}>
              <CircleButton
                Icon={Trash2}
                color={COLOR.tertiary_red_100}
                onPress={() => onDeleteAllPress(user.id)}
              />
              <Text style={[styles.cell_text, { color: COLOR.tertiary_red_100, marginTop: 5, }]}>Xóa tất cả</Text>
            </View>
            {categories.map((category, index) => (
              <View
                key={index}
                style={[
                  styles.cell,
                  { alignItems: "flex-start", borderRightWidth: 1 },
                ]}
              >
                <Text style={styles.category_text}>{category}</Text>
              </View>
            ))}
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingEnd: 15 }}
          >
            <View style={styles.table_container}>
              {/* Room columns */}
              {compareRooms.map((room, index) => (
                <TableColumn key={index} room={room} index={index} />
              ))}

              {/* Add room button */}
              {compareRooms.length < 3 && (
                <Pressable
                  style={styles.add_button}
                  onPress={() => onAddRoomPress(compareRooms[0].hotelId)}
                >
                  <Plus size={24} color={COLOR.primary_blue_100} />
                  <Text style={styles.add_button_text}>Thêm phòng</Text>
                </Pressable>
              )}
            </View>
          </ScrollView>
        </View>
      ) : (
        <View
          style={{
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 20,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: COLOR.primary_blue_100,
              textAlign: "center",
            }}
          >
            Chưa có phòng nào được thêm để{" "}
            <Text style={{ fontWeight: 600 }}>So sánh</Text>, vui lòng quay về{" "}
            <Text style={{ fontWeight: 600 }}>Trang chủ</Text> và bắt đầu tìm
            kiếm một phòng khách sạn để sử dụng tính năng này
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.primary_white_100,
  },

  title: {
    fontSize: 28,
    fontWeight: 500,
    color: COLOR.primary_blue_100,
    textAlign: "center",
    marginBottom: 25,
    marginTop: 20,
  },

  table_container: {
    flexDirection: "row",
  },

  categories_column: {
    width: 130,
  },

  room_column: {
    width: 200,
  },

  cell: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLOR.primary_blue_50,
    justifyContent: "center",
    alignItems: "center",
    height: 60,
  },

  cell_text: {
    fontSize: 14,
    color: COLOR.primary_blue_100,
    textAlign: "center",
  },

  category_text: {
    fontSize: 14,
    color: COLOR.primary_blue_100,
    fontWeight: "500",
  },

  room_name: {
    fontSize: 14,
    fontWeight: "600",
    color: COLOR.primary_blue_100,
  },

  room_image: {
    width: "90%",
    height: "100%",
    borderRadius: 8,
    resizeMode: "cover",
    alignSelf: "center",
  },

  add_button: {
    width: 100,
    height: 120,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: COLOR.primary_blue_50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 12,
  },

  add_button_text: {
    marginTop: 8,
    fontSize: 14,
    color: COLOR.primary_blue_100,
  },

  delete_button: {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 999,
    backgroundColor: COLOR.primary_white_100,
    // iOS shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Android shadow
    elevation: 5,
  },
});

export default ComparisonScreen;
