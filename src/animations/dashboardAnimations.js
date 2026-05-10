export const containerAnimation = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export const cardAnimation = {
  hidden: {
    opacity: 0,
    y: 16,
    scale: 0.987,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.28,
      ease: "easeOut",
    },
  },
};

export const progressAnimation = {
  initial: {
    width: 0,
  },
  animate: (value) => ({
    width: value,
    transition: {
      duration: 0.65,
      delay: 0.2,
      ease: "easeOut",
    },
  }),
};
