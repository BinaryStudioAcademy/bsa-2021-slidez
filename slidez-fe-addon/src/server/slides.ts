export const insertText = (text: string) => {
  const slide = SlidesApp.getActivePresentation().getSlides()[0];
  slide.insertTextBox(text);
};
