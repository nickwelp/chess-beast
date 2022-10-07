import React, { useContext, useState } from 'react';
import {
	Dimensions,
	View,
	Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
	DraxProvider,

} from 'react-native-drax';

import ChessPeices from '../../components/ChessPieces';
import GamePieces from './GamePieces';
import RowViews from './RowVeiws';
import Clock from '../../components/Clock';
import Timer from '../../services/timer';

import { styles } from '../../components/styles';
// @ts-expect-error
import { Game } from 'js-chess-engine';
import { MonoText } from '../../components/StyledText';
import AppContext from '../../components/AppContext';
import { capitalize, coordSwitcher } from './utils';
import { BoardPositionI } from './interfaces';
import { RootTabScreenProps } from '../../types';

const {
  BlackBishop, BlackKing, BlackKnight, BlackPawn, BlackQueen, BlackRook,
  WhiteBishop, WhiteKing, WhiteKnight, WhitePawn, WhiteQueen, WhiteRook
} = ChessPeices;


interface ChessPieceI {
  id: string;
  piece: any;
  coordinate: [string, number];
}

let y = 0;
const gamePieces: ChessPieceI[] = [
  {id:`${++y}`,piece: WhiteRook, coordinate:['a',1]},
  {id:`${++y}`,piece: WhiteKnight, coordinate: ['b',1]},
  {id:`${++y}`,piece: WhiteBishop, coordinate: ['c',1]},
  {id:`${++y}`,piece: WhiteQueen, coordinate: ['d',1]},
  {id:`${++y}`,piece: WhiteKing, coordinate: ['e',1]},
  {id:`${++y}`,piece: WhiteBishop, coordinate: ['f',1]},
  {id:`${++y}`,piece: WhiteKnight, coordinate: ['g',1]},
  {id:`${++y}`,piece: WhiteRook, coordinate: ['h',1]},
  {id:`${++y}`,piece: WhitePawn, coordinate: ['a',2]},
  {id:`${++y}`,piece: WhitePawn, coordinate: ['b',2]},
  {id:`${++y}`,piece: WhitePawn, coordinate: ['c',2]},
  {id:`${++y}`,piece: WhitePawn, coordinate: ['d',2]},
  {id:`${++y}`,piece: WhitePawn, coordinate: ['e',2]},
  {id:`${++y}`,piece: WhitePawn, coordinate: ['f',2]},
  {id:`${++y}`,piece: WhitePawn, coordinate: ['g',2]},
  {id:`${++y}`,piece: WhitePawn, coordinate: ['h',2]},

  {id:`${++y}`,piece: BlackRook, coordinate: ['a',8]},
  {id:`${++y}`,piece: BlackKnight, coordinate: ['b',8]},
  {id:`${++y}`,piece: BlackBishop, coordinate: ['c',8]},
  {id:`${++y}`,piece: BlackQueen, coordinate: ['d',8]},
  {id:`${++y}`,piece: BlackKing, coordinate: ['e',8]},
  {id:`${++y}`,piece: BlackBishop, coordinate: ['f',8]},
  {id:`${++y}`,piece: BlackKnight, coordinate: ['g',8]},
  {id:`${++y}`,piece: BlackRook, coordinate: ['h',8]},
  {id:`${++y}`,piece: BlackPawn, coordinate: ['a',7]},
  {id:`${++y}`,piece: BlackPawn, coordinate: ['b',7]},
  {id:`${++y}`,piece: BlackPawn, coordinate: ['c',7]},
  {id:`${++y}`,piece: BlackPawn, coordinate: ['d',7]},
  {id:`${++y}`,piece: BlackPawn, coordinate: ['e',7]},
  {id:`${++y}`,piece: BlackPawn, coordinate: ['f',7]},
  {id:`${++y}`,piece: BlackPawn, coordinate: ['g',7]},
  {id:`${++y}`,piece: BlackPawn, coordinate: ['h',7]},
];

