import Command from '@ckeditor/ckeditor5-core/src/command';

import { REACT_RENDERING_MODEL } from './constants';
import { findNodesByGroupIdAttr } from './reactRendering.utils';

export default class DeleteCommand extends Command {
  execute({ dataHellosignGroupId } = {}) {
    const { model } = this.editor;
    const isGroup = !!dataHellosignGroupId;

    model.change(writer => {
      const { selection } = model.document;

      if (isGroup) {
        const groupNodes = findNodesByGroupIdAttr({
          writer,
          root: model.document.getRoot(),
          groupId: dataHellosignGroupId,
        });

        groupNodes.forEach(node => {
          writer.setSelection(node, 'on');
          model.deleteContent(selection);
        });
      } else {
        model.deleteContent(selection);
      }
    });
  }

  refresh() {
    const { model } = this.editor;
    const { selection } = model.document;

    const allowedIn = model.schema.findAllowedParent(
      selection.getFirstPosition(),
      REACT_RENDERING_MODEL,
    );

    this.isEnabled = allowedIn !== null;
  }
}
