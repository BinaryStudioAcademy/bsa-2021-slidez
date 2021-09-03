import {
    InsertSlideRequest,
    InsertSlideRequestSuccess,
} from '../../../slidez-shared/src/event-bus';
import { sendCreateSlideRequest } from './slideCreateRequest';

export const getPresentation = () => {
    return SlidesApp.getActivePresentation();
};

export const getPresentationId = () => {
    return getPresentation().getId();
};

export const insertText = (text: string) => {
    var slide = getPresentation().getSlides()[0];
    slide.insertTextBox(text);
};

export const insertSlide = (
    data: InsertSlideRequest
): InsertSlideRequestSuccess => {
    var selection = getPresentation().getSelection();
    var currentPage = selection.getCurrentPage();
    var insertionIndex =
        getPresentation()
            .getSlides()
            .findIndex(x => x.getObjectId() == currentPage.getObjectId()) + 1;

    sendCreateSlideRequest(
        getPresentationId(),
        data.id,
        insertionIndex,
        data.title
    );

    return { insertedId: data.id };
};
