import React, { useContext, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View, ScrollView } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { ChessText, MonoText } from '../components/StyledText';
import ChessPeices from '../components/ChessPieces';
import { height, styles as st, width } from '../components/styles';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import AppContext from '../components/AppContext';


export default function TabOneScreen({}: RootTabScreenProps<'TabOne'>) {
  // @ts-expect-error
  const { difficulty, setDifficulty } = useContext(AppContext);
  const [locDifficulty, setLocDifficulty] = useState(difficulty);
  const updateLocDifficulty = (a: Number) => {
    setDifficulty(a);
    setLocDifficulty(a);
  }
  const {
    BlackBishop, BlackKing, BlackKnight, BlackPawn, BlackQueen, BlackRook,
    WhiteBishop, WhiteKing, WhiteKnight, WhitePawn, WhiteQueen, WhiteRook
  } = ChessPeices;
  let i = 0;
  const chessSquare = () => {
    i++;
    return i%2===0 ? [st.chessSquare, st.chessSquareBlack] : [st.chessSquare, st.chessSquareWhite]
  }
  const chessRow = () => {
    i++;
    return st.chessRow;
  }
  const ChessBand = () => (<Text style={{textAlign:'center', backgroundColor:'#000000', color:'#FFFFFF'}}>
    <WhitePawn/><BlackBishop/><WhiteKing/><BlackKnight/><BlackPawn/><WhiteQueen/>
    <BlackBishop/><WhiteRook/><BlackBishop/><BlackKing/><WhiteBishop/><BlackKnight/>
    <BlackPawn/><BlackQueen/><BlackRook/><WhiteBishop/><WhiteKing/><WhiteKnight/>
    <WhitePawn/><WhiteQueen/><WhiteRook/><BlackBishop/><WhiteKnight/><BlackKnight/>
    <BlackBishop/><WhiteBishop/><WhitePawn/>
  </Text>);
  return (
    <ScrollView style={{ ...styles.container, ...{flexDirection:"column"}}}>
        <View style={{ ...chessRow(), ...{borderColor: '#000', borderTopWidth: 1}}}>
          <View style={chessSquare()}>
              <BlackBishop style={st.chessPiece} />
            </View>
          <View style={chessSquare()}>
              <BlackKing style={st.chessPiece} />
          </View>
          <View style={chessSquare()}>
            <WhiteKnight  style={st.chessPiece} />
            </View>
          <View style={chessSquare()}>
              <BlackPawn style={st.chessPiece} />
          </View>
          <View style={chessSquare()}>
              <BlackQueen style={st.chessPiece} />
          </View>
          <View style={chessSquare()}>
              <BlackRook style={st.chessPiece} />
          </View>
          <View style={chessSquare()}>
              <WhiteBishop style={st.chessPiece} />
            </View>
          <View style={chessSquare()}>
              <WhiteKing style={st.chessPiece} />
          </View>
        </View>
        <View style={chessRow()}>  
          <View style={chessSquare()}>
              <WhiteKnight style={st.chessPiece} />
            </View>
          <View style={chessSquare()}>
              <WhitePawn style={st.chessPiece} />
          </View>
          <View style={chessSquare()}>
              <WhiteQueen style={st.chessPiece} />
          </View>
          <View style={chessSquare()}>
              <WhiteRook style={st.chessPiece} />    
          </View>
          <View style={chessSquare()}>
              <BlackBishop style={st.chessPiece} />
            </View>
          <View style={chessSquare()}>
              <WhiteBishop style={st.chessPiece} />
            </View>
          <View style={chessSquare()}>
              <BlackKnight style={st.chessPiece} />
            </View>
          <View style={chessSquare()}>
              <WhitePawn style={st.chessPiece} />
            </View>
        </View>
        <ChessBand />
        <View style={{height: height(40)}} />
        <Text style={styles.title}>CHESS BEAST</Text>
        <View style={{height: height(40)}} />
        <ChessBand />
        <View style={{height: height(220), flexDirection:"row"}}>

              <BlackKnight style={[st.largeChessPiece,  st.reverse]} /><WhiteKnight style={st.largeChessPiece} />        
              
      </View>
      <View style={{height: height(100)}}>
        <Text style={{marginHorizontal: width(30), textAlign: 'center'}}>Chess Beast is a chess based game that uses an aggressive but optional timer to keep the human player playing at a fast pace.</Text>
      </View>
      <View style={{ ...chessRow(), ...{borderColor: '#000', borderTopWidth: 1}}}>
          <View style={chessSquare()}>
              <BlackBishop style={st.chessPiece} />
            </View>
          <View style={chessSquare()}>
              <BlackKing style={st.chessPiece} />
          </View>
          <View style={chessSquare()}>
            <WhiteKnight  style={st.chessPiece} />
            </View>
          <View style={chessSquare()}>
              <BlackPawn style={st.chessPiece} />
          </View>
          <View style={chessSquare()}>
              <BlackQueen style={st.chessPiece} />
          </View>
          <View style={chessSquare()}>
              <BlackRook style={st.chessPiece} />
          </View>
          <View style={chessSquare()}>
              <WhiteBishop style={st.chessPiece} />
            </View>
          <View style={chessSquare()}>
              <WhiteKing style={st.chessPiece} />
          </View>
        </View>
        <View style={chessRow()}>  
          <View style={chessSquare()}>
              <WhiteKnight style={st.chessPiece} />
            </View>
          <View style={chessSquare()}>
              <WhitePawn style={st.chessPiece} />
          </View>
          <View style={chessSquare()}>
              <WhiteQueen style={st.chessPiece} />
          </View>
          <View style={chessSquare()}>
              <WhiteRook style={st.chessPiece} />    
          </View>
          <View style={chessSquare()}>
              <BlackBishop style={st.chessPiece} />
            </View>
          <View style={chessSquare()}>
              <WhiteBishop style={st.chessPiece} />
            </View>
          <View style={chessSquare()}>
              <BlackKnight style={st.chessPiece} />
            </View>
          <View style={chessSquare()}>
              <WhitePawn style={st.chessPiece} />
            </View>
        </View>
      <ChessBand />
      {/* <EditScreenInfo path="/screens/TabOneScreen.tsx" /> */}
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  settings: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'

  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
