export const priceFilterOptions = [
  {
    value: "priceUp",
    sortBy: "discountPrice",
    sortOrder: "asc",
    label: "Giá thấp đến cao",
  },
  {
    value: "priceDown",
    sortBy: "discountPrice",
    sortOrder: "desc",
    label: "Giá cao đến thấp",
  },
  {
    value: "ratingDown",
    sortBy: "ratingScore",
    sortOrder: "desc",
    label: "Đánh giá cao nhất",
  },
  {
    value: "ratingUp",
    sortBy: "ratingScore",
    sortOrder: "asc",
    label: "Đánh giá thấp nhất",
  },
];

export const ratingFilterOptions = [
  {
    value: "",
    label: "Tất cả",
  },
  {
    value: "9",
    label: "Tuyệt vời 9+",
  },
  {
    value: "8",
    label: "Xuất sắc 8+",
  },
  {
    value: "7",
    label: "Tốt 7+",
  },
  {
    value: "6",
    label: "Khá 6+",
  },
];

export const starFilterOptions = [
  {
    value: "",
    label: "Tất cả",
  },
  {
    value: "5",
    label: "5 sao",
  },
  {
    value: "4",
    label: "4 sao",
  },
  {
    value: "3",
    label: "3 sao",
  },
  {
    value: "2",
    label: "2 sao",
  },
  {
    value: "1",
    label: "1 sao",
  },
];
