export const requestPageAnimation = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.04,
    },
  },
};

export const requestItemAnimation = {
  hidden: {
    opacity: 0,
    y: 8,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
};
