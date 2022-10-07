import React, { useRef } from 'react';
import {
  Animated,
} from 'react-native';
import { fontScale } from '../../components/styles';

const rowStrToNum = {
  a: 0, b: 1, c: 2, d:3, e: 4, f: 5, g: 6, h: 7
};
const colStrToNum = {
  8: 0, 7: 1, 6: 2, 5: 3, 4: 4, 3: 5, 2: 6, 1: 7
}

const AnimatedPiece = (props:any)  => {
  const {
    squareWidth,
    aiMove,
    coord,
    Piece,
    aiPiece
  } = props;
  const translation = useRef(new Animated.ValueXY({x:0,y:0})).current;
  const [w,h] = coord.toLowerCase().split('');
  const piecePos = {
    // @ts-expect-error
    row: rowStrToNum[w],
    // @ts-expect-error
    column: colStrToNum[h]
  };
    const target = aiMove[aiPiece].toLowerCase().split('');
    const goal = {
      // @ts-expect-error
      x: (colStrToNum[target[1]] - piecePos.column) * squareWidth,
      // @ts-expect-error
      y: (rowStrToNum[target[0]] - piecePos.row) * squareWidth
    }
    Animated.timing(translation, {
      toValue: goal,
      useNativeDriver: true,
      duration: 2000
    }).start();
    return ( 
      <Animated.Text style={{ transform: translation.getTranslateTransform() , fontSize: fontScale(800/4)}}>
        <Piece style={{ fontSize: fontScale(800/4)}}/>
      </Animated.Text>
     );
};

export default AnimatedPiece;
