import React, { Component } from 'react';
import { Text, TouchableOpacity, View, FlatList } from 'react-native';
import NavigationBar from 'react-native-navbar';
import Spinner from 'react-native-loading-spinner-overlay';
import { Actions } from 'react-native-router-flux';
import { styles } from './style';
import { API } from '../../data/api';
import Card from '../../components/card';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      visible: true
    };

    this.onItemPressed = this.onItemPressed.bind(this);
    this.renderItems = this.renderItems.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    API.getSources()
      .then(res => {
        if (res && res.data) {
          this.setState({
            data: res.data.sources,
            needUpdate: !this.state.needUpdate,
            visible: false
          });
        }
      }).catch(err => {
        console.log(err);
      });
  }

  onItemPressed(item) {
    Actions.articles({details: item});
  }

  renderItems = ({item}) => {
    return (
      <Card
        item={item}
        onPress={this.onItemPressed}
      />
    );
  };

  render() {
    const titleConfig = {
      title: 'News Sources',
    };

    return (
      <View style={styles.container}>
        <Spinner visible={this.state.visible} textContent={"Loading..."} textStyle={{color: '#FFF'}} />
        <NavigationBar
          title={titleConfig}
        />

        <View style={styles.containerItem}>
          <FlatList
            extraData={this.state.needUpdate}
            removeClippedSubviews={false}
            initialNumToRender={this.state.data.length}
            keyExtractor={(item, index) => item.id}
            bounces={false}

            data={this.state.data}
            renderItem={this.renderItems}
          />
        </View>
      </View>
    );
  }
}
