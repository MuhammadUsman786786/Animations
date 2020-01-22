import React, {Component} from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import * as _ from 'lodash';

const EXPANDABLE_ITEM_HEIGHT = 25;
class App extends Component {
  constructor(props) {
    super(props);
    this.widthAnimatedValue = [
      new Animated.Value(0),
      new Animated.Value(0),
      new Animated.Value(0),
      new Animated.Value(0),
    ];
    this.heightAnimatiedValue = [
      new Animated.Value(0),
      new Animated.Value(0),
      new Animated.Value(0),
      new Animated.Value(0),
    ];
    this.activeIndex = -1;
  }

  handleAnimation = props => {
    const {widthAnimatedValue, heightAnimatedValue, index} = props || {};
    this.widthAnimatedValue.forEach(value => value.setValue(0));
    this.heightAnimatiedValue.forEach(value => value.setValue(0));
    if (this.activeIndex === index) {
      this.activeIndex = -1;
      return;
    }
    this.activeIndex = index;
    Animated.sequence([
      Animated.timing(widthAnimatedValue, {
        toValue: 1,
        duration: 30,
        easing: Easing.ease,
      }),
      Animated.spring(heightAnimatedValue, {
        toValue: 1,
        duration: 500,
        friction: 10,
      }),
    ]).start();
  };

  renderTooltip = props => {
    const {index, dataList} = props || {};
    const widthAnimatedValue = this.widthAnimatedValue[index];
    const heightAnimatedValue = this.heightAnimatiedValue[index];
    const widthInterpolation = widthAnimatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0%', '100%'],
    });

    const heightInterpolation = heightAnimatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [1, EXPANDABLE_ITEM_HEIGHT * (dataList.length + 1)],
    });

    const handleAnimation = () =>
      this.handleAnimation({widthAnimatedValue, heightAnimatedValue, index});

    return (
      <View style={styles.tooltipContainer}>
        <TouchableOpacity
          onPress={handleAnimation}
          style={styles.roundButtonContainer}>
          <Text style={{color: 'white'}}>icon</Text>
        </TouchableOpacity>
        <Animated.View
          style={[
            styles.expandableViewContainer,
            {width: widthInterpolation, height: heightInterpolation},
          ]}>
          {_.map(dataList, ({title}, index) => (
            <View key={index} style={styles.expandableItemContainer}>
              <Text>{title}</Text>
            </View>
          ))}
        </Animated.View>
      </View>
    );
  };
  render() {
    const dataList1 = [
      {title: 'aaa'},
      {title: 'bbb'},
      {title: 'ccc'},
      {title: 'ddd'},
    ];
    const dataList2 = [{title: 'aaa'}, {title: 'bbb'}, {title: 'ccc'}];
    const dataList3 = [
      {title: 'aaa'},
      {title: 'bbb'},
      {title: 'ccc'},
      {title: 'ddd'},
    ];
    const dataList4 = [{title: 'aaa'}, {title: 'bbb'}, {title: 'ccc'}];
    return (
      <View style={styles.roundButtonsContainer}>
        {this.renderTooltip({index: 0, dataList: dataList1})}
        {this.renderTooltip({index: 1, dataList: dataList2})}
        {this.renderTooltip({index: 2, dataList: dataList3})}
        {this.renderTooltip({index: 3, dataList: dataList4})}
      </View>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  roundButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  tooltipContainer: {
    width: '25%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  roundButtonContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  expandableViewContainer: {
    position: 'absolute',
    backgroundColor: 'green',
    top: 45,
  },
  expandableItemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: EXPANDABLE_ITEM_HEIGHT,
  },
});
