export const setDarkTheme = () => {
  document.body.classList.remove('lightTheme');
  document.body.classList.add('darkTheme');
};

export const setLightTheme = () => {
  document.body.classList.remove('darkTheme');
  document.body.classList.add('lightTheme');
};