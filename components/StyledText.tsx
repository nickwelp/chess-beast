import { Text, TextProps } from './Themed';

export function MonoText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'space-mono' }]} />;
}

export function ChessText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'magenet-chess' }]} />;
}