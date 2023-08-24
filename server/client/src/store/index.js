//think of this as react context

import { proxy } from "valtio";

const state = proxy({
//whatever is defined here can be used in entire application
    intro: true,
    color: '#EFBD48',
    isLogoTexture: true,
    isFullTexture: false,
    logoDecal: './threejs.png',
    fullDecal: './threejs.png',
});

export default state;