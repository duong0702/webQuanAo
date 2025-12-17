import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import Clothes from "../models/Clothes.js";
import { connectDB } from "../config/db.js";

dotenv.config();

const seedClothes = async () => {
  try {
    await connectDB();

    await Clothes.deleteMany();

    await Clothes.insertMany([
      {
        name: "Áo khoác Basic",
        price: 35,
        color: "grey",
        type: "shirt",
        size: ["s", "m", "l"],
        images: [
          "https://res.cloudinary.com/dsoluhht8/image/upload/v1765783769/xam1_csrnfk.jpg",
          "https://res.cloudinary.com/dsoluhht8/image/upload/v1765783769/xam2_s4qrns.jpg",
          "https://res.cloudinary.com/dsoluhht8/image/upload/v1765783770/xam4_eiuf9z.jpg",
          "https://res.cloudinary.com/dsoluhht8/image/upload/v1765783769/xam3_va2fgw.jpg",
          "https://res.cloudinary.com/dsoluhht8/image/upload/v1765783771/xam5_bdlb4o.jpg",
        ],
      },
      {
        name: "Áo da cao cấp",
        price: 40,
        color: ["black", "yellow"],
        type: "shirt",
        size: ["m", "l"],
        images: [
          "https://res.cloudinary.com/dsoluhht8/image/upload/v1765783770/loai1_hw2okb.jpg",
          "https://res.cloudinary.com/dsoluhht8/image/upload/v1765783770/loai2_yr2gko.jpg",
          "https://res.cloudinary.com/dsoluhht8/image/upload/v1765783771/loai3_ahk7o5.jpg",
          "https://res.cloudinary.com/dsoluhht8/image/upload/v1765783774/loai5_wg9me3.jpg",
        ],
      },
      {
        name: "Áo khoác da bò ",
        price: 45,
        color: "blue",
        type: "shirt",
        size: ["m", "xl"],
        images: [
          "https://res.cloudinary.com/dsoluhht8/image/upload/v1765783773/loai5_rjc6uy.jpg",
          "https://res.cloudinary.com/dsoluhht8/image/upload/v1765783771/loai6_h9ss1n.jpg",
          "https://res.cloudinary.com/dsoluhht8/image/upload/v1765783771/loai7_o7geuo.jpg",
          "https://res.cloudinary.com/dsoluhht8/image/upload/v1765783774/loai8_rwly59.jpg",
        ],
      },
      {
        name: " Áo caro mùa hè ",
        price: 25,
        color: "yellow-back",
        type: "shirt",
        size: ["s", "l"],
        images: [
          "https://res.cloudinary.com/dsoluhht8/image/upload/v1765783774/caro1_d8iyje.jpg",
          "https://res.cloudinary.com/dsoluhht8/image/upload/v1765783773/caro2_cxcu2w.jpg",
          "https://res.cloudinary.com/dsoluhht8/image/upload/v1765783774/caro3_a5w5nf.jpg",
          "https://res.cloudinary.com/dsoluhht8/image/upload/v1765783769/caro5_sa5yd0.jpg",
          "https://res.cloudinary.com/dsoluhht8/image/upload/v1765783776/caro4_rwmpef.jpg",
        ],
      },
      {
        name: " Áo teddy bear",
        price: 15,
        color: "black",
        type: "shirt",
        size: ["m", "l", "xl"],
        images: [
          "https://res.cloudinary.com/dsoluhht8/image/upload/v1765783769/loai10_jspn4z.jpg",
          "https://res.cloudinary.com/dsoluhht8/image/upload/v1765783770/loai11_h3amig.jpg",
          "https://res.cloudinary.com/dsoluhht8/image/upload/v1765783770/loai12_odttmx.jpg",
          "https://res.cloudinary.com/dsoluhht8/image/upload/v1765783771/loai13_edzxkf.jpg",
        ],
      },
      {
        name: "Áo hoodie nỉ ",
        price: 25,
        color: "yellow",
        type: "hoodie",
        size: "l",
        images: [
          "https://res.cloudinary.com/dsoluhht8/image/upload/v1765783770/tr1_pv8bvu.jpg",
          "https://res.cloudinary.com/dsoluhht8/image/upload/v1765783770/tr1_pv8bvu.jpg",
          "https://res.cloudinary.com/dsoluhht8/image/upload/v1765783774/tr4_zksezw.jpg",
          "https://res.cloudinary.com/dsoluhht8/image/upload/v1765783772/tr5_rlftcl.jpg",
          "https://res.cloudinary.com/dsoluhht8/image/upload/v1765783771/tr3_wsdodv.jpg",
        ],
      },
      {
        name: "Áo hoodie mickey",
        price: 45,
        color: "black",
        type: "hoodie",
        size: "xl",

        image:
          "https://res.cloudinary.com/dsoluhht8/image/upload/v1765783772/mk1_vrtzky.jpg", // ảnh đại diện

        images: [
          "https://res.cloudinary.com/dsoluhht8/image/upload/v1765783772/mk1_vrtzky.jpg",
          "https://res.cloudinary.com/dsoluhht8/image/upload/v1765783773/mk2_koij0d.jpg",
          "https://res.cloudinary.com/dsoluhht8/image/upload/v1765783775/mk3_hpgzf2.jpg",
          "https://res.cloudinary.com/dsoluhht8/image/upload/v1765783775/mk5_banbjq.jpg",
          "https://res.cloudinary.com/dsoluhht8/image/upload/v1765783775/mk4_vop59c.jpg",
        ],
      },

      {
        name: " Áo thêu tay 2025 ",
        price: 30,
        color: "black",
        type: "hoodie",
        size: "m",
        images: [
          "https://res.cloudinary.com/dsoluhht8/image/upload/v1765783775/mu1_npdv2d.jpg",
          "https://res.cloudinary.com/dsoluhht8/image/upload/v1765783776/mu4_venick.jpg",
          "https://res.cloudinary.com/dsoluhht8/image/upload/v1765783775/mu2_mjygqi.jpg",
          "https://res.cloudinary.com/dsoluhht8/image/upload/v1765783775/mu3_thmicr.jpg",
          "https://res.cloudinary.com/dsoluhht8/image/upload/v1765783776/mu5_zisygt.jpg",
        ],
      },
      {
        name: " Hoodie icon ",
        price: 38,
        color: ["red", "black", "grey"],
        type: "hoodie",
        size: "l",
        images: [
          "https://res.cloudinary.com/dsoluhht8/image/upload/v1765783776/ico4_fkvte4.jpg",
          "https://res.cloudinary.com/dsoluhht8/image/upload/v1765783776/ico3_qnuwtg.jpg",
          "https://res.cloudinary.com/dsoluhht8/image/upload/v1765783776/ico1_srm17a.jpg",
          "https://res.cloudinary.com/dsoluhht8/image/upload/v1765783776/ico2_wepbdk.jpg",
        ],
      },
      {
        name: "Quần âu 2025  ",
        price: 36,
        color: "blue",
        type: "pant",
        size: "xl",
        images: [
          "https://res.cloudinary.com/dsoluhht8/image/upload/v1765783777/blu1_bn3epr.jpg",
          "https://res.cloudinary.com/dsoluhht8/image/upload/v1765783777/blu1_bn3epr.jpg",
          "https://res.cloudinary.com/dsoluhht8/image/upload/v1765783777/blu4_nwp1ix.png",
          "https://res.cloudinary.com/dsoluhht8/image/upload/v1765783777/blu5_ngi72p.jpg",
          "https://res.cloudinary.com/dsoluhht8/image/upload/v1765783776/blu3_btkfky.jpg",
        ],
      },
      {
        name: " Quần âu cạp chun  ",
        price: 32,
        color: ["white", "green", "black"],
        type: "pant",
        size: "m",
        images: [
          "https://res.cloudinary.com/dsoluhht8/image/upload/v1765783777/kaki1_popeft.jpg",
          "https://res.cloudinary.com/dsoluhht8/image/upload/v1765783777/kaki2_nswaqb.jpg",
          "https://res.cloudinary.com/dsoluhht8/image/upload/v1765783778/kaki4_lzlevl.jpg",
          "https://res.cloudinary.com/dsoluhht8/image/upload/v1765783777/kaki3_sqenyy.jpg",
        ],
      },
      {
        name: "Quần nam joking  ",
        price: 32,
        color: "white",
        type: "pant",
        size: ["l", "xl"],
        images: [
          "https://res.cloudinary.com/dsoluhht8/image/upload/v1765783780/jg1_fotldd.jpg",
          "https://res.cloudinary.com/dsoluhht8/image/upload/v1765783863/jg3_vidz4f.jpg",
          "https://res.cloudinary.com/dsoluhht8/image/upload/v1765783863/jg3_vidz4f.jpg",
          "https://res.cloudinary.com/dsoluhht8/image/upload/v1765783863/jg2_evexef.jpg",
        ],
      },
      {
        name: " Áo polo basic ",
        price: 28,
        color: "black",
        type: "polo",
        size: "m",
        images: [
          "https://res.cloudinary.com/dsoluhht8/image/upload/v1765783880/2_rrsudy.jpg",
          "https://res.cloudinary.com/dsoluhht8/image/upload/v1765783880/1_dkubbh.jpg",
          "https://res.cloudinary.com/dsoluhht8/image/upload/v1765783881/3_rbbuzo.jpg",
          "https://res.cloudinary.com/dsoluhht8/image/upload/v1765783881/4_ym2ack.jpg",
          "https://res.cloudinary.com/dsoluhht8/image/upload/v1765783884/6_nga6lc.png",
        ],
      },
      {
        name: "Polo sọc Bear ",
        price: 35,
        color: "White",
        type: "polo",
        size: ["l", "xl"],
        images: [
          "https://res.cloudinary.com/dsoluhht8/image/upload/v1765783881/bear_1_kvb8k2.jpg",
          "https://res.cloudinary.com/dsoluhht8/image/upload/v1765783881/bear_2_rv52pl.jpg",
          "https://res.cloudinary.com/dsoluhht8/image/upload/v1765783882/bear_5_qbgg5h.jpg",
          "https://res.cloudinary.com/dsoluhht8/image/upload/v1765783882/bear_3_wmyinl.jpg",
          "https://res.cloudinary.com/dsoluhht8/image/upload/v1765783883/bear_4_mftv3s.jpg",
        ],
      },
      {
        name: " Polo America ",
        price: 29,
        color: "black",
        type: "polo",
        size: "s",
        images: [
          "https://res.cloudinary.com/dsoluhht8/image/upload/v1765783863/den1_qeyiq3.jpg",
          "https://res.cloudinary.com/dsoluhht8/image/upload/v1765783864/%C4%91en2_qhirpd.jpg",
          "https://res.cloudinary.com/dsoluhht8/image/upload/v1765783865/den3_lkitko.jpg",
          "https://res.cloudinary.com/dsoluhht8/image/upload/v1765783863/den5_oiansj.jpg",
          "https://res.cloudinary.com/dsoluhht8/image/upload/v1765783865/den4_mo4frp.jpg",
        ],
      },
      {
        name: " Polo phối viền xanh ",
        price: 32,
        color: "yellow",
        type: "polo",
        size: "xl",
        images: [
          "https://res.cloudinary.com/dsoluhht8/image/upload/v1765783864/soc1_j2r7in.jpg",
          "https://res.cloudinary.com/dsoluhht8/image/upload/v1765783864/soc2_pdncqn.jpg",
          "https://res.cloudinary.com/dsoluhht8/image/upload/v1765783864/soc3_h94mef.jpg",
          "https://res.cloudinary.com/dsoluhht8/image/upload/v1765783865/soc5_ymqdk2.jpg",
          "https://res.cloudinary.com/dsoluhht8/image/upload/v1765783865/soc4_yqdkil.jpg",
        ],
      },
      {
        name: "Áo polo sọc",
        price: 24,
        color: "black",
        type: "polo",
        size: "m",
        images: [
          "https://res.cloudinary.com/dsoluhht8/image/upload/v1765783880/len5_ohx8ia.jpg",
          "https://res.cloudinary.com/dsoluhht8/image/upload/v1765783865/len1_ssyv51.jpg",
          "https://res.cloudinary.com/dsoluhht8/image/upload/v1765783866/len2_tvxzoy.jpg",
          "https://res.cloudinary.com/dsoluhht8/image/upload/v1765783880/len3_wnucip.jpg",
          "https://res.cloudinary.com/dsoluhht8/image/upload/v1765783880/len4_j139zq.jpg",
        ],
      },
      {
        name: "Short jogger",
        price: 26,
        color: ["black", "yellow"],
        type: "short",
        size: "l",
        images: [
          "https://res.cloudinary.com/dsoluhht8/image/upload/v1765783882/tui1_ilzt3h.jpg",
          "https://res.cloudinary.com/dsoluhht8/image/upload/v1765783882/tui2_ivkzll.jpg",
          "https://res.cloudinary.com/dsoluhht8/image/upload/v1765783883/tui3_lehuod.jpg",
          "https://res.cloudinary.com/dsoluhht8/image/upload/v1765783886/tui5_m65amw.jpg",
          "https://res.cloudinary.com/dsoluhht8/image/upload/v1765783884/tui4_ie2wcb.png",
        ],
      },
      {
        name: "Short da bò",
        price: 32,
        color: "blue",
        type: "short",
        size: "m",
        images: [
          "https://res.cloudinary.com/dsoluhht8/image/upload/v1765783939/bo1_xwwp4w.jpg",
          "https://res.cloudinary.com/dsoluhht8/image/upload/v1765784094/bo2_wpynnd.jpg",
          "https://res.cloudinary.com/dsoluhht8/image/upload/v1765784095/bo3_i6nn6x.jpg",
        ],
      },
      {
        name: "Short star",
        price: 28,
        color: "white",
        type: "short",
        size: "m",
        images: [
          "https://res.cloudinary.com/dsoluhht8/image/upload/v1765784095/sao1_rs5729.jpg",
          "https://res.cloudinary.com/dsoluhht8/image/upload/v1765784095/sao2_unyd5d.jpg",
          "https://res.cloudinary.com/dsoluhht8/image/upload/v1765784095/sao3_ibcgwc.jpg",
        ],
      },
      {
        name: "Short hiện đại",
        price: 30,
        color: ["black", "yellow", "blue"],
        type: "short",
        size: "s",
        images: [
          "https://res.cloudinary.com/dsoluhht8/image/upload/v1765784095/ka1_pvxupo.jpg",
          "https://res.cloudinary.com/dsoluhht8/image/upload/v1765784095/ka2_e2azyg.jpg",
          "https://res.cloudinary.com/dsoluhht8/image/upload/v1765784095/k4_lylli4.jpg",
          "https://res.cloudinary.com/dsoluhht8/image/upload/v1765784095/k3_rf6uy8.jpg",
        ],
      },
    ]);

    console.log("✅ Seed clothes thành công");
    process.exit();
  } catch (err) {
    console.error("❌ Seed failed:", err.message);
    process.exit(1);
  }
};
seedClothes();
