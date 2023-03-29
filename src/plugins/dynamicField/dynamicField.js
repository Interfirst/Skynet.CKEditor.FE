import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';

import { RenderCommandsTypes, RenderTypeLabels, RenderTypes } from '../reactRendering/constants';

import './assets/dynamicField.css';

export default class DynamicField extends Plugin {
  init() {
    const { editor } = this;

    editor.ui.componentFactory.add(RenderTypes.DYNAMIC_FIELD, locale => {
      const view = new ButtonView(locale);

      view.set({
        label: editor.t(RenderTypeLabels[RenderTypes.DYNAMIC_FIELD]),
        tooltip: true,
        withText: true,
      });

      view.on('execute', () => {
        editor.model.change(() => {
          editor.execute(RenderCommandsTypes.INSERT, {
            dataTemplateFieldType: RenderTypes.DYNAMIC_FIELD,
          });
        });
      });

      return view;
    });
  }
}
