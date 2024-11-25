export const recentSearch = [
  {
    id: "1",
    title: "Khách sạn tại Vũng Tàu",
    period: {
      checkinDate: "T6, 01/11/24", // later replace with date object
      checkoutDate: "CN, 03/11/24", // later replace with date object
    },
    numOfGuestRoom: {
      numOfGuest: 1,
      numOfRoom: 1,
    },
  },
  {
    id: "2",
    title: "Alma Resort Cam Ranh",
    period: {
      checkinDate: "T4, 20/11/24", // later replace with date object
      checkoutDate: "T6, 22/11/24", // later replace with date object
    },
    numOfGuestRoom: {
      numOfGuest: 2,
      numOfRoom: 1,
    },
  },
  {
    id: "3",
    title: "The World HCMC",
    period: {
      checkinDate: "T6, 08/11/24", // later replace with date object
      checkoutDate: "CN, 10/11/24", // later replace with date object
    },
    numOfGuestRoom: {
      numOfGuest: 3,
      numOfRoom: 1,
    },
  },
  {
    id: "4",
    title: "Khách sạn tại TPHCM",
    period: {
      checkinDate: "T2, 11/11/24", // later replace with date object
      checkoutDate: "T3, 12/11/24", // later replace with date object
    },
    numOfGuestRoom: {
      numOfGuest: 4,
      numOfRoom: 2,
    },
  },
];  

