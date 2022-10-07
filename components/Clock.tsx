import React, {useEffect, useState, useRef, useContext} from "react";
import Timer from '../services/timer';
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";

const Clock = ({callBack, timeLimit}:{callBack:Function, timeLimit:number}) => {
  const interval = useRef(window.setInterval(()=>void(0),30000));
  useEffect(() => {
    window.clearInterval(interval.current);
    const timer = Timer.getThis(cb, timeLimit);
    if(timer && typeof timer !== "boolean"){
      interval.current = window.setInterval(
        () => updateTime(timer.getTime()), 
      1000);
    }
  });
  const cb = () => {
    callBack();
    window.clearInterval(interval.current);
  };
  const [time, updateTime] = useState(0);  
  const representationalTime = time<0?0:time;

  return (
    <View style={{flexDirection:'column'}}>
      {timeLimit>0 &&<>
          <Text style={[styles.instructionText, {textAlign: 'right', fontFamily: 'space-mono' }]} numberOfLines={1}>{`${(Math.floor(timeLimit/60))}:${timeLimit%60<10?"0"+(timeLimit%60):timeLimit%60 + ''}`} per turn</Text>
          <Text style={[styles.instructionText, {textAlign: 'right', fontFamily: 'space-mono', marginTop:-10 }]}>{`${(Math.floor(representationalTime/60))}:${representationalTime%60<10?"0"+(representationalTime%60):representationalTime%60 + ''}`}</Text>
        </>
      }
    </View>);
};

export default Clock;