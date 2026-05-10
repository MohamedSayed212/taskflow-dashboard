export const taskPageAnimation = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.04,
    },
  },
};

export const taskItemAnimation = {
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
