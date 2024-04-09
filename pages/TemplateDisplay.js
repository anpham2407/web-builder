import React from "react";
import { Style } from "react-style-tag";
import JsxParser from "react-jsx-parser";
import { LiveTemplate, Prompt } from "./index";

export function TemplateDisplay({ jsxString, cssString }) {
  if (!jsxString) {
    return (
      <LiveTemplate jsxString={jsxString}>
        <Prompt>
          Press the <span className="fa fa-bell"></span> bell icon in the
          editor's toolbar to copy the template HTML/JSX here to have a live
          version of it!
        </Prompt>
      </LiveTemplate>
    );
  }
  return (
    <LiveTemplate jsxString={jsxString}>
      <Style>{cssString}</Style>
      <JsxParser
        // components={{ Timer }}
        jsx={jsxString}
        bindings={{
          // This is called from the formatValue attribute of the Timer coming in htmlString
          formatValue: (value) => `${value < 10 ? `0${value}` : value}`
        }}
      />
    </LiveTemplate>
  );
}
