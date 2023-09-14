import { Alignment } from '@ckeditor/ckeditor5-alignment';
import { Autoformat } from '@ckeditor/ckeditor5-autoformat';
import { BlockQuote } from '@ckeditor/ckeditor5-block-quote';
import { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic';
import { Essentials } from '@ckeditor/ckeditor5-essentials';
import { Heading } from '@ckeditor/ckeditor5-heading';
import { Indent } from '@ckeditor/ckeditor5-indent';
import { Link } from '@ckeditor/ckeditor5-link';
import { List } from '@ckeditor/ckeditor5-list';
import { Paragraph } from '@ckeditor/ckeditor5-paragraph';
import { TextTransformation } from '@ckeditor/ckeditor5-typing';
import { Base64UploadAdapter } from '@ckeditor/ckeditor5-upload';
import { GeneralHtmlSupport } from '@ckeditor/ckeditor5-html-support'


import { Bold, Italic, Strikethrough, Underline } from '@ckeditor/ckeditor5-basic-styles';
import { FontBackgroundColor, FontColor, FontFamily, FontSize } from '@ckeditor/ckeditor5-font';
import {
  AutoImage,
  Image,
  ImageInsert,
  ImageStyle,
  ImageToolbar,
  ImageUpload,
  ImageResize,
} from '@ckeditor/ckeditor5-image'; 

import IndentBlock from './plugins/indentblock';
import { commonConfigOptions, commonEmailConfigOptions } from './constants';

class EmailBodyEditor extends ClassicEditor {}

EmailBodyEditor.builtinPlugins = [
  Alignment,
  Autoformat,
  BlockQuote,
  Bold,
  Essentials,
  FontBackgroundColor,
  FontColor,
  FontFamily,
  FontSize,
  Heading,
  Base64UploadAdapter,
  AutoImage,
  Image,
  ImageInsert,
  ImageResize,
  ImageStyle,
  ImageToolbar,
  ImageUpload,
  Indent,
  IndentBlock,
  Italic,
  Link,
  List,
  Paragraph,
  Strikethrough,
  TextTransformation,
  Underline,
  GeneralHtmlSupport,
];


// Email body editor configuration without dynamic fields
EmailBodyEditor.defaultConfig = {
  ...commonConfigOptions,
  ...commonEmailConfigOptions,
  htmlSupport: {
    allow: [
        {
            name: 'div',
            styles: true,
            classes: true,
        },
        {
            name: 'span',
            styles: true,
            classes: true,
        },
      ],
    },
  toolbar: {
    items: [
      'heading',
      '|',
      'fontFamily',
      'fontSize',
      'fontColor',
      'fontBackgroundColor',
      '|',
      'bold',
      'italic',
      'underline',
      'strikethrough',
      '|',
      'alignment',
      '|',
      'numberedList',
      'bulletedList',
      '|',
      'indent',
      'outdent',
      '|',
      'link',
      'blockQuote',
      'uploadImage',
      '|',
      'undo',
      'redo',
    ],
  },
};

export default EmailBodyEditor