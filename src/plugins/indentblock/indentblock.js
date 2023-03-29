import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import { addMarginRules } from '@ckeditor/ckeditor5-engine/src/view/styles/margin';
import IndentUsingClasses from '@ckeditor/ckeditor5-indent/src/indentcommandbehavior/indentusingclasses';
import IndentUsingOffset from '@ckeditor/ckeditor5-indent/src/indentcommandbehavior/indentusingoffset';

import IndentBlockCommand from './indentblockcommand';

const DEFAULT_ELEMENTS = [
  'paragraph',
  'heading1',
  'heading2',
  'heading3',
  'heading4',
  'heading5',
  'heading6',
];

export default class IndentBlock extends Plugin {
  constructor(editor) {
    super(editor);

    editor.config.define('indentBlock', {
      offset: 40,
      unit: 'px',
    });
  }

  static get pluginName() {
    return 'IndentBlock';
  }

  init() {
    const { editor } = this;
    const configuration = editor.config.get('indentBlock');
    const { classes } = configuration;

    const useOffsetConfig = !Array.isArray(classes);

    const indentConfig = Object.assign({ direction: 'forward' }, configuration);
    const outdentConfig = Object.assign({ direction: 'backward' }, configuration);

    const { data, commands } = editor;

    if (useOffsetConfig) {
      data.addStyleProcessorRules(addMarginRules);
      this._setupConversionUsingOffset(editor.conversion);

      commands.add(
        'indentBlock',
        new IndentBlockCommand(editor, new IndentUsingOffset(indentConfig)),
      );
      commands.add(
        'outdentBlock',
        new IndentBlockCommand(editor, new IndentUsingOffset(outdentConfig)),
      );
    } else {
      this._setupConversionUsingClasses(classes);
      commands.add(
        'indentBlock',
        new IndentBlockCommand(editor, new IndentUsingClasses(indentConfig)),
      );
      commands.add(
        'outdentBlock',
        new IndentBlockCommand(editor, new IndentUsingClasses(outdentConfig)),
      );
    }
  }

  afterInit() {
    const { editor } = this;

    const { commands, config, model } = editor;
    const { schema } = model;

    const indentCommand = commands.get('indent');
    const outdentCommand = commands.get('outdent');

    // Enable block indentation to heading configuration options. If it is not defined enable in paragraph and default headings.
    const options = config.get('heading.options');
    const configuredElements = options && options.map(option => option.model);
    const knownElements = configuredElements || DEFAULT_ELEMENTS;

    knownElements.forEach(elementName => {
      if (schema.isRegistered(elementName)) {
        schema.extend(elementName, {
          allowAttributes: ['blockIndent', 'indentLevel'],
        });
      }
    });

    schema.setAttributeProperties('blockIndent', { isFormatting: true });
    schema.setAttributeProperties('indentLevel', { isFormatting: true });

    indentCommand.registerChildCommand(editor.commands.get('indentBlock'));
    outdentCommand.registerChildCommand(editor.commands.get('outdentBlock'));
  }

  _setupConversionUsingOffset() {
    const { editor } = this;
    const { config, conversion, locale } = editor;
    const indentConfig = config.get('indentBlock');

    const marginProperty =
      locale.contentLanguageDirection === 'rtl' ? 'margin-right' : 'margin-left';

    conversion.for('upcast').attributeToAttribute({
      view: {
        styles: {
          [marginProperty]: /[\s\S]+/,
        },
      },
      model: {
        key: 'blockIndent',
        value: viewElement => viewElement.getStyle(marginProperty),
      },
    });

    conversion.for('upcast').attributeToAttribute({
      view: {
        classes: 'INDENTED_BLOCK',
      },
      model: {
        key: 'blockIndent',
        value: viewElement => {
          const { offset, unit } = indentConfig;
          const indentLevel = viewElement.getAttribute('data-indent-level');

          return `${indentLevel * offset}${unit}`;
        },
      },
    });

    conversion.for('downcast').attributeToAttribute({
      model: 'blockIndent',
      view: modelAttributeValue => {
        return {
          key: 'style',
          value: {
            [marginProperty]: modelAttributeValue,
          },
        };
      },
    });
  }

  _setupConversionUsingClasses(classes) {
    const { editor } = this;
    const { conversion } = editor;

    const definition = {
      model: {
        key: 'blockIndent',
        values: [],
      },
      view: {},
    };

    classes &&
      classes.forEach &&
      classes.forEach(className => {
        definition.model.values.push(className);
        definition.view[className] = {
          key: 'class',
          value: [className],
        };
      });

    conversion.attributeToAttribute(definition);
  }
}
