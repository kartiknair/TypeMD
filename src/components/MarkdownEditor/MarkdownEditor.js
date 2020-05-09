import React, { useState } from "react";
import RMDE from "rich-markdown-editor";
import { db } from "lib/firebase";
import { Link } from "@reach/router";

const MarkdownEditor = ({ name, userId, fileId, initialContent, refresh }) => {
  const [value, setValue] = useState(initialContent);

  let saveChanges = () => {
    db.collection("users").doc(userId).collection("files").doc(fileId).update({
      content: value,
    });
    refresh();
  };

  return (
    <div>
      <header className="editor-header">
        <Link className="back-button" to={`/user/${userId}`}>
          &lt;
        </Link>
        <h3>{name}</h3>
        <button
          disabled={initialContent === value}
          onClick={saveChanges}
          className="save-button"
        >
          Save Changes
        </button>
      </header>
      <div className="editor">
        <RMDE
          defaultValue={initialContent}
          onChange={(getValue) => {
            setValue(getValue());
          }}
          onSave={() => {
            console.log("hit save");
            return true;
          }}
        />
      </div>
    </div>
  );
};

export default MarkdownEditor;
