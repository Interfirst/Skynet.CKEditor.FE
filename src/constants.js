export const emailEditorColors = {
  colors: [
    {
      color: '#000000',
      label: 'Black',
    },
    {
      color: '#4d4d4d',
      label: 'Dim grey',
    },
    {
      color: '#999999',
      label: 'Grey',
    },
    {
      color: '#e6e6e6',
      label: 'Light grey',
    },
    {
      color: '#ffffff',
      label: 'White',
    },
    {
      color: '#e64c4c',
      label: 'Red',
    },
    {
      color: '#e6994c',
      label: 'Orange',
    },
    {
      color: '#e6e64c',
      label: 'Yellow',
    },
    {
      color: '#99e64c',
      label: 'Light green',
    },
    {
      color: '#4ce64c',
      label: 'Green',
    },
    {
      color: '#4ce699',
      label: 'Aquamarine',
    },
    {
      color: '#4ce6e6',
      label: 'Turquoise',
    },
    {
      color: '#4c99e6',
      label: 'Light blue',
    },
    {
      color: '#4c4ce6',
      label: 'Blue',
    },
    {
      color: '#994ce6',
      label: 'Purple',
    },
  ],
};

export const commonConfigOptions = {
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
};

export const commonEmailConfigOptions = {
  link: {
    defaultProtocol: 'https://',
  },
  image: {
    insert: {
      type: 'inline',
    },
  },
  fontColor: emailEditorColors,
  fontBackgroundColor: emailEditorColors,
}
