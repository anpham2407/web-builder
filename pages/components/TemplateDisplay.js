import React from "react";
import Timer from "react-compound-timer";
import { Style } from "react-style-tag";
import JsxParser from "react-jsx-parser";

import styled from "styled-components";

export const Prompt = styled.div`
  font-size: 1.5em;
`;
export const LiveTemplate = styled.div`
    margin: 20px;
    padding: 20px;
    border: ${(props) => (!props.jsxString ? "dashed black" : "none")};
    };
`;

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
        components={{ Timer }}
        jsx={jsxString}
        bindings={{
          // This is called from the formatValue attribute of the Timer coming in htmlString
          formatValue: (value) => `${value < 10 ? `0${value}` : value}`
        }}
      />
    </LiveTemplate>
  );
}
