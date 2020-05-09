import React from "react";
import useSWR, { mutate } from "swr";
import { db } from "lib/firebase";
import { MarkdownEditor } from "components";

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
  const { data: file, error } = useSWR([userId, fileId], getFile);

  if (error) return <p>We had an issue while getting the data</p>;
  else if (!file) return <p>Loading...</p>;
  else {
    return (
      <MarkdownEditor
        name={file.name}
        userId={userId}
        fileId={fileId}
        initialContent={file.content}
        refresh={() => mutate([userId, fileId])}
      />
    );
  }
};

export default Editor;
