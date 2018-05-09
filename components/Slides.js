import React from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default class Slides extends React.Component {
  renderLastSlide(i) {
    if(i == this.props.data.length - 1){
      return (
        <Button title="Continue" raised buttonStyle={styles.buttonStyle} onPress={this.props.onComplete}  />
      );
    }
  }

  renderSlides() {
    return this.props.data.map((slide, i) => {
        return (
          <View key={slide.text} style={[{backgroundColor: slide.color}, styles.slide]}>
            <Text style={styles.textStyle}>{slide.text}</Text>
            {this.renderLastSlide(i)}
          </View>
        );
    });
  }

  render() {
    return (
      <ScrollView
        horizontal
        pagingEnabled
        style={{ flex:1 }}
      >
        {this.renderSlides()}
      </ScrollView>
    );
  }
}

const styles = {
  textStyle: {
    color: '#fff'
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH
  },
  buttonStyle: {
    backgroundColor: '#0288d1',
  }
};
