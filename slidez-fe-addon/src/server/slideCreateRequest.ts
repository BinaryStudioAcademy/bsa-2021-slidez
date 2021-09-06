type sizeData = {
    height: number;
    width: number;
};

type translateData = {
    X: number;
    Y: number;
};

const createSlide = (objectId: string, insertionIndex: number) => {
    return {
        createSlide: {
            objectId,
            insertionIndex,
        },
    };
};

const createShape = (
    shapeId: string,
    objectId: string,
    sizeData: sizeData,
    translateData: translateData
) => {
    return {
        createShape: {
            objectId: shapeId,
            shapeType: 'TEXT_BOX',
            elementProperties: {
                pageObjectId: objectId,
                size: {
                    height: { magnitude: sizeData.height, unit: 'PT' },
                    width: { magnitude: sizeData.width, unit: 'PT' },
                },
                transform: {
                    scaleX: 1,
                    scaleY: 1,
                    translateX: translateData.X,
                    translateY: translateData.Y,
                    unit: 'PT',
                },
            },
        },
    };
};

const createTitleShape = (textboxId: string, objectId: string) => {
    return createShape(
        textboxId,
        objectId,
        { height: 150, width: 450 },
        { X: 75, Y: 100 }
    );
};

const createInfoShape = (infoId: string, objectId: string) => {
    return createShape(
        infoId,
        objectId,
        { height: 25, width: 300 },
        { X: 150, Y: 325 }
    );
};

const centerShapeText = (shapeId: string) => {
    return {
        updateShapeProperties: {
            objectId: shapeId,
            shapeProperties: {
                contentAlignment: 'MIDDLE',
            },
            fields: 'contentAlignment',
        },
    };
};

const insertText = (shapeId: string, text: string) => {
    return {
        insertText: {
            objectId: shapeId,
            text: text,
        },
    };
};

const createTitle = (textboxId: string, title: string) => {
    return insertText(textboxId, title);
};

const createInfo = (infoId: string) => {
    return insertText(infoId, 'Start present mode to enable this slide');
};

const styleShapeText = (shapeId: string, fontSize: number) => {
    return {
        updateTextStyle: {
            objectId: shapeId,
            textRange: {
                type: 'ALL',
            },
            style: {
                fontFamily: 'Rubik',
                fontSize: {
                    magnitude: fontSize,
                    unit: 'PT',
                },
            },
            fields: 'fontFamily,fontSize',
        },
    };
};

const styleTitle = (shapeId: string) => {
    return styleShapeText(shapeId, 36);
};

const styleInfo = (shapeId: string) => {
    return styleShapeText(shapeId, 14);
};

const createImage = (
    objectId: string,
    imgUrl: string,
    sizeData: sizeData,
    translateData: translateData
) => {
    return {
        createImage: {
            url: imgUrl,
            elementProperties: {
                pageObjectId: objectId,
                size: {
                    height: { magnitude: sizeData.height, unit: 'PT' },
                    width: { magnitude: sizeData.width, unit: 'PT' },
                },
                transform: {
                    scaleX: 1,
                    scaleY: 1,
                    translateX: translateData.X,
                    translateY: translateData.Y,
                    unit: 'PT',
                },
            },
        },
    };
};

const createLogo = (objectId: string) => {
    return createImage(
        objectId,
        'https://dbn5hoh39c7l.cloudfront.net/assets/interactive-wrapper-logo.png',
        { height: 125, width: 125 },
        { X: 550, Y: 25 }
    );
};

const createIcon = (objectId: string) => {
    return createImage(
        objectId,
        'https://dbn5hoh39c7l.cloudfront.net/assets/qr-code.png',
        { height: 125, width: 125 },
        { X: 550, Y: 240 }
    );
};

export const sendCreateSlideRequest = (
    presentationId: string,
    objectId: string,
    insertionIndex: number,
    title: string
) => {
    const textboxId = `title_${Date.now().toString()}`;
    const infoId = `info_${Date.now().toString()}`;

    Slides.Presentations!.batchUpdate(
        {
            requests: [
                createSlide(objectId, insertionIndex),
                createTitleShape(textboxId, objectId),
                createTitle(textboxId, title),
                centerShapeText(textboxId),
                styleTitle(textboxId),
                createInfoShape(infoId, objectId),
                createInfo(infoId),
                centerShapeText(infoId),
                styleInfo(infoId),
                createLogo(objectId),
                createIcon(objectId),
            ],
        },
        presentationId
    );
};
