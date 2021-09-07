import * as publicUiFunctions from './ui';
import * as publicSlidesFunctions from './slides';

// Expose public functions by attaching to `global`
(global as any).onOpen = publicUiFunctions.onOpen;
(global as any).insertText = publicSlidesFunctions.insertText;
(global as any).openSidebar = publicUiFunctions.openSidebar;
(global as any).insertSlide = publicSlidesFunctions.insertSlide;
(global as any).getPresentationId = publicSlidesFunctions.getPresentationId;
(global as any).getPresentationName = publicSlidesFunctions.getPresentationName;
