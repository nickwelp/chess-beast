const rowNumToStr = 'abcdefgh'.split('');
const colNumToStr = '87654321'.split('');

// @ts-expect-error
export const coordSwitcher = ({row, column}) => {
  return `${rowNumToStr[row]}${colNumToStr[column]}`.toUpperCase();
}

export const capitalize = (str: String) => {
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : "";
}