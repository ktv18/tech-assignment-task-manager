export const renderIf = (condition) => (componentToRender) => {
  return condition ? componentToRender : null;
};