export const hotels = [
  {
    _id: {
      $oid: "664cdc26bd16c1e72174caf4",
    },
    hotelName: "Sofitel Legend Metropole Hanoi",
    address: "15 Ngô Quyền, Quận Hoàn Kiếm, Hà Nội",
    star: 5,
    description:
      "Khách sạn sang trọng với kiến trúc Pháp cổ điển, nổi tiếng với dịch vụ đẳng cấp",
    images: [
      "https://www.sofitel-legend-metropole-hanoi.com/wp-content/uploads/sites/95/2022/06/DSC00934-scaled.jpg",
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/01/fb/54/c7/swimming-pool.jpg?w=700&h=-1&s=1",
      "https://www.vn.kayak.com/rimg/himg/2b/85/04/ice-85672018-71957861_3XL-584000.jpg?width=968&height=607&crop=true",
      "https://phgcdn.com/images/uploads/HANSL/diningimages/1600x813-Le-Beaulieu-Restaurant2.jpg",
      "https://cdn.businesstraveller.com/wp-content/uploads/2017/06/La-Terrasse-By-Minoru-Masujima.jpg",
      "https://www.sofitel-legend-metropole-hanoi.com/wp-content/uploads/sites/95/2022/07/DSC08026-scaled.jpg",
      "https://d2e5ushqwiltxm.cloudfront.net/wp-content/uploads/sites/95/2016/12/21150434/3557903_XL-1.jpg",
    ],
    city: "Hà Nội",
    province: "Hà Nội",
    ratingScore: 9.5,
    ratingCategory: "Tuyệt vời",
    numOfReviews: 1023,
    originPrice: 3000000,
    discount: 0.1,
    discountPrice: 2700000,
    taxPercentage: 0.08,
    taxPrice: 240000,
    extraFee: 300000,
    totalPrice: 3540000,
    isFavorite: true,
  },
  {
    _id: {
      $oid: "664cdc26bd16c1e72174caf5",
    },
    hotelName: "InterContinental Danang Sun Peninsula Resort",
    address: "Bãi Bắc, Sơn Trà, Đà Nẵng",
    star: 5,
    description:
      "Khu nghỉ dưỡng nằm trên đỉnh đồi với tầm nhìn toàn cảnh biển tuyệt đẹp",
    images: [
      "https://lh3.googleusercontent.com/p/AF1QipMHev0YuS6RToc_PDHs-v6t89yBBJJ5nd03jfqT=s680-w680-h510",
      "https://digital.ihg.com/is/image/ihg/intercontinental-danang-8544579917-2x1",
      "https://duan-sungroup.com/wp-content/uploads/2022/12/intercontinental-da-nang-sun-peninsula-resort-la-du-an-nghi-duong-dang-cap-quoc-te.png",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/436192692.jpg?k=68fd3ba559ca9b503e830bfc3f94271a45580dd1972b8dc29e0662134b85fcb5&o=&hp=1",
      "https://cdn1.ivivu.com/images/2023/08/01/14/100074448___0o30xb____horizontal-800x450.webp?o=jpg",
      "https://digital.ihg.com/is/image/ihg/intercontinental-danang-8146233549-4x3",
      "https://product.hstatic.net/200000504041/product/intercontinental-da-nang-resort-nha-hang-la-maison-1888-1_b94f0f3246d94d468cad163cea3a0404_master.jpg",
    ],
    city: "Đà Nẵng",
    province: "Đà Nẵng",
    ratingScore: 9.2,
    ratingCategory: "Tuyệt vời",
    numOfReviews: 1456,
    originPrice: 4000000,
    discount: 0.15,
    discountPrice: 3400000,
    taxPercentage: 0.08,
    taxPrice: 320000,
    extraFee: 400000,
    totalPrice: 4720000,
    isFavorite: false,
  },
  {
    _id: {
      $oid: "664cdc26bd16c1e72174caf6",
    },
    hotelName: "Vinpearl Resort Nha Trang",
    address: "Hòn Tre, Vĩnh Nguyên, Nha Trang",
    star: 5,
    description:
      "Resort hiện đại với bãi biển riêng, phù hợp cho gia đình và cặp đôi",
    images: [
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/412883158.jpg?k=a220ece8f04054da35466bd13ee87342354cc18122b73eb0fbdcfef850115325&o=&hp=1",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/412885850.jpg?k=1c59b8496696665b9c5869a729bbdc3646e5a1936ab1e7ba70694c547656b0b8&o=&hp=1",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/416971941.jpg?k=47989e73957d65b5acbc12d2b62ed10579e28e9924cde30eea6a30ba0369febb&o=&hp=1",
      "https://booking-static.vinpearl.com/room_types/56883f4f98c04402bfedf771f2d6deb7_POP_0804.jpg?v=20240518",
      "https://cdn2.vietnambooking.com/wp-content/uploads/hotel_pro/hotel_344263/3ef19f5c3633049b457af68fd15e7af4.jpg",
      "https://www.vn.kayak.com/rimg/himg/89/a7/c3/revato-826930-12240319-139901.jpg?width=1366&height=768&crop=true",
      "https://owa.bestprice.vn/images/hotels/large/vinpearl-resort-nha-trang-634293ad34037-848x477.jpg",
    ],
    city: "Nha Trang",//
    province: "Khánh Hòa",
    ratingScore: 8.8,//
    ratingCategory: "Rất tốt",//
    numOfReviews: 2310,//
    originPrice: 2500000,//
    discount: 0.2,//
    discountPrice: 2000000,//
    taxPercentage: 0.08,
    taxPrice: 200000,//
    extraFee: 250000,//
    totalPrice: 2950000,//
    isFavorite: true,
  },
  {
    _id: {
      $oid: "664cdc26bd16c1e72174caf7",
    },
    hotelName: "Fusion Maia Da Nang",
    address: "Võ Nguyên Giáp, Ngũ Hành Sơn, Đà Nẵng",
    star: 5,
    description: "Resort với dịch vụ spa trọn gói, thiên đường nghỉ dưỡng",
    images: [
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/302375896.jpg?k=3fa35a34f1143f0b710083cc1e31c8690510bf213e9a10db2ddbda738bfc7018&o=&hp=1",
      "https://onlinebooking.vn/wp-content/uploads/Fusion-Maia-Resort-2.jpg",
      "https://nhomkhangminh.vn/wp-content/uploads/2021/07/fusion-maia-da-nang-ung-dung-conslab-thach-anh-1118.jpg",
      "https://lh3.googleusercontent.com/proxy/NXKVN4et4PpDSI55axCEpI6owdUtsT-QSnudOVr1tdl8PY831Nx7ABEuhY-_MM2Fy2L8RPw__gBgXAj1n_ww_TARkwdWNi9NuxycHM02_tMMqHPfXi4z50M1_FEdIISeLk0b4FjVv3qt97wY6S218Q",
      "https://lh3.googleusercontent.com/proxy/OqGcVOwoRoS0Ic9a_fkC1bGR8uAgHRaAceSFILsxgzv2T5Tmum-BlDh2bX01daaFxejjxSNnxO6BmhTxpkpx-kgbgR5RshWImDS7iypSjtA_m04KlNzqQdRCVcFfe9DRmnZAe3WYfrzp3_DhSQrxRA",
      "https://www.fivestaralliance.com/files/fivestaralliance.com/field/image/nodes/2011/20564/20564_0_fusionmaiadanang_fsa-g.jpg",
      "https://www.vietnambooking.com/wp-content/uploads/2020/10/combo-fusion-maia-da-nang-3.jpg",
    ],
    city: "Đà Nẵng",
    province: "Đà Nẵng",
    ratingScore: 9,
    ratingCategory: "Tuyệt vời",
    numOfReviews: 985,
    originPrice: 3500000,
    discount: 0.1,
    discountPrice: 3150000,
    taxPercentage: 0.08,
    taxPrice: 280000,
    extraFee: 350000,
    totalPrice: 4130000,
    isFavorite: true,
  },
];