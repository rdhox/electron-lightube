export const baseUrl: string = "https://invidio.us";

export const transitionSettings = {
  duration: 150,
  defaultStyle: {
    transition: `left ${150}ms ease-out`,
    position: 'absolute',
    top: '60px',
    left: '-320px',
    width: '300px',
  },
  transitionStyles: {
    entering: { left: '-320px' },
    entered: { left: '5px' },
    exiting: { left: '-320px' },
    exited: { left: '-320px' },
  },
};

export const transitionWatchLater = {
  duration: 150,
  defaultStyle: {
    transition: `right ${150}ms ease-out`,
    position: 'absolute',
    top: '165px',
    right: '-430px',
    width: '420px',
  },
  transitionStyles: {
    entering: { right: '-430px' },
    entered: { right: '5px' },
    exiting: { right: '-430px' },
    exited: { right: '-430px' },
  },
};
