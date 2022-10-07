import {
  StyleSheet, Platform, PixelRatio, Dimensions, Text
} from 'react-native';

import * as Device from 'expo-device';

const WIDTH_CONSTANT = 600;
const HEIGHT_CONSTANT = 800;

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export const getTestIdProps = (id:string) => {
  return { accessible: true, accessibilityLabel: id, testID: id }
}

const deviceInch = () => {
  const pr = PixelRatio.get();
  const dpi = 160 * pr;
  const x = Math.pow(screenWidth / dpi, 2);
  const y = Math.pow(screenHeight / dpi, 2);
  return Math.sqrt(x + y);
}
const devInch = deviceInch();

export const width = (size:number, tabletSize = NaN) => {
  if (checkTabletCache && !isNaN(tabletSize)) return tabletSize*screenWidth/WIDTH_CONSTANT
  return size*screenWidth/WIDTH_CONSTANT;
}
export const height = (size:number) => size*screenHeight/HEIGHT_CONSTANT;

const checkTablet = async () => {    
  if (Platform.OS === 'ios') {
      return Platform.isPad;
  }
  if (await Device.getDeviceTypeAsync() === Device.DeviceType.TABLET) {
      return true;
  }
  const pixelDensity = PixelRatio.get();
  const adjustedWidth = screenWidth * pixelDensity;
  const adjustedHeight = screenHeight * pixelDensity;
  if (pixelDensity < 2 && (adjustedWidth >= 1000 || adjustedHeight >= 1000)) {
      return true;
  } else {
      return pixelDensity === 2 && (adjustedWidth >= 1920 || adjustedHeight >= 1920);
  }
}
let checkTabletCache:string;
const checkTabletCacheMaker = async () => await checkTablet();

checkTabletCacheMaker().then(
  (text) => {
    if (text !== undefined) {
      console.info(text)
      checkTabletCache = text.toString();
    }
    process.exitCode = 0;
  },
  (err) => {
    console.info(err);
    process.exitCode = 1;
  }
).then(() => {
  // process.exit()
});


const deviceFontScale = 1;
// @ts-expect-error
Text.defaultProps = Text.defaultProps || {}
// @ts-expect-error
Text.defaultProps.allowFontScaling = false;
// @ts-expect-error
Text.defaultProps.adjustsFontSizeToFit = true;

export const  lineHeightSetter = (a:number|string) => {
  return Math.max(height(parseInt(a + '') + 10), fontScale(parseInt(a + '')));
}

export const fontScale = (size:number) => {
  const checkSmallDevice = false;
  const ratio = (devInch + (checkSmallDevice || checkTabletCache ? 2 : 3)) / 10;
  const scale = size * Number(ratio.toFixed(1));
  return scale;


  // const value = (devInch + (devInch < 4.6 || checkTabletCache ? 2 : 3)) / 10;
  // const scale = (size) * Number(value.toFixed(1));
  // if (checkTabletCache) return (deviceFontScale * scale/2);
  // return deviceFontScale * scale * 1;    
}

export const colors = {
  blue: '#0052ca',
  white: '#fff',
  red: 'red',
  sky: '#80c0ff',
  gray: '#d1d3d4',
  green: '#88d75c'
}

export const styles = StyleSheet.create({
  chessRow: {
    width: width(600),
    flexDirection: "row",
    flex: 1,
    // alignContent: "center",
    // borderColor: "#000000",
    // borderWidth: 1
  },
  chessSquare: {
    width: width(600/8),
    height: height(400/8),
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center'
  },
  chessSquareBlack: {
    backgroundColor: '#bbbbbb',
    // backgroundColor: '#a6b49b'
  },
  chessSquareWhite: {
    backgroundColor: '#eeeeee',
    // backgroundColor: '#dbebcb',
  },
  chessPiece: {
    fontSize: fontScale(600/8),
    flex: 1,
    textAlign: 'center',
    marginTop: height(5),
    color: '#000000'
  },
  settingsChessPiece: {
    color: '#000000',
    position: 'relative',
    top: 4
  },
  largeChessPiece: {
    fontSize: fontScale(400),
    flex: 1,
    textAlign: 'center',
    marginTop: height(5),
    color: '#000000'
  },
  reverse: {
    transform: [{scaleX:-1}]
  },
	container: {
		flex: 1,
		padding: 10,
		justifyContent: 'center',
		alignItems: 'center',
	},
	containerRow: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center',
		alignItems: 'center',
	},
	board: {
		borderColor: 'black',
		borderWidth: 3,
	},
	row: {
		flexDirection: 'row',
	},
	dark: {
		backgroundColor: '#999999',
	},
	light: {
		backgroundColor: '#dddddd',
	},
	square: {
		aspectRatio: 1,
	},
	receptive: {
		borderColor: '#0000ff',
		borderWidth: 1,
	},
	receiving: {
		borderColor: '#ff00ff',
		borderWidth: 1,
	},
	knight: {
		position: 'absolute',
		justifyContent: 'center',
		alignItems: 'center',
	},
	dragging: {
		opacity: 0.2,
	},
	instructionText: {
		margin: 12,
		fontSize: 16,
		fontStyle: 'italic',
	},
  gameInfoContainer: {
    marginRight: width(20)
  },
  gameInfoText: {
   textAlign: 'center'
  },
  button:{
    backgroundColor:'#bbbbbb',
    padding: 0,
    borderWidth: 3,
    borderRadius: 15,
    height: 50
  }
});