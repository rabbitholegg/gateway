import { AnimatePresence, motion } from 'framer-motion';
import { type HTMLAttributes } from 'react';

export default function AnimatedNumber({
  value,
  className,
}: {
  value: string;
} & HTMLAttributes<HTMLSpanElement>) {
  return (
    <div className="flex items-center relative">
      <AnimatePresence mode="popLayout" initial={false}>
        {value.split('').map((char, index) => (
          <motion.div
            key={`${char}-${index}`}
            initial={{ y: '50%', opacity: 0 }}
            animate={{ y: '0%', scale: 1, opacity: 1 }}
            exit={{ y: '-50%', opacity: 0 }}
            layout
            className={className}
            transition={{ type: 'spring', stiffness: 400, damping: 35 }}
          >
            {char}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
