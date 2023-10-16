import _ from 'lodash';

import { dataHellosignGroupId, FontSizeOption } from './constants';

export const getStringFromStyleObject = value => {
  let parsableValue = value;

  if (_.isString(value)) {
    parsableValue = JSON.parse(value);
  }

  return Object.keys(parsableValue).reduce((acc, cur) => {
    switch (cur) {
      case 'isBold': {
        acc += `font-weight: ${parsableValue.isBold ? FontSizeOption.BOLD : FontSizeOption.LIGHT};`;
        break;
      }

      case 'fontSize': {
        acc += `font-size: ${
          parseInt(parsableValue.fontSize) ? parsableValue.fontSize + 'px' : 'inherit'
        };`;
        break;
      }

      case 'fontColor': {
        if (parsableValue.fontColor) {
          acc += `color: ${parsableValue.fontColor};`;
        }
        break;
      }

      case 'fontFamily': {
        if (parsableValue.fontFamily) {
          acc += `font-family: ${parsableValue.fontFamily};`;
        }
        break;
      }

      default: {
        if (!_.isNil(parsableValue[cur])) {
          acc[cur] = parsableValue[cur].toString();
        }
      }
    }

    return acc;
  }, '');
};

export const findNodesByGroupIdAttr = ({ writer, root, groupId }) => {
  const nodes = [];
  const range = writer.createRangeIn(root);

  for (const value of range.getWalker({ ignoreElementEnd: true })) {
    const node = value.item;

    if (node._attrs && node._attrs.get(dataHellosignGroupId) === groupId) {
      nodes.push(node);
    }
  }

  return nodes;
};
