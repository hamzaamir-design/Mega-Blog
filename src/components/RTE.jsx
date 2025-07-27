import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';

const RTE = ({ name, control, defaultValue = '' }) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { onChange, value } }) => (
        <Editor
          apiKey="h21sq748chudkp9xhpihdi4secd5wpa8fkfr5sbmh898ugch"
          value={value}
          init={{
            height: 400,
            menubar: false,
            plugins:
              'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
            toolbar:
              'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
            branding: false,
          }}
          onEditorChange={onChange}
        />
      )}
    />
  );
};

export default RTE;
