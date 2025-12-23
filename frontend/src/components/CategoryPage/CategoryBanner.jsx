import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { CATEGORY_CONFIG } from "../../constants/categoryConfig";
import { useCategoryContext } from "../../lib/useCategoryContext";

const CategoryBanner = () => {
  const navigate = useNavigate();
  const { config, showSubNav } = useCategoryContext();

  if (!config) return null;

  return (
    <>
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full h-[380px] rounded-xl overflow-hidden mb-10"
      >
        <img
          src={config.bannerImage}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        {/* 
        <div className="relative z-10 h-full flex flex-col justify-center px-12">
          <h1 className="text-5xl font-bold text-white mb-4">{config.title}</h1>
          {config.subtitle && (
            <p className="text-xl text-indigo-300">{config.subtitle}</p>
          )}
        </div> */}
      </motion.section>

      {showSubNav && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-12">
          {config.children.map((key) => {
            const item = CATEGORY_CONFIG[key];
            return (
              <div
                key={key}
                onClick={() =>
                  navigate(
                    `/?type=${key}&group=${
                      config.key === "shirtGroup" ? "shirt" : "pant"
                    }`
                  )
                }
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
