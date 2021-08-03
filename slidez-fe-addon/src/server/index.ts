import * as publicUiFunctions from './ui';
import * as publicSlidesFunctions from './slides';

// Expose public functions by attaching to `global`
(global as any).onOpen = publicUiFunctions.onOpen;
(global as any).insertText = publicSlidesFunctions.insertText;
(global as any).openDemoSidebar = publicUiFunctions.openDemoSidebar;
