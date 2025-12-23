// src/constants/categoryConfig.js

export const CATEGORY_CONFIG = {
  all: {
    key: "all",
    title: "Tất cả sản phẩm",
    description: "",
  },
  shirtGroup: {
    key: "shirtGroup",
    bannerImage:
      "https://cdn.hstatic.net/files/1000360022/collection/ao-nam_0f93e80528b44fdca8d1ddce375892bd.jpg",
    children: ["hoodie", "polo", "jacket", "t-shirt"],
    isGroup: true,
  },

  pantGroup: {
    key: "pantGroup",
    bannerImage:
      "https://cdn.hstatic.net/files/1000360022/collection/quan-kaki_b3450ed468064091a77f467dc1788a53.jpg",
    children: ["pant", "short"],
    isGroup: true,
  },

  /* ================== SHIRT ================== */
  hoodie: {
    key: "hoodie",
    title: "Hoodie Nam",
    subtitle: "Ấm áp – Cá tính – Streetwear",
    bannerImage:
      "https://cdn.hstatic.net/files/1000360022/collection/ao-hoodie_5fd5fc197ae34e51bf6c41dfeab7f961.jpg",
    thumb:
      "https://i.pinimg.com/originals/19/f0/29/19f02983b99a2dcb44a98ef630ef4be2.jpg",
    description:
      "Hoodie nam là lựa chọn hoàn hảo cho phong cách streetwear hiện đại, mang lại sự ấm áp và cá tính.",

    longDescription: [
      "MEFAGHION mang đến các mẫu hoodie nam với thiết kế trẻ trung, form dáng hiện đại, phù hợp với xu hướng thời trang đường phố.",

      "Sử dụng chất liệu nỉ cao cấp, dày dặn nhưng vẫn thoáng khí, hoodie MEFAGHION giúp giữ ấm tốt, tạo cảm giác dễ chịu khi mặc trong thời tiết se lạnh.",

      "Hoodie nam dễ phối cùng quần jean, jogger hoặc quần short, phù hợp cho đi học, đi chơi, du lịch hay các hoạt động ngoài trời.",
    ],

    contentImage:
      "https://img.ltwebstatic.com/images3_spmp/2025/01/17/4e/17371195743cce3495f5f555ac920647873404bb4e.webp",
  },

  polo: {
    key: "polo",
    title: "Áo Polo Nam",
    subtitle: "Lịch lãm – Trẻ trung – Đa dụng",
    bannerImage:
      "https://cdn.hstatic.net/files/1000360022/collection/ao-polo_5697ea71690740e9b4d1a6f4f4ec8add.jpg",
    thumb:
      "https://cdn.vuahanghieu.com/unsafe/0x900/left/top/smart/filters:quality(90)/https://admin.vuahanghieu.com/upload/product/2023/08/ao-polo-nam-ralph-lauren-slim-fit-rlneunavy-mau-xanh-navy-size-s-64e437aa2f58d-22082023112058.jpg",
    description:
      "Áo polo nam mang đến vẻ ngoài lịch lãm, gọn gàng nhưng vẫn giữ được sự trẻ trung và năng động.",

    longDescription: [
      "MEFAGHION giới thiệu bộ sưu tập áo polo nam được thiết kế dành cho những quý ông yêu thích phong cách thanh lịch nhưng không quá cứng nhắc.",

      "Chất liệu vải cotton pha cao cấp giúp áo polo MEFAGHION thoáng mát, co giãn nhẹ, thấm hút mồ hôi tốt và giữ được phom dáng suốt cả ngày dài.",

      "Áo polo nam dễ dàng kết hợp cùng quần jean, quần tây hay quần kaki, phù hợp cho môi trường công sở, gặp gỡ đối tác hoặc các buổi dạo phố cuối tuần.",
    ],

    contentImage:
      "https://img.thesitebase.net/10126/10126771/products/ver_1afc64e9231d021e1c1f2c55c1528ce87/1717039590890.jpg",
  },

  "t-shirt": {
    key: "t-shirt",
    title: "Áo Thun Nam",
    subtitle: "Basic – Thoải mái – Dễ mặc",
    bannerImage:
      "https://cdn.hstatic.net/files/1000360022/collection/ao-thun_1cd58c4b42b9419088f85830d5d9527c.jpg",
    thumb:
      "https://tse4.mm.bing.net/th/id/OIP.PsbbsX28kdIAZVYDV2OiLAHaHa?w=626&h=626&rs=1&pid=ImgDetMain&o=7&rm=3",
    description:
      "Áo thun nam là item không thể thiếu trong tủ đồ của phái mạnh nhờ sự thoải mái, dễ mặc và linh hoạt trong mọi hoàn cảnh.",

    longDescription: [
      "Nắm bắt xu hướng thời trang hiện đại giữa nhịp sống năng động, MEFAGHION mang đến các mẫu áo thun nam cao cấp với thiết kế tối giản nhưng tinh tế, giúp bạn tự tin thể hiện phong cách cá nhân.",

      "Áo thun MEFAGHION được sản xuất từ chất liệu cotton cao cấp, định lượng vải dày dặn từ 220gsm – 240gsm, mang lại cảm giác mềm mại, thoáng khí và bền form sau nhiều lần giặt.",

      "Dễ dàng phối cùng quần jean, quần short hay kaki, áo thun nam MEFAGHION phù hợp cho đi làm, đi chơi, dạo phố và các hoạt động thường ngày.",
    ],

    contentImage:
      "https://cdn.vinaenter.edu.vn/wp-content/uploads/2024/06/thong-so-size-ao-nam-1.jpg",
  },

  jacket: {
    key: "jacket",
    title: "Áo Khoác Nam",
    subtitle: "Phong cách – Bảo vệ – Thời trang",
    bannerImage:
      "https://cdn.hstatic.net/files/1000360022/collection/ao-khoac_90127bbb5c2746f7a2f1c1b8170ab78c.jpg",
    thumb:
      "https://i5.walmartimages.com/seo/Leesechin-Men-Bomber-Jacket-Cotton-Winter-Solid-Color-Plus-Velvet-Padded-Uniform-Collar-Leather-Jacket_643f111f-37d0-4236-ba04-62d869945790.52409c92909b2a56e10e9efc0d5ab873.jpeg",
    description:
      "Áo khoác nam không chỉ giúp bảo vệ cơ thể trước thời tiết mà còn là điểm nhấn thời trang cho outfit.",

    longDescription: [
      "MEFAGHION mang đến những mẫu áo khoác nam đa dạng phong cách, từ năng động đến lịch lãm, đáp ứng nhu cầu sử dụng hàng ngày.",

      "Chất liệu cao cấp giúp áo khoác giữ ấm, chắn gió tốt nhưng vẫn đảm bảo sự thoải mái khi vận động.",

      "Áo khoác nam MEFAGHION dễ dàng phối cùng áo thun, hoodie hay polo, phù hợp cho đi làm, đi chơi và du lịch.",
    ],

    contentImage:
      "https://cdn.shopify.com/s/files/1/0021/5629/8301/files/lQLPKHNHgGae03_NA6nNAmmwXvYmmZ25CAsG3K3gl7NQAQ_617_937.png?v=1728879298",
  },

  /* ================== PANT ================== */
  pant: {
    key: "pant",
    title: "Quần Jean Nam",
    subtitle: "Bền bỉ – Form chuẩn – Dễ phối",
    bannerImage:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=1600",
    thumb:
      "https://tse3.mm.bing.net/th/id/OIP.RA-DkZX_07G1l9pP5Dkw0AHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
    description:
      "Quần jean nam là item kinh điển, mang lại vẻ ngoài mạnh mẽ, nam tính và dễ phối đồ.",

    longDescription: [
      "MEFAGHION giới thiệu các mẫu quần jean nam với form dáng hiện đại, tôn dáng và phù hợp với nhiều phong cách thời trang.",

      "Chất liệu denim cao cấp giúp quần jean bền bỉ, giữ form tốt và mang lại cảm giác thoải mái khi mặc cả ngày.",

      "Quần jean nam MEFAGHION dễ dàng kết hợp cùng áo thun, polo hay hoodie, phù hợp cho đi làm, đi chơi và dạo phố.",
    ],

    contentImage:
      "https://file.hstatic.net/200000053174/file/bang-size-quan-nam-danh-cho-quan-jean-1_e7b22355184148baba3548e5e85cb644.png",
  },

  short: {
    key: "short",
    title: "Quần Short Nam",
    subtitle: "Thoải mái – Năng động – Mùa hè",
    bannerImage:
      "https://cdn.hstatic.net/files/1000360022/collection/quan-short_bdba6eb079934d4e80496b187c76518e.jpg",
    thumb:
      "https://liefrunning.com/cdn/shop/products/R5_Black_Back.jpg?v=1651720409",
    description:
      "Quần short nam mang lại sự thoải mái, năng động và phù hợp cho các hoạt động thường ngày.",

    longDescription: [
      "MEFAGHION mang đến các mẫu quần short nam với thiết kế đơn giản, trẻ trung, phù hợp với phong cách sống năng động.",

      "Chất liệu vải nhẹ, thoáng mát giúp quần short MEFAGHION tạo cảm giác dễ chịu trong những ngày thời tiết nóng.",

      "Quần short nam dễ phối cùng áo thun hoặc hoodie, phù hợp cho dạo phố, du lịch, tập luyện và sinh hoạt hàng ngày.",
    ],

    contentImage:
      "https://5sfashion.vn/storage/upload/images/ckeditor/bg366xKzDxMjaJZxjqLcppHdToQwYI834nOpLVpq.jpg",
  },

  /* ================== SPECIAL ================== */
  new: {
    key: "new",
    title: "Sản phẩm mới",
    subtitle: "Xu hướng mới nhất",
    bannerImage:
      "https://images.unsplash.com/photo-1596574197254-1d6710b7063a?w=1600",
    thumb:
      "https://images.unsplash.com/photo-1596574197254-1d6710b7063a?w=400&fit=crop",
    description: "Những sản phẩm mới nhất vừa được cập nhật tại cửa hàng.",
  },

  hot: {
    key: "hot",
    title: "Hàng bán chạy",
    subtitle: "Được khách hàng yêu thích",
    bannerImage:
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=1600",
    thumb:
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=400&fit=crop",
    description: "Các sản phẩm bán chạy và được đánh giá cao.",
  },

  sale: {
    key: "sale",
    title: "OUTLET – Sale up to 50%",
    subtitle: "Ưu đãi sốc – Có hạn",
    bannerImage:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=1600",
    thumb:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=400&fit=crop",
    description: "Săn sale cực đã với mức giảm giá lên tới 50%.",
  },
};
