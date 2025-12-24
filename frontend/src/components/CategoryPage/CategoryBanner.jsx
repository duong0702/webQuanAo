import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { CATEGORY_CONFIG } from "../../constants/categoryConfig";
import { useCategoryContext } from "../../lib/useCategoryContext";

const CategoryBanner = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { config, showSubNav, currentType } = useCategoryContext();

  if (!config) return null;

  // Nếu đang ở type cụ thể với group, lấy config của type để hiển thị
  const params = new URLSearchParams(location.search);
  const type = params.get("type");
  const group = params.get("group");

  const displayConfig =
    type && group && CATEGORY_CONFIG[type] ? CATEGORY_CONFIG[type] : config;

  return (
    <>
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full h-[380px] rounded-xl overflow-hidden mb-10"
      >
        <img
          src={displayConfig.bannerImage}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
      </motion.section>

      {showSubNav && config.children && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-12">
          {config.children.map((key) => {
            const item = CATEGORY_CONFIG[key];
            return (
              <div
                key={key}
                onClick={() => {
                  navigate(
                    `/?type=${key}&group=${
                      group || (config.key === "shirtGroup" ? "shirt" : "pant")
                    }`
                  );
                }}
                className="cursor-pointer text-center group"
              >
                <div className="bg-gray-100 rounded-xl p-4 mb-2">
                  <img
                    src={item.thumb}
                    alt={item.title}
                    className="h-24 mx-auto group-hover:scale-110 transition"
                  />
                </div>
                <div className="font-semibold">{item.title}</div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default CategoryBanner;
