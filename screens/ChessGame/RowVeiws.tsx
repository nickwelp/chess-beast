
import React from 'react';
import {
  View
} from 'react-native';
import {
  DraxView,
	DraxSnapbackTargetPreset,
} from 'react-native-drax';
import { coordSwitcher } from './utils';
import { BoardPositionI } from './interfaces';
import { styles } from '../../components/styles';

interface ChessSquareProps {
	width: number;
	position: BoardPositionI;
	receptive: boolean;
}

const ChessSquare = ({ width, position, receptive }: ChessSquareProps) => {
	const { row, column } = position;
	const colorStyle = (row % 2 === column % 2) ? styles.chessSquareWhite : styles.chessSquareBlack;

	return (
		<DraxView
			style={[
				styles.square,
				colorStyle,
				receptive ? styles.receptive : undefined,
				{ width },
			]}
			receivingStyle={styles.receiving}
			receptive={receptive}
			onReceiveDragDrop={({ dragged: { payload } }) => {
				payload?.setPiecePos?.(position);
				return DraxSnapbackTargetPreset.None;
			}}
		/>
	);
};


const RowViews = ({moving=false, gameState={moves:[]}, selectedPiece='', squareWidth=100}) => {
  const rowViews: JSX.Element[] = [];
  for (let row = 0; row < 8; row += 1) {
    const squareViews: JSX.Element[] = [];
    for (let column = 0; column < 8; column += 1) {
      const thisSquaresId = coordSwitcher({row, column});
      // @ts-expect-error
      const receptive = !!(moving && gameState.moves[selectedPiece] && gameState.moves[selectedPiece].includes(thisSquaresId));	
      squareViews.push((
        <ChessSquare
          width={squareWidth}
          key={`r${row}c${column}`}
          position={{ row, column }}
          receptive={receptive}
        />
      ));
    }
    rowViews.push((
      <View key={`r${row}`} style={styles.row}>{squareViews}</View>
    ));
  }
  return (<>{rowViews}</>);
}

export default RowViews;
