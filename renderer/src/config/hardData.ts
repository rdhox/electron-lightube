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
