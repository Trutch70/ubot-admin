import React, { useEffect, useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { EditorState, convertToRaw, ContentState } from 'draft-js';

const EditorComponent = ({onChange, initialContent}) => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    useEffect(() => {
        const contentBlock = htmlToDraft(initialContent);
        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
        const state = EditorState.createWithContent(contentState);

        setEditorState(state);
    }, [initialContent]);

    const onEditorStateChange = (newState) => {
        setEditorState(newState);
        onChange(draftToHtml(convertToRaw(editorState.getCurrentContent())));
    }

    return (
        <Editor
            editorState={editorState}
            onEditorStateChange={onEditorStateChange}
            editorStyle={{padding: '1em', maxHeight: "30vh", overflowY: "scroll"}}
        />
    );
}

export default EditorComponent;
