module.exports = {
  // general
  '.break-inside-avoid': {
    '-webkit-break-inside': 'avoid',
    '-moz-break-inside': 'avoid',
    'break-inside': 'avoid',
  },
  // carousel
  '.slides *': {
    'user-select': 'none',
    '-ms-user-select': 'none',
    '-moz-user-select': 'none',
    '-khtml-user-select': 'none',
    '-webkit-user-select': 'none',
    '-webkit-touch-callout': 'none',
  },
  '.slide-image:hover + .carousel-controls label': {
    opacity: 0.5,
  },
  '.carousel-controls label:hover': {
    opacity: 1,
  },
  'input:checked + .slide-container .slide-image': {
    opacity: 1,
    transform: 'scale(1)',
    transition: 'opacity 1s ease-in-out',
  },
  'input#img-1:checked ~ .carousel-dots label#img-dot-1': {
    opacity: 1,
  },
  'input#img-2:checked ~ .carousel-dots label#img-dot-2': {
    opacity: 1,
  },
  'input#img-3:checked ~ .carousel-dots label#img-dot-3': {
    opacity: 1,
  },
  'input:checked + .slide-container .carousel-controls label': {
    display: 'block',
  },
  '.font-0': {
    'font-size': 0,
  },
  // animejs slider
  '.absolute-centerX': {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translateX(-50%, -50%)',
  },
  '.absolute-center': {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  '.slider__arrow::before': {
    content: "''",
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: 'auto',
    width: '1em',
    height: '1em',
    'border-style': 'solid',
    'border-width': '4px 0 0 4px',
  },
  '.slider__arrow_prev::before': {
    transform: 'rotate(-45deg)',
  },
  '.slider__arrow_next::before': {
    transform: 'rotate(135deg)',
  },
  '.nav-control::before': {
    content: "''",
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: 'auto',
    width: '0.5em',
    height: '0.5em',
    'border-radius': '50%',
    background: 'currentColor',
  },
  '.slider-list::before': {
    content: "''",
    display: 'block',
    'padding-top': 'calc(9 / 16 * 100%)',
  },
  '.slider-list__item': {
    transform: 'translateX(100%)',
  },
  '.slider-list__item_active': {
    transform: 'translateX(0)',
  },
  // dropdown
  // '.dd-input + .dd-menu': {
  //   display: 'none',
  // },
  // '.dd-input:checked + .dd-menu': {
  //   display: 'block',
  // },
};
