import { UploadAdapter } from '@ckeditor/ckeditor5-adapter-ckfinder';
import { Alignment } from '@ckeditor/ckeditor5-alignment';
import { Autoformat } from '@ckeditor/ckeditor5-autoformat';
import { BlockQuote } from '@ckeditor/ckeditor5-block-quote';
import { EasyImage } from '@ckeditor/ckeditor5-easy-image';
import { DecoupledEditor } from '@ckeditor/ckeditor5-editor-decoupled';
import { Essentials } from '@ckeditor/ckeditor5-essentials';
import { Heading } from '@ckeditor/ckeditor5-heading';
import { HtmlEmbed } from '@ckeditor/ckeditor5-html-embed';
import { Indent } from '@ckeditor/ckeditor5-indent';
import { Link } from '@ckeditor/ckeditor5-link';
import { List, ListProperties } from '@ckeditor/ckeditor5-list';
import { PageBreak } from '@ckeditor/ckeditor5-page-break';
import { Paragraph } from '@ckeditor/ckeditor5-paragraph';
import { Table, TableToolbar } from '@ckeditor/ckeditor5-table';
import { TextTransformation } from '@ckeditor/ckeditor5-typing';
import { Base64UploadAdapter } from '@ckeditor/ckeditor5-upload';
import { CloudServices } from '@ckeditor/ckeditor5-cloud-services';

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
import PasteFromOffice from './plugins/pastefromoffice';
import ReactRendering from './plugins/reactRendering';
import { RenderTypes } from './plugins/reactRendering/constants';
import Signature from './plugins/signature';
import { commonConfigOptions } from './constants';

class InterfirstEditor extends DecoupledEditor {}

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
  ImageResize,
  ImageStyle,
  ImageToolbar,
  ImageUpload,
  Link,
  List,
  ListProperties,
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
    insert: {
      type: 'inline',
    },
    styles: {
      options: ['alignLeft', 'alignRight'],
    },
    toolbar: ['imageStyle:alignLeft', 'imageStyle:alignRight'],
  },
  table: {
    contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
  },
};

export default InterfirstEditor;
