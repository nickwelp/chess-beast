import React, { useContext, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View, ScrollView } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { ChessText, MonoText } from '../components/StyledText';
import ChessPeices from '../components/ChessPieces';
import { fontScale, height, styles as st, width } from '../components/styles';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import AppContext from '../components/AppContext';
import Timer from '../services/timer';


export default function TabOneScreen({}: RootTabScreenProps<'TabThree'>) {
  // @ts-expect-error
  const { difficulty, setDifficulty, timeLimit, setTimeLimit } = useContext(AppContext);
  const [locTimeLimt, setLocTimeLimit] = useState(timeLimit);
  const timer = Timer.getThisNoCb();
  if(timer && typeof timer !== "boolean"){
    // Timer.pause();
  }
  const updateLocTimeLimt = (a:number) => {
    if(timer && typeof timer !== "boolean"){
      // Timer.pause();
      timer.updateMaxTime(a);
    }
    setTimeLimit(a);
    setLocTimeLimit(a);
  };
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
        <Text style={styles.title}>SETTINGS</Text>
        <View style={{height: height(40)}} />
        <ChessBand />
      
      <View style={{height: height(60)}} />
          <MonoText style={styles.settings}>Set Difficulty</MonoText>
          <MonoText style={{margin:20, textAlign:'center'}}>Higher difficulties will have the chess engine take longer to make decisions.</MonoText>  
      <View style={{flexDirection:'row'}}>
        <View style={{flex:1}} />
        <View style={{flex:1, flexDirection:'row'}}>
          <View style={{flex:1}}>
            <TouchableOpacity onPress={() => {updateLocDifficulty(4)}}><Text style={{textAlign:'right'}}>4</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => {updateLocDifficulty(3)}}><Text style={{textAlign:'right'}}>3</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => {updateLocDifficulty(2)}}><Text style={{textAlign:'right'}}>2</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => {updateLocDifficulty(1)}}><Text style={{textAlign:'right'}}>1</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => {updateLocDifficulty(0)}}><Text style={{textAlign:'right'}}>0</Text></TouchableOpacity>
          </View>
          <View style={{flex:1}}>
            <Text style={{textAlign:'left', }}>{locDifficulty===4?<BlackPawn style={st.settingsChessPiece} />:' '}</Text>
            <Text style={{textAlign:'left', }}>{locDifficulty===3?<BlackPawn style={st.settingsChessPiece} />:' '}</Text>
            <Text style={{textAlign:'left', }}>{locDifficulty===2?<BlackPawn style={st.settingsChessPiece} />:' '}</Text>
            <Text style={{textAlign:'left', }}>{locDifficulty===1?<BlackPawn style={st.settingsChessPiece} />:' '}</Text>
            <Text style={{textAlign:'left', }}>{locDifficulty===0?<BlackPawn style={st.settingsChessPiece} />:' '}</Text>
          </View>
        </View>
        <View  style={{flex:1}} />
      </View>
      <View style={{height: height(60)}} />
          <MonoText style={styles.settings}>Set Time Limit</MonoText>
          <MonoText style={{margin:20, textAlign:'center'}}>Chess Beast gives a player a limited amount of time to make each move.</MonoText>  
      <View style={{flexDirection:'row'}}>
        <View style={{flex:1}} />
        <View style={{flex:1, flexDirection:'row'}}>
          <View style={{flex:1}}>
            <TouchableOpacity  onPress={() => {updateLocTimeLimt(120)}}><Text numberOfLines={1} style={{textAlign:'right'}}>2 minutes</Text></TouchableOpacity>
            <TouchableOpacity  onPress={() => {updateLocTimeLimt(60)}}><Text numberOfLines={1} style={{textAlign:'right'}}>1 minute</Text></TouchableOpacity>
            <TouchableOpacity  onPress={() => {updateLocTimeLimt(40)}}><Text numberOfLines={1} style={{textAlign:'right'}}>40 seconds</Text></TouchableOpacity>
            <TouchableOpacity  onPress={() => {updateLocTimeLimt(30)}}><Text numberOfLines={1} style={{textAlign:'right'}}>30 seconds</Text></TouchableOpacity>
            <TouchableOpacity  onPress={() => {updateLocTimeLimt(20)}}><Text numberOfLines={1} style={{textAlign:'right'}}>20 seconds</Text></TouchableOpacity>
            <TouchableOpacity  onPress={() => {updateLocTimeLimt(0)}}><Text numberOfLines={1} style={{textAlign:'right'}}>disabled</Text></TouchableOpacity>
          </View>
          <View style={{flex:1}}>
            <Text style={{textAlign:'left'}}>{locTimeLimt===120?<BlackPawn style={st.settingsChessPiece} />:' '}</Text>
            <Text style={{textAlign:'left'}}>{locTimeLimt===60?<BlackPawn style={st.settingsChessPiece} />:' '}</Text>
            <Text style={{textAlign:'left'}}>{locTimeLimt===40?<BlackPawn style={st.settingsChessPiece} />:' '}</Text>
            <Text style={{textAlign:'left'}}>{locTimeLimt===30?<BlackPawn style={st.settingsChessPiece} />:' '}</Text>
            <Text style={{textAlign:'left'}}>{locTimeLimt===20?<BlackPawn style={st.settingsChessPiece} />:' '}</Text>
            <Text style={{textAlign:'left'}}>{locTimeLimt===0?<BlackPawn style={st.settingsChessPiece} />:' '}</Text>
          </View>
        </View>
        <View  style={{flex:1}} />
      </View>
      <View style={{height: height(100)}} />
      <ChessBand />
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
