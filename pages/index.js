import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";

import GrapesJS from "grapesjs";
import gjsPresetWebpage from "grapesjs-preset-webpage";
import gjsGoogleMaterialIcons from "grapesjs-google-material-icons";
import "grapesjs/dist/css/grapes.min.css";

import {timerPluginRef} from "./components/timer/consts";
import addTimerPlugin from './components/timer';

import { TemplateDisplay } from "./components/TemplateDisplay";

export default function Index() {
  const [htmlString, setHtmlString] = useState(null);
  const [cssString, setCssString] = useState("");
  const [pluginLoaded, setPluginLoaded] = useState(false);
  const [editor, setEditor] = useState(null);

  useEffect(() => {
    console.log({ htmlString, cssString });
  });

  useEffect(() => {
    if (!pluginLoaded) {
      // Pass the state setters to the timer plugin, so that each time the bell is pressed these gets called
      // and the TemplateDisplay gets updated withthe new values
      addTimerPlugin(setHtmlString, setCssString);
      setPluginLoaded(true);
    } else if (!editor) {
      const e = GrapesJS.init({
        container: `#example-editor`,
        fromElement: true,
        plugins: [gjsPresetWebpage, timerPluginRef, gjsGoogleMaterialIcons],
        pluginsOpts: {
          'gjs-google-material-icons': {}
        },
        storageManager: false,
        pageManager: {
          pages: [
            {
              id: 'my-first-page',
              styles: '.my-page1-el { color: red }',
              component: '<div class="my-page1-el">Page 1</div>',
            },
            {
              id: 'my-second-page',
              styles: '.my-page2-el { color: blue }',
              component: '<div class="my-page2-el">Page 2</div>',
            },
         ]
        },
      });
      console.log({ GrapesJS });
      setEditor(e);
    }
  });

  return (
    <>
      <Container>
        <div id="example-editor" />
        <TemplateDisplay jsxString={htmlString} cssString={cssString} />
      </Container>
    </>
  );
}
