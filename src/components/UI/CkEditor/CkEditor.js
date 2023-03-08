import React from 'react';
import dynamic from 'next/dynamic';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
const CKEditor = dynamic(() => import('@ckeditor/ckeditor5-react'), { ssr: false });

const CkEditor = ({ data, onChange }) => (
    <CKEditor
        editor={ClassicEditor}
        data={data}
        onInit={(editor) => {}}
        onChange={onChange}
        onBlur={(event, editor) => {}}
        onFocus={(event, editor) => {}}
    />
);

export default CkEditor;
