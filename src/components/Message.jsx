import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const Message = ({ message, type = 'default' }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (message) {
      setShow(true);
    }
  }, [message]);

  const getMessageStyle = () => {
    switch (type) {
      case 'milestone':
        return 'bg-gradient-to-r from-yellow-400 to-orange-400 text-white';
      case 'complete':
        return 'bg-gradient-to-r from-green-400 to-emerald-400 text-white';
      case 'break':
        return 'bg-gradient-to-r from-blue-400 to-cyan-400 text-white';
      default:
        return 'bg-white text-gray-800 border-2 border-cat-orange';
    }
  };

  return (
    <AnimatePresence>
      {show && message && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="mb-6"
        >
          <div className={`
            ${getMessageStyle()}
            px-6 py-4 rounded-2xl shadow-lg text-center
            font-medium text-lg
            max-w-md mx-auto
          `}>
            {/* 猫耳朵装饰 */}
            <div className="flex items-center justify-center gap-2">
              <span className="text-2xl">🐱</span>
              <p className="leading-relaxed">{message}</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Message;
