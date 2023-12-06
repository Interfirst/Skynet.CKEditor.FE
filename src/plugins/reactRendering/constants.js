const dataDynamicAction = 'dataDynamicAction';
export const dataDynamicStyle = 'dataDynamicStyle';
export const isNewItem = 'isNewItem';
export const dataHellosignGroupId = 'dataHellosignGroupId';

export const allowAttributes = [
  'class',
  'id',
  'dataDynamicTitle',
  'dataDynamicDateAddDays',
  'dataDynamicValue',
  'dataDynamicType',
  'dataDynamicHint',
  'dataTemplateFieldType',
  'dataDynamicCheckboxRenderType',
  'dataDynamicIgnoreUserDefinedStyles',
  'dataHellosignTag',
  'dataHellosignSigner',
  'dataHellosignRequired',
  'dataHellosignDefaultValue',
  'dataHellosignGroupRule',
  'hasCustomDataAttributes',
  dataDynamicAction,
  isNewItem,
  dataDynamicStyle,
  dataHellosignGroupId,
];

export const ConversionTypes = {
  UPCAST: 'upcast',
  DATA_DOWNCAST: 'dataDowncast',
  EDITING_DOWNCAST: 'editingDowncast',
};

export const parsableAttributes = [dataDynamicAction, dataDynamicStyle];

export const RenderTypes = {
  DYNAMIC_FIELD: 'dynamicField',
  SIGNATURE: 'helloSignField',
};

export const RenderTypeLabels = {
  [RenderTypes.DYNAMIC_FIELD]: 'Dynamic Field',
  [RenderTypes.SIGNATURE]: 'Sign Tag',
};

export const RenderCommandsTypes = {
  INSERT: 'insertReactComponent',
  DELETE: 'deleteReactComponent',
};

export const FormBuilderOperationType = {
  UNDO: 'undo',
  REDO: 'redo',
};

export const REACT_RENDERING_MODEL = 'reactRendering';

export const FontSizeOption = {
  LIGHT: '200',
  BOLD: '600',
};
