import { UploadAdapter } from '@ckeditor/ckeditor5-adapter-ckfinder';
import { Alignment } from '@ckeditor/ckeditor5-alignment';
import { Autoformat } from '@ckeditor/ckeditor5-autoformat';
import { BlockQuote } from '@ckeditor/ckeditor5-block-quote';
import { EasyImage } from '@ckeditor/ckeditor5-easy-image';
import { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic';
import { DecoupledEditor } from '@ckeditor/ckeditor5-editor-decoupled';
import { Essentials } from '@ckeditor/ckeditor5-essentials';
import { Heading } from '@ckeditor/ckeditor5-heading';
import { HtmlEmbed } from '@ckeditor/ckeditor5-html-embed';
import { Indent } from '@ckeditor/ckeditor5-indent';
import { Link } from '@ckeditor/ckeditor5-link';
import { List, ListStyle } from '@ckeditor/ckeditor5-list';
import { PageBreak } from '@ckeditor/ckeditor5-page-break';
import { Paragraph } from '@ckeditor/ckeditor5-paragraph';
import { Table, TableToolbar } from '@ckeditor/ckeditor5-table';
import { TextTransformation } from '@ckeditor/ckeditor5-typing';
import { Base64UploadAdapter } from '@ckeditor/ckeditor5-upload';
import { CloudServices } from '@ckeditor/ckeditor5-cloud-services';

import { Bold, Italic, Strikethrough, Underline } from '@ckeditor/ckeditor5-basic-styles';
import { FontBackgroundColor, FontColor, FontFamily, FontSize } from '@ckeditor/ckeditor5-font';
import { AutoImage, Image, ImageInsert, ImageStyle, ImageToolbar, ImageUpload } from '@ckeditor/ckeditor5-image'; 

import DynamicField from './plugins/dynamicField';
import IndentBlock from './plugins/indentblock';
import PasteFromOffice from './plugins/pastefromoffice';
import ReactRendering from './plugins/reactRendering';
import { RenderTypes } from './plugins/reactRendering/constants';
import Signature from './plugins/signature';
import { emailEditorColors } from './constants';

class EmailEditor extends ClassicEditor {}

class InterfirstEditor extends DecoupledEditor {}

const commonConfigOptions = {
  fontFamily: {
    options: [
      'default',
      'Arial, Helvetica, sans-serif',
      'Courier New, Courier, monospace',
      'Georgia, serif',
      'Lucida Sans Unicode, Lucida Grande, sans-serif',
      'Tahoma, Geneva, sans-serif',
      'Times New Roman, Times, serif',
      'Trebuchet MS, Helvetica, sans-serif',
      'Verdana, Geneva, sans-serif',
    ],
    supportAllValues: true,
  },
  fontSize: {
    options: [9, 10, 11, 12, 13, 'default', 15, 16, 17, 18, 19, 20, 21],
    supportAllValues: true,
  },
  // This value must be kept in sync with the language defined in webpack.config.js.
  language: 'en',
  indentBlock: {
    offset: 16,
    unit: 'px',
  },
};

// Plugins to include in the build.
InterfirstEditor.builtinPlugins = [
  CloudServices,
  Essentials,
  Alignment,
  FontSize,
  FontFamily,
  FontColor,
  FontBackgroundColor,
  UploadAdapter,
  Autoformat,
  Bold,
  Italic,
  Strikethrough,
  Underline,
  BlockQuote,
  EasyImage,
  Heading,
  Indent,
  IndentBlock,
  Base64UploadAdapter,
  AutoImage,
  Image,
  ImageInsert,
  ImageStyle,
  ImageToolbar,
  ImageUpload,
  Link,
  List,
  ListStyle,
  Paragraph,
  Table,
  TableToolbar,
  TextTransformation,
  HtmlEmbed,
  Signature,
  PasteFromOffice,
  PageBreak,
  DynamicField,
  ReactRendering,
];

// Editor configuration.
InterfirstEditor.defaultConfig = {
  ...commonConfigOptions,
  toolbar: {
    items: [
      'undo',
      'redo',
      '|',
      'heading',
      '|',
      'fontfamily',
      'fontsize',
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
      RenderTypes.DYNAMIC_FIELD,
      RenderTypes.SIGNATURE,
      'pageBreak',
      '|',
      'indent',
      'outdent',
      '|',
      'link',
      'blockquote',
      'uploadImage',
      'insertTable',
      'htmlEmbed',
    ],
  },
  image: {
    styles: {
      options: [
        'inline', 
        'block', 
        'side',
        'alignLeft', 
        'alignCenter', 
        'alignRight',
      ],
    },
    toolbar: [
      'imageStyle:inline',
      'imageStyle:block',
      'imageStyle:side',
      '|', 
      'imageStyle:alignLeft', 
      'imageStyle:alignCenter', 
      'imageStyle:alignRight',
    ],
  },
  table: {
    contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
  },
};

EmailEditor.builtinPlugins = [
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
  Image,
  Indent,
  IndentBlock,
  Italic,
  Link,
  List,
  Paragraph,
  Strikethrough,
  TextTransformation,
  Underline,
];

// Editor configuration.
EmailEditor.defaultConfig = {
  ...commonConfigOptions,
  link: {
    defaultProtocol: 'https://',
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
      '|',
      'undo',
      'redo',
    ],
  },
  fontColor: emailEditorColors,
  fontBackgroundColor: emailEditorColors,
};

export default { EmailEditor, InterfirstEditor };

