import Command from '@ckeditor/ckeditor5-core/src/command';
import first from '@ckeditor/ckeditor5-utils/src/first';

export default class IndentBlockCommand extends Command {
  constructor(editor, indentBehavior) {
    super(editor);

    this._indentBehavior = indentBehavior;
  }

  refresh() {
    const { editor } = this;
    const { model } = editor;
    const { schema, document } = model;

    const block = first(document.selection.getSelectedBlocks());

    if (!block || !schema.checkAttribute(block, 'blockIndent')) {
      this.isEnabled = false;

      return;
    }

    this.isEnabled = this._indentBehavior.checkEnabled(block.getAttribute('blockIndent'));
  }

  execute() {
    const { editor } = this;
    const { model } = editor;

    const blocksToChange = getBlocksToChange(model);

    model.change(writer => {
      blocksToChange.forEach(block => {
        const currentIndent = block.getAttribute('blockIndent');

        const nextIndent = this._indentBehavior.getNextIndent(currentIndent);

        if (nextIndent) {
          writer.setAttribute('blockIndent', nextIndent, block);
        } else {
          writer.removeAttribute('blockIndent', block);
        }
      });
    });
  }
}

function getBlocksToChange(model) {
  const { document, schema } = model;
  const { selection } = document;
  const blocksInSelection = Array.from(selection.getSelectedBlocks());

  return blocksInSelection.filter(block => schema.checkAttribute(block, 'blockIndent'));
}
