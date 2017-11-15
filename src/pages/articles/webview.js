import React, { Component } from 'react';
import {
  Text, TouchableOpacity, View, FlatList, Modal, WebView
} from 'react-native';
import NavigationBar from 'react-native-navbar';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Spinner from 'react-native-loading-spinner-overlay';
import SearchBar from 'react-native-searchbar'
import { Actions } from 'react-native-router-flux';
import { styles } from './style';
import { API } from '../../data/api';
import Card from '../../components/card';

export default class Webs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true
    }
  }

  leftIcon() {
    return (
      <TouchableOpacity onPress={() => { Actions.pop(); }}>
        <View style={styles.rightIcon}>
          <Icon name="arrow-back" size={24} color="#444" />
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    const titleConfig = {
      title: ``,
    };

    return (
      <View style={styles.container}>
        <Spinner visible={this.state.visible} textContent={"Loading..."} textStyle={{color: '#FFF'}} />
        <NavigationBar
          title={titleConfig}
          leftButton={this.leftIcon()}
        />
        <WebView
          style={{flex: 1}}
          onError={err => { this.setState({visible: false}); }}
          onLoadEnd={err => { this.setState({visible: false}); }}
          source={{ uri: this.props.details.url }}
        />
      </View>
    );
  }
}
