window.onload = () => {
  const pattern = [
    100, 30, 100, 30, 100, 200, 200, 30, 200, 30,
    200, 200, 100, 30, 100, 30, 100,
  ];

  window.navigator.vibrate(pattern);
};
