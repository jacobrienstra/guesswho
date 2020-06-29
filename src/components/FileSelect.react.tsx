import React from "react";

function FileSelect(): JSX.Element {
  const props = { webkitdirectory: "", directory: "" };
  return <input type="file" {...props} />;
}

export default FileSelect;
