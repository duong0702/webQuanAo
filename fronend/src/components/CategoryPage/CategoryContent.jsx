import React from "react";
import { motion } from "framer-motion";

const CategoryContent = ({ config }) => {
  if (!config) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mt-20 bg-white rounded-2xl shadow-lg p-10"
    >
      {/* TITLE */}
      <h2 className="text-3xl font-bold text-gray-900 mb-6">{config.title}</h2>

      {/* SHORT DESCRIPTION */}
      {config.description && (
        <p className="text-gray-700 text-lg leading-relaxed mb-8">
          {config.description}
        </p>
      )}

      {/* LONG CONTENT */}
      {Array.isArray(config.longDescription) && (
        <div className="space-y-5 text-gray-700 leading-relaxed text-base">
          {config.longDescription.map((text, index) => (
            <p key={index}>{text}</p>
          ))}
        </div>
      )}

      {/* CONTENT IMAGE */}
      {config.contentImage && (
        <div className="mt-10 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden">
          <img
            src={config.contentImage}
            alt={config.title}
            className="
        w-full 
        h-[480px] 
        object-contain
        transition-transform 
        duration-700
      "
          />
        </div>
      )}
    </motion.section>
  );
};

export default CategoryContent;
