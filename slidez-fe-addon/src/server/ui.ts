export const onOpen = (): void => {
  const menu = SlidesApp.getUi()
    .createMenu('Add-ons')
    .addItem('Demo sidebar', 'openDemoSidebar');

  menu.addToUi();
};

export const openDemoSidebar = (): void => {
  const html = HtmlService.createHtmlOutputFromFile('sidebar-add-on');
  SlidesApp.getUi().showSidebar(html);
};
