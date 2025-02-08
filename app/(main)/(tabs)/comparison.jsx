import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
} from "react-native";
import { COLOR } from "@/assets/colors/Colors";
import { Plus } from "lucide-react-native";
import { rooms } from "@/assets/TempData";
import { formatVND } from "@/utils/ValueConverter";
import { NoImage } from "@/components/search";

const ComparisonScreen = () => {
  const [compareRooms, setCompareRooms] = useState(rooms.slice(0, 0));

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

    return (
      <View key={index} style={styles.room_column}>
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

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>So sánh phòng</Text>
      {/* Categories column */}
      {compareRooms.length > 0 ? (
        <View style={{ flexDirection: "row" }}>
          <View style={styles.categories_column}>
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
              {compareRooms.slice(0, 2).map((room, index) => (
                <TableColumn room={room} index={index} />
              ))}

              {/* Add room button */}
              {true && (
                <Pressable
                  style={styles.add_button}
                  onPress={() => {
                    /* Navigate to room selection */
                  }}
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
            <Text style={{ fontWeight: 600, }}>
              So sánh
            </Text>
            , vui lòng quay về{" "}
            <Text style={{ fontWeight: 600, }}>
              Trang chủ
            </Text>{" "}
            và bắt đầu tìm kiếm một phòng khách sạn để sử dụng tính năng này
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
    marginTop: 120,
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
    height: 120,
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
});

export default ComparisonScreen;
