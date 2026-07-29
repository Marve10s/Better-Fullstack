import { continueRender, delayRender, staticFile } from "remotion";

const fontLoadingHandle = delayRender("Loading Better Fullstack fonts");

Promise.all([
  new FontFace("Geist Sans", `url(${staticFile("fonts/Geist-Variable.woff2")})`).load(),
  new FontFace("Geist Mono", `url(${staticFile("fonts/GeistMono-Variable.woff2")})`).load(),
])
  .then((fonts) => {
    for (const font of fonts) document.fonts.add(font);
    continueRender(fontLoadingHandle);
    return undefined;
  })
  .catch((error) => {
    continueRender(fontLoadingHandle);
    throw error;
  });
