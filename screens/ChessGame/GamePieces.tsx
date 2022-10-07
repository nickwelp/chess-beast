import React from 'react';
import {
	DraxView,
} from 'react-native-drax';
import { fontScale, styles } from '../../components/styles';
import ChessPeices from '../../components/ChessPieces';
import AnimatedPiece from './AnimatedPiece';

const {
  BlackBishop, BlackKing, BlackKnight, BlackPawn, BlackQueen, BlackRook,
  WhiteBishop, WhiteKing, WhiteKnight, WhitePawn, WhiteQueen, WhiteRook
} = ChessPeices;

const rowStrToNum = {
  a: 0, b: 1, c: 2, d:3, e: 4, f: 5, g: 6, h: 7
};
const colStrToNum = {
  8: 0, 7: 1, 6: 2, 5: 3, 4: 4, 3: 5, 2: 6, 1: 7
}


interface ChessApiStateI {
  turn: "black" | "white",
  pieces: {
    [key: string]: string,
  },
  moves: {
    [key: string]: string[];
  },
  isFinished: boolean,
  check: boolean,
  checkMate: boolean,
  castling: {
      whiteLong: boolean,
      whiteShort: boolean,
      blackLong: boolean,
      blackShort: boolean    
  },
  enPassant: string,
  halfMove: 0,
  fullMove: 1
};

const chessLanguagePieceKey = {
  "K":WhiteKing,
  "Q":WhiteQueen,
  "R":WhiteRook,
  "B":WhiteBishop,
  "N":WhiteKnight,
  "P":WhitePawn,
  "k":BlackKing,
  "q":BlackQueen,
  "r":BlackRook,
  "b":BlackBishop,
  "n":BlackKnight,
  "p":BlackPawn
};

const GamePieces = (props:any)  => {
  const gameState:ChessApiStateI= props.gameState;
  const {
    setSelectedPiece,
    setMoving,
    setPiecePos,
    squareWidth,
    aiMove
  } = props;
  const {pieces = {} } = gameState; 
  const p = Object.keys(pieces);
  const GBs = p.map((coord) => {
    // @ts-expect-error
    const Piece = chessLanguagePieceKey[pieces[coord]];
    const [w,h] = coord.toLowerCase().split('');
    const piecePos = {
      // @ts-expect-error
      row: rowStrToNum[w],
      // @ts-expect-error
      column: colStrToNum[h]
    };
    const aiPiece = aiMove ? Object.keys(aiMove)[0] : '';
    return (
        <DraxView
            key={coord}
            style={[
              styles.knight,
              {
                width: squareWidth,
                height: squareWidth,
                top: piecePos.row * squareWidth,
                left: piecePos.column * squareWidth,
              },
            ]}
            draggingStyle={styles.dragging}
            dragPayload={{ setPiecePos }}
            onDragStart={() => {
              setSelectedPiece(coord);
              setMoving(true);
            }}
            onDragEnd={() => {
              setMoving(false);
            }}
            onDragDrop={() => {
              setMoving(false);
            }}
          >
            {(coord===aiPiece) &&
            <AnimatedPiece 
              coord={coord} 
              squareWidth={squareWidth}
              aiPiece={aiPiece}
              aiMove={aiMove}
              Piece={Piece}
            />
            } 
            {(coord!==aiPiece) &&
            <Piece style={{fontSize: fontScale(800/8)}}/>
            }
      </DraxView>
     );
  });
  return (
    <>
    {GBs}
    </>
  )
};

export default GamePieces;
