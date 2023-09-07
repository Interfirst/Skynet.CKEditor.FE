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

import DynamicField from './plugins/dynamicField';
import IndentBlock from './plugins/indentblock';
import ReactRendering from './plugins/reactRendering';
import { RenderTypes } from './plugins/reactRendering/constants';
import { commonConfigOptions, commonEmailConfigOptions } from './constants';

class EmailSnippetEditor extends ClassicEditor {}

EmailSnippetEditor.builtinPlugins = [
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
  DynamicField,
  ReactRendering,
];

// Editor configuration with dynamic fields
EmailSnippetEditor.defaultConfig = {
  ...commonConfigOptions,
  ...commonEmailConfigOptions,
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
      RenderTypes.DYNAMIC_FIELD,
      'link',
      'blockQuote',
      'uploadImage',
      '|',
      'undo',
      'redo',
    ],
  },
};

export default EmailSnippetEditor