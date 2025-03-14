import * as React from "react";
const FileColoredOption = (props) => (
  <svg
    width={17}
    height={17}
    viewBox="0 0 17 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    {...props}
  >
    <rect width={17} height={17} fill="url(#pattern0_3_2050)" />
    <defs>
      <pattern
        id="pattern0_3_2050"
        patternContentUnits="objectBoundingBox"
        width={1}
        height={1}
      >
        <use xlinkHref="#image0_3_2050" transform="scale(0.0078125)" />
      </pattern>
      <image
        id="image0_3_2050"
        width={128}
        height={128}
        preserveAspectRatio="none"
        xlinkHref="data:image/png;base64,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"
      />
    </defs>
  </svg>
);
export default FileColoredOption;
