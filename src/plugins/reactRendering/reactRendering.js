import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import { toWidget } from '@ckeditor/ckeditor5-widget/src/utils';
import Widget from '@ckeditor/ckeditor5-widget/src/widget';
import camelCase from 'lodash/camelCase';
import get from 'lodash/get';
import kebabCase from 'lodash/kebabCase';

import {
  allowAttributes,
  ConversionTypes,
  dataDynamicStyle,
  isNewItem as isNewItemAttr,
  parsableAttributes,
  REACT_RENDERING_MODEL,
  RenderCommandsTypes,
  RenderTypeLabels,
} from './constants';
import DeleteCommand from './deleteCommand';
import InsertCommand from './insertCommand';
import { getStringFromStyleObject } from './reactRendering.utils';

export default class ReactRendering extends Plugin {
  static get requires() {
    return [Widget];
  }

  init() {
    const { commands, editing, ui } = this.editor;

    this._defineSchema();
    this._defineConverters();

    commands.add(RenderCommandsTypes.INSERT, new InsertCommand(this.editor));
    commands.add(RenderCommandsTypes.DELETE, new DeleteCommand(this.editor));

    // Disable toolbar buttons if some react component was selected in model (to avoid inserting component into component)
    editing.downcastDispatcher.on('selection', (e, data) => {
      const selectedElement = data.selection.getSelectedElement();
      const isReactRenderingSelected = get(selectedElement, 'name') === REACT_RENDERING_MODEL;

      ui.view.toolbar.items._items.forEach(button => {
        const reactRenderingButton = Object.values(RenderTypeLabels).some(
          renderTypeLabel => button.label === renderTypeLabel,
        );

        if (reactRenderingButton) {
          button.isEnabled = !isReactRenderingSelected;
        }
      });
    });
  }

  _defineSchema() {
    const { schema } = this.editor.model;

    schema.register(REACT_RENDERING_MODEL, {
      allowWhere: '$text',
      isInline: true,
      isObject: true,
      allowAttributes,
    });
  }

  formatAttributes(attrs, convertFunc, castType) {
    const formattedAttrs = {};
    const isStringifying = convertFunc === kebabCase;

    attrs.forEach((value, name) => {
      if (castType !== ConversionTypes.EDITING_DOWNCAST && name === isNewItemAttr) {
        return;
      }

      try {
        if (value === undefined) {
          return;
        }

        const isStyle = convertFunc(name) === convertFunc(dataDynamicStyle);

        if (isStyle) {
          formattedAttrs.style = getStringFromStyleObject(value);
        }

        if (isStringifying && parsableAttributes.includes(name)) {
          formattedAttrs[convertFunc(name)] = JSON.stringify(value);
          return;
        }

        formattedAttrs[convertFunc(name)] = JSON.parse(value);
      } catch {
        formattedAttrs[convertFunc(name)] = value;
      }
    });

    return formattedAttrs;
  }

  _defineConverters() {
    const { editor } = this;
    const { conversion } = editor;
    const { renderFunction } = editor.config.get(REACT_RENDERING_MODEL);

    conversion.for(ConversionTypes.UPCAST).elementToElement({
      view: { name: 'span' },
      model: (viewElement, { writer: modelWriter }) => {
        const attrs = this.formatAttributes(viewElement._attrs, camelCase);

        if (attrs.hasCustomDataAttributes) {
          return modelWriter.createElement(REACT_RENDERING_MODEL, attrs);
        }
      },
    });

    conversion.for(ConversionTypes.DATA_DOWNCAST).elementToElement({
      model: REACT_RENDERING_MODEL,
      view: (modelElement, { writer: viewWriter }) => {
        const attrs = this.formatAttributes(modelElement._attrs, camelCase);

        const span = viewWriter.createContainerElement('span', {
          ...this.formatAttributes(modelElement._attrs, kebabCase),
          class: attrs.class || '',
          style: attrs.style || '',
        });

        const wrapper = viewWriter.createRawElement('span', { class: 'content' });

        viewWriter.insert(viewWriter.createPositionAt(span, 0), wrapper);

        return toWidget(span, viewWriter);
      },
    });

    conversion.for(ConversionTypes.EDITING_DOWNCAST).elementToElement({
      model: REACT_RENDERING_MODEL,
      view: (modelElement, { writer: viewWriter }) => {
        const attrs = this.formatAttributes(
          modelElement._attrs,
          camelCase,
          ConversionTypes.EDITING_DOWNCAST,
        );

        const span = viewWriter.createContainerElement('span', {
          ...this.formatAttributes(modelElement._attrs, kebabCase),
          class: `ck-widget__react_rendering ck-widget__${attrs.dataTemplateFieldType}`,
        });

        const reactWrapper = viewWriter.createRawElement(
          'span',
          { class: 'content' },
          function (domElement) {
            renderFunction({
              domElement,
              editor,
              ...attrs,
            });
          },
        );

        viewWriter.insert(viewWriter.createPositionAt(span, 0), reactWrapper);

        return toWidget(span, viewWriter);
      },
    });
  }
}
