import {
    InsertSlideRequest,
    InsertSlideRequestSuccess,
    DeleteSlideRequest,
    DeleteSlideRequestSuccess,
    UpdateSlideRequest,
    UpdateSlideRequestSuccess,
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

export const deleteSlide = (
    data: DeleteSlideRequest
): DeleteSlideRequestSuccess => {
    var slide = getPresentation().getSlideById(data.id)
    try {
        slide.remove()
        return { wasDeleted: true }
    } catch (error) {
        return { wasDeleted: false }
    }
}

export const updateSlide = (
    data: UpdateSlideRequest
): UpdateSlideRequestSuccess => {
    var slide = getPresentation().getSlideById(data.id)
    try {
        var titleShape = slide.getShapes().filter(shape => shape.getObjectId().startsWith('title_'))[0]
        titleShape.getText().setText('Poll: ' + data.title)
        return { wasUpdated: true }
    } catch (error) {
        return { wasUpdated: false }
    }
}
