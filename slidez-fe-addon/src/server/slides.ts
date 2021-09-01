import {
    InsertSlideRequest,
    InsertSlideRequestSuccess,
} from '../../../slidez-shared/src/event-bus';

export const getPresentationId = () => {
    return SlidesApp.getActivePresentation().getId();
};

export const insertText = (text: string) => {
    const slide = SlidesApp.getActivePresentation().getSlides()[0];
    slide.insertTextBox(text);
};

export const insertSlide = (
    data: InsertSlideRequest
): InsertSlideRequestSuccess => {
    const textboxId = `title_${Date.now().toString()}`;
    const pt350 = { magnitude: 350, unit: 'pt' };
    var currentPage = SlidesApp.getActivePresentation().getSelection().getCurrentPage().asSlide();
    var indexCurrentPage = SlidesApp.getActivePresentation().getSlides().findIndex(x => x.getObjectId() == currentPage.getObjectId());
    var nextSlide = indexCurrentPage + 1;
    Slides.Presentations!.batchUpdate(
        {
            requests: [
                {
                    createSlide: {
                        objectId: data.id,
                        insertionIndex: nextSlide,
                    },
                },
                {
                    createShape: {
                        objectId: textboxId,
                        shapeType: 'TEXT_BOX',
                        elementProperties: {
                            pageObjectId: data.id,
                            size: { height: pt350, width: pt350 },
                            transform: {
                                unit: 'pt',
                                scaleX: 1,
                                scaleY: 1,
                                translateX: 10,
                                translateY: 30,
                            },
                        },
                    },
                },
                {
                    insertText: {
                        objectId: textboxId,
                        text: data.title,
                    },
                },
            ],
        },
        SlidesApp.getActivePresentation().getId()
    );
    // example to focus another slide
    // SlidesApp.getActivePresentation().getSlides()[1].selectAsCurrentPage()
    return { insertedId: data.id };
};
