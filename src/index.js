import UploadAdapter from '@ckeditor/ckeditor5-adapter-ckfinder/src/uploadadapter';
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment';
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Strikethrough from '@ckeditor/ckeditor5-basic-styles/src/strikethrough';
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline';
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote';
import EasyImage from '@ckeditor/ckeditor5-easy-image/src/easyimage';
import ClassicEditorBase from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import DecoupledEditorBase from '@ckeditor/ckeditor5-editor-decoupled/src/decouplededitor';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import FontBackgroundColor from '@ckeditor/ckeditor5-font/src/fontbackgroundcolor';
import FontColor from '@ckeditor/ckeditor5-font/src/fontcolor';
import FontFamily from '@ckeditor/ckeditor5-font/src/fontfamily';
import FontSize from '@ckeditor/ckeditor5-font/src/fontsize';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import HtmlEmbed from '@ckeditor/ckeditor5-html-embed/src/htmlembed';
import Indent from '@ckeditor/ckeditor5-indent/src/indent';
import Link from '@ckeditor/ckeditor5-link/src/link';
import List from '@ckeditor/ckeditor5-list/src/list';
import ListStyle from '@ckeditor/ckeditor5-list/src/liststyle';
import PageBreak from '@ckeditor/ckeditor5-page-break/src/pagebreak';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import Table from '@ckeditor/ckeditor5-table/src/table';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar';
import TextTransformation from '@ckeditor/ckeditor5-typing/src/texttransformation';
import Base64UploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/base64uploadadapter';
import AutoImage from '@ckeditor/ckeditor5-image/src/autoimage';
import Image from '@ckeditor/ckeditor5-image/src/image';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';
import ImageInsert from '@ckeditor/ckeditor5-image/src/imageinsert';
import ImageResize from '@ckeditor/ckeditor5-image/src/imageresize';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload';

import DynamicField from './plugins/dynamicField';
import IndentBlock from './plugins/indentblock';
import PasteFromOffice from './plugins/pastefromoffice';
import ReactRendering from './plugins/reactRendering';
import { RenderTypes } from './plugins/reactRendering/constants';
import Signature from './plugins/signature';
import { emailEditorColors } from './constants';

class EmailEditor extends ClassicEditorBase {}

class InterfirstEditor extends DecoupledEditorBase {}

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
  image: {
    styles: [
       'full', 
        'side',
        'alignLeft', 
        'alignCenter', 
        'alignRight' 
    ],
    toolbar: ['imageStyle:full', 'imageStyle:side', '|', 'imageStyle:alignLeft', 'imageStyle:alignCenter', 'imageStyle:alignRight'],
},
};

// Plugins to include in the build.
InterfirstEditor.builtinPlugins = [
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
  ImageCaption,
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
      'imageUpload',
      'insertTable',
      'htmlEmbed',
      '|',
      'undo',
      'redo',
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
      'imageUpload',
      '|',
      'undo',
      'redo',
    ],
  },
  fontColor: emailEditorColors,
  fontBackgroundColor: emailEditorColors,
};

export default { EmailEditor, InterfirstEditor };

