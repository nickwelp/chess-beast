import { ChessText } from '../StyledText';

const BlackKing = ({style={}}) => <ChessText style={style}>l</ChessText>;
const BlackKnight = ({style={}}) => <ChessText style={style}>m</ChessText>;
const BlackPawn = ({style={}}) => <ChessText style={style}>o</ChessText>;
const BlackRook = ({style={}}) => <ChessText style={style}>t</ChessText>;
const BlackBishop = ({style={}}) => <ChessText style={style}>v</ChessText>;
const BlackQueen = ({style={}}) => <ChessText style={style}>w</ChessText>;
const WhiteQueen = ({style={}}) => <ChessText style={style}>q</ChessText>;
const WhiteRook = ({style={}}) => <ChessText style={style}>r</ChessText>;
const WhiteBishop = ({style={}}) => <ChessText style={style}>b</ChessText>;
const WhiteKing = ({style={}}) => <ChessText style={style}>k</ChessText>;
const WhiteKnight = ({style={}}) => <ChessText style={style}>n</ChessText>;
const WhitePawn = ({style={}}) => <ChessText style={style}>p</ChessText>;

export default {
  BlackBishop, BlackKing, BlackKnight, BlackPawn, BlackQueen, BlackRook,
  WhiteBishop, WhiteKing, WhiteKnight, WhitePawn, WhiteQueen, WhiteRook
}

// Magnetic Chess Font - 
// l - black king
// m - black knight
// o - black pawn
// t - black rook
// v - black bishop
// w - black queen
// q - white queen
// r - white rook
// b - white bishop
// k - white king
// n - white knight
// p - white pawn
