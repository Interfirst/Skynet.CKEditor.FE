import Command from '@ckeditor/ckeditor5-core/src/command';
import get from 'lodash/get';

import { FormBuilderOperationType, REACT_RENDERING_MODEL, RenderCommandsTypes } from './constants';
import { findNodesByGroupIdAttr } from './reactRendering.utils';

export default class InsertCommand extends Command {
  execute({
    isNewItem = true,
    hasCustomDataAttributes = true,
    isEdit,
    isGroup,
    hellosignGroupDefaultValues,
    ...restProps
  }) {
    const { model, commands } = this.editor;
    const isChangedFromGroupToSingleElement =
      get(hellosignGroupDefaultValues, 'length') && !isGroup;

    model.change(writer => {
      const attributes = {
        isNewItem,
        hasCustomDataAttributes,
        isGroup,
        ...restProps,
      };

      const createElement = ({ attributes }) => {
        const createdElement = writer.createElement(REACT_RENDERING_MODEL, attributes);

        model.insertContent(createdElement);
      };

      // When user submits form the first time - need to commit this action (1 step back - to remove empty element that renders anchor for popup)
      if (!isNewItem && !isEdit) {
        commands.get(FormBuilderOperationType.UNDO).execute();
      }

      if (isEdit && !isGroup) {
        this.editor.execute(RenderCommandsTypes.DELETE);
      }

      if (isGroup || isChangedFromGroupToSingleElement) {
        const groupNodes = findNodesByGroupIdAttr({
          writer,
          root: model.document.getRoot(),
          groupId: restProps.dataHellosignGroupId,
        });

        const maxArrayLength = Math.max(
          get(hellosignGroupDefaultValues, 'length'),
          groupNodes.length,
        );

        Array.from({ length: maxArrayLength }).forEach((__, index) => {
          if (isEdit) {
            const existedNode = groupNodes[index];

            if (existedNode) {
              writer.setSelection(existedNode, 'on');
              this.editor.execute(RenderCommandsTypes.DELETE);
            }
          }

          if (hellosignGroupDefaultValues[index] && !isChangedFromGroupToSingleElement) {
            const isAtLeastOneTrueDefaultValueInGroup = hellosignGroupDefaultValues.some(
              value => value === 'true',
            );

            createElement({
              attributes: {
                ...attributes,
                dataHellosignDefaultValue: isAtLeastOneTrueDefaultValueInGroup
                  ? hellosignGroupDefaultValues[index]
                  : undefined,
              },
            });
          }
        });

        if (!isChangedFromGroupToSingleElement) {
          return;
        }
      }

      createElement({ attributes });
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
