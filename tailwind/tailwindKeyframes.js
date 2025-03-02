module.exports = {
  // carousel slides
  cycle: {
    '0%': {
      top: '0px',
    },
    '4%': {
      top: '0px',
    },
    '16%': {
      top: '0px',
      opacity: 1,
      'z-index': 0,
    },
    '20%': {
      top: '325px',
      opacity: 0,
      'z-index': 0,
    },
    '21%': {
      top: '-325px',
      opacity: 0,
      'z-index': -1,
    },
    '92%': {
      top: '-325px',
      opacity: 0,
      'z-index': 0,
    },
    '96%': {
      top: '-325px',
      opacity: 0,
    },
    '100%': {
      top: '0px',
      opacity: 1,
    },
  },
  cycletwo: {
    '0%': {
      top: '-325px',
      opacity: 0,
    },
    '16%': {
      top: '-325px',
      opacity: 0,
    },
    '20%': {
      top: '0px',
      opacity: 1,
    },
    '24%': {
      top: '0px',
      opacity: 1,
    },
    '36%': {
      top: '0px',
      opacity: 1,
      'z-index': 0,
    },
    '40%': {
      top: '325px',
      opacity: 0,
      'z-index': 0,
    },
    '41%': {
      top: '-325px',
      opacity: 0,
      'z-index': -1,
    },
    '100%': {
      top: '-325px',
      opacity: 0,
      'z-index': -1,
    },
  },
  cyclethree: {
    '0%': {
      top: '-325px',
      opacity: 0,
    },
    '36%': {
      top: '-325px',
      opacity: 0,
    },
    '40%': {
      top: '0px',
      opacity: 1,
    },
    '44%': {
      top: '0px',
      opacity: 1,
    },
    '56%': {
      top: '0px',
      opacity: 1,
    },
    '60%': {
      top: '325px',
      opacity: 0,
      'z-index': 0,
    },
    '61%': {
      top: '-325px',
      opacity: 0,
      'z-index': -1,
    },
    '100%': {
      top: '-325px',
      opacity: 0,
      'z-index': -1,
    },
  },
  cyclefour: {
    '0%': {
      top: '-325px',
      opacity: 0,
    },
    '56%': {
      top: '-325px',
      opacity: 0,
    },
    '60%': {
      top: '0px',
      opacity: 1,
    },
    '64%': {
      top: '0px',
      opacity: 1,
    },
    '76%': {
      top: '0px',
      opacity: 1,
      'z-index': 0,
    },
    '80%': {
      top: '325px',
      opacity: 0,
      'z-index': 0,
    },
    '81%': {
      top: '-325px',
      opacity: 0,
      'z-index': -1,
    },
    '100%': {
      top: '-325px',
      opacity: 0,
      'z-index': -1,
    },
  },
  cyclefive: {
    '0%': {
      top: '-325px',
      opacity: 0,
    },
    '76%': {
      top: '-325px',
      opacity: 0,
    },
    '80%': {
      top: '0px',
      opacity: 1,
    },
    '84%': {
      top: '0px',
      opacity: 1,
    },
    '96%': {
      top: '0px',
      opacity: 1,
      'z-index': 0,
    },
    '100%': {
      top: '325px',
      opacity: 0,
      'z-index': 0,
    },
  },
  // carousel animation-bar
  fullexpand: {
    '0%, 20%, 40%, 60%, 80%, 100%': {
      width: '0%',
      opacity: 0,
    },
    '4%, 24%, 44%, 64%, 84%': {
      width: '0%',
      opacity: 0.3,
    },
    '16%, 36%, 56%, 76%, 96%': {
      width: '100%',
      opacity: 0.7,
    },
    '17%, 37%, 57%, 77%, 97%': {
      width: '100%',
      opacity: 0.3,
    },
    '18%, 38%, 58%, 78%, 98%': {
      width: '100%',
      opacity: 0,
    },
  },
  // others
  wiggle: {
    '0%, 100%': { transform: 'rotate(-3deg)' },
    '50%': { transform: 'rotate(3deg)' },
  },
  expanse: {
    '0%': {
      transform: 'scale(0.9)',
    },
    '70%': {
      transform: 'scale(1)',
      'box-shadow': '0 0 0 35px rgba(67, 65, 144, 0)',
    },
    '100%': {
      transform: 'scale(0.9)',
      'box-shadow': '0 0 0 0 rgba(67, 65, 144, 0)',
    },
  },
  // navbar
  moveNavbarDown: {
    '0%': {
      transform: 'translateY(-5rem)',
    },

    '100%': {
      transform: 'translateY(0rem)',
    },
  },
};
