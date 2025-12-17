import dotenv from "dotenv";
import readline from "readline";
import { fileURLToPath } from "url";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

import connectDB from "../src/config/db.js";
import User from "../src/models/User.js";
import Order from "../src/models/Order.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(question) {
  return new Promise((res) => rl.question(question, res));
}

const argv = process.argv.slice(2);
let email;
let userId;
for (const arg of argv) {
  if (arg.startsWith("--email=")) email = arg.split("=")[1];
  if (arg.startsWith("--userId=")) userId = arg.split("=")[1];
}

if (!email && !userId) {
  console.error(
    "Usage: node delete_cancelled_orders.js --email=you@example.com OR --userId=<id>"
  );
  process.exit(1);
}

const run = async () => {
  try {
    await connectDB();

    let user;
    if (email) {
      user = await User.findOne({ email: email.toLowerCase().trim() });
      if (!user) {
        console.error("Không tìm thấy user với email:", email);
        process.exit(1);
      }
    } else if (userId) {
      user = await User.findById(userId);
      if (!user) {
        console.error("Không tìm thấy user với id:", userId);
        process.exit(1);
      }
    }

    const cancelledOrders = await Order.find({
      user: user._id,
      status: "cancelled",
    }).lean();

    if (!cancelledOrders.length) {
      console.log(
        'Không có đơn hàng nào ở trạng thái "cancelled" cho user này.'
      );
      process.exit(0);
    }

    console.log(
      `Tìm thấy ${cancelledOrders.length} đơn hàng cancelled cho user ${user.email}:`
    );
    cancelledOrders.forEach((o) =>
      console.log(`- ${o._id}  | createdAt: ${o.createdAt}`)
    );

    const answer = await ask(
      "\nBạn có chắc muốn xóa những đơn này vĩnh viễn? (yes/no): "
    );
    if (answer.toLowerCase() !== "yes" && answer.toLowerCase() !== "y") {
      console.log("Hủy bỏ hành động. Không có đơn nào bị xóa.");
      process.exit(0);
    }

    const res = await Order.deleteMany({ user: user._id, status: "cancelled" });
    console.log(`Đã xóa ${res.deletedCount} đơn hàng.`);
    process.exit(0);
  } catch (err) {
    console.error("Lỗi:", err);
    process.exit(1);
  } finally {
    rl.close();
  }
};

run();
