import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableWithoutFeedback, Image } from 'react-native';
import randomColor from 'randomcolor';
import { styles } from './style';

class Card extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: props.item || {},
      backgroundColor: randomColor()
    }
  }

  renderThumb() {
    if (this.state.data.urlToImage) {
      return (
        <View
          style={styles.image}
        >
          <Image
            style={{width: 80, height: 80}}
            source={{uri: this.state.data.urlToImage}}
          />
        </View>
      );
    }
    return (
      <View
        style={[styles.box, {backgroundColor: this.state.backgroundColor}]}
      />
    );
  }

  render() {
    if (this.state.data.hide) return null;
    return (
      <View style={styles.topContainer}>
        <TouchableWithoutFeedback
          onPress={() => {this.props.onPress(this.state.data)}}
        >
          <View style={styles.container}>
            { this.renderThumb() }
            <View style={styles.detailBox}>
              <Text style={styles.textTitle}>{ this.state.data.name || this.state.data.title}</Text>
              <Text style={styles.textDescription}>{ this.state.data.description }</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

Card.propTypes = {
  onPress: PropTypes.func.isRequired,
  item: PropTypes.object
};

export default Card;
