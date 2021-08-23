export const onOpen = (): void => {
    const menu = SlidesApp.getUi()
        .createAddonMenu()
        .addItem('Open the sidebar', 'openSidebar');

    menu.addToUi();
};

export const openSidebar = (): void => {
    const html =
        HtmlService.createHtmlOutputFromFile('sidebar-add-on').setTitle(
            'Slidez'
        );
    SlidesApp.getUi().showSidebar(html);
};
