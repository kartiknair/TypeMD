import React, { useState } from "react";
import useSWR, { mutate } from "swr";
import { db } from "lib/firebase";
import { Link } from "@reach/router";
import MarkdownEditor from "rich-markdown-editor";

import "./Editor.css";

const getFile = async (userId, fileId) => {
  const doc = await db
    .collection("users")
    .doc(userId)
    .collection("files")
    .doc(fileId)
    .get();

  return doc.data();
};

const Editor = ({ userId, fileId }) => {
  const [value, setValue] = useState("");

  const { data: file, error } = useSWR([userId, fileId], getFile, {
    onSuccess: (data) => setValue(data.content),
  });

  const saveChanges = () => {
    db.collection("users").doc(userId).collection("files").doc(fileId).update({
      content: value,
    });
    mutate([userId, fileId]);
  };

  if (error) return <p>We had an issue while getting the data</p>;
  else if (!file) return <p>Loading...</p>;
  else {
    return (
      <div>
        <header className="editor-header">
          <Link className="back-button" to={`/user/${userId}`}>
            &lt;
          </Link>
          <h3>{file.name}</h3>
          <button
            disabled={file.content === value}
            onClick={saveChanges}
            className="save-button"
          >
            Save Changes
          </button>
        </header>
        <div className="editor">
          <MarkdownEditor
            defaultValue={value}
            onChange={(getValue) => {
              setValue(getValue());
            }}
          />
        </div>
      </div>
    );
  }
};

export default Editor;
