import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';

import { RenderCommandsTypes, RenderTypeLabels, RenderTypes } from '../reactRendering/constants';

import icon from './assets/icon.svg';

export default class Signature extends Plugin {
  init() {
    const { editor } = this;

    editor.ui.componentFactory.add(RenderTypes.SIGNATURE, locale => {
      const view = new ButtonView(locale);

      view.set({
        label: editor.t(RenderTypeLabels[RenderTypes.SIGNATURE]),
        icon,
        tooltip: true,
        withText: false,
      });

      view.on('execute', () => {
        editor.model.change(() => {
          editor.execute(RenderCommandsTypes.INSERT, {
            dataTemplateFieldType: RenderTypes.SIGNATURE,
          });
        });
      });

      return view;
    });
  }
}
