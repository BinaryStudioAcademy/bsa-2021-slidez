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
    Slides.Presentations!.batchUpdate(
        {
            requests: [
                {
                    createSlide: {
                        objectId: data.id,
                        insertionIndex: 1,
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

    return { insertedId: data.id };
};
