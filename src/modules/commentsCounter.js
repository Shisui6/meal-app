const counter = () => {
  const container = document.querySelector('.container');
  return container ? container.childElementCount : 0;
};
export default counter;