let strikesIncrement = 0;
// const KnightMoves = ({navigation}) => { 
export default function KnightMoves({navigation}: RootTabScreenProps<'TabTwo'>) {
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      console.log('blurring');
      Timer.pause();
    });
    return unsubscribe;
  }, [navigation]);
  React.useEffect(() => {
    const subscribe = navigation.addListener('focus', () => {
      console.log('focus');
      Timer.unpause();
    });
    return subscribe;
  }, [navigation]);

  // @ts-expect-error
  const { difficulty=2, timeLimit=20, strikeLimit=3 } = useContext(AppContext);
  const [game, setGame] = useState(new Game());
  const [aiMove, setAiMove] = useState();
  const [init, setInit] = useState('');
  const [showStrikeAlert, updateShowStrikeAlert] = useState(false);
  const [strikes, updateStrikes] = useState(0);
  const setStrikes = (s:number) => {
    updateShowStrikeAlert(true);
    setTimeout(()=>updateShowStrikeAlert(false), 2995); 
    updateStrikes((s));
  };
  const incrementStrikes = () => {
    // console.log('new strikes:', s);
    setStrikes(++strikesIncrement);
  }
  let gw;
  if(!init){
    const ge = game.exportJson();
    gw = JSON.parse(JSON.stringify(ge));
    setInit(JSON.stringify(ge));
  }
  const [gameState, setGameState] = useState(gw);
  const [selectedPiece, setSelectedPiece] = useState('');
  if(!init){
    // setNewGame(() => setGame(new Game()));
    
  }
  const setPiecePos = async (a:BoardPositionI) => {
    try {
      game.move(selectedPiece, coordSwitcher(a));
      const ge = game.exportJson();
      const gw = JSON.parse(JSON.stringify(ge));
      setGameState(gw);
      strikesIncrement = 0;
      updateStrikes(0)
      Timer.pause();
      setTimeout(async () => {
        await new Promise((res) => {
          setAiMove(game.aiMove(parseInt(difficulty)));
          setTimeout(()=> {
            const ge = game.exportJson();
            const gw = JSON.parse(JSON.stringify(ge));
            setGameState(gw);
            Timer.reset();
          }, 2000);
          res(null);
      })},0);
    } catch (e:any) {
      console.log(e.message);
    }
  }
	const [moving, setMoving] = useState(false);
	const { width, height } = Dimensions.get('window');
	const boardWidth = (Math.min(width, height) * 1);
	const squareWidth = boardWidth / 8;
  const clockCallback = () => {
    Timer.pause();
    if(strikesIncrement>=(strikeLimit-1)) {
      incrementStrikes();
      Alert.alert(
        "Strikes Against Time Limit Exceeded",
        "Chess Beast likes to keep games moving, and new games being played. Time for a new game.",
        [
          {
            text: "Reset Strike Count",
            onPress: () => {
              strikesIncrement = 0;
              updateStrikes(0)
              Timer.reset();
            },
            style: "cancel"
          },
          { text: "New Game", onPress: () =>{
            updateStrikes(0);
            strikesIncrement = 0;
            const newGame = new Game();
            setSelectedPiece('');
            setAiMove(undefined);
            setGame(newGame);                 
            setGameState(JSON.parse(init));
            Timer.reset();
          } }
        ]
      );
    }else {
      incrementStrikes();
      Timer.reset();
    }

    
  }
  
	return (
		<DraxProvider>
      <View style={styles.gameInfoContainer}><MonoText><Text style={styles.gameInfoText}>{`${capitalize(gameState.turn)}'s Turn`}</Text></MonoText></View>
			<View style={styles.container}>
				<View style={styles.containerRow}>
					<View style={styles.board}>
						<>
              <RowViews
                moving={moving} 
                gameState={gameState} 
                selectedPiece={selectedPiece}
                squareWidth={squareWidth}               
              />
            </>
            <>
						  <GamePieces 
                gameState={gameState}
                setSelectedPiece={setSelectedPiece}
                setMoving={setMoving}
                aiMove={aiMove}
                setPiecePos={setPiecePos}
                squareWidth={squareWidth}
              />
            </>
					</View>
          <View style={[showStrikeAlert && {backgroundColor:'#FF0000'},{width:boardWidth, height: 20}]}>
            <Text style={[{textAlign:'center', color:"#EEEEEE"}]}>STRIKE {strikes}</Text>
          </View>
					<View style={{ width: boardWidth, flexDirection: 'row', alignItems:'stretch', marginTop:120, paddingHorizontal: 20 }}>
						<TouchableOpacity
              style={[styles.button, {position: 'relative', top: 20, flex: 3}]}
              onPress={()=> {
                Alert.alert(
                  "New Game",
                  "Are you sure?",
                  [
                    {
                      text: "Cancel",
                      onPress: () => console.log("Cancel Pressed"),
                      style: "cancel"
                    },
                    { text: "OK", onPress: () =>{
                      strikesIncrement = 0;
                      const newGame = new Game();
                      Timer.reset();
                      setSelectedPiece('');
                      setAiMove(undefined);
                      setGame(newGame);                 
                      setGameState(JSON.parse(init));
                    } }
                  ]
                );
               
              }}
            >
              <Text style={[styles.instructionText, {textAlign:'center'}]}>
                New Game 
              </Text>
            </TouchableOpacity>
            {timeLimit!==0 && <View style={{ flexDirection:'column',alignItems:'center', flex: 3}}>
              <MonoText style={{textAlign:'center', marginTop: 20}}>Strikes</MonoText>
              <MonoText style={{textAlign:'center'}}>{strikes}/{strikeLimit}</MonoText>
            </View>}
            <View style={{flex: 3, alignItems:'flex-end'}}>
              <View style={{marginTop:10}}>
                <Clock 
                  timeLimit={timeLimit}
                  callBack={()=>clockCallback()}
                /></View>
            </View>
					</View>
				</View>
			</View>
		</DraxProvider>
	);
};
// export default KnightMoves;
