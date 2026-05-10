export const projectPageAnimation = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.04,
    },
  },
};

export const projectItemAnimation = {
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

export const projectProgressAnimation = {
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
