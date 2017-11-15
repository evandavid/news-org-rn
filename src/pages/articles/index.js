import React, { Component } from 'react';
import { Text, TouchableOpacity, View, FlatList } from 'react-native';
import NavigationBar from 'react-native-navbar';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Spinner from 'react-native-loading-spinner-overlay';
import SearchBar from 'react-native-searchbar'
import { Actions } from 'react-native-router-flux';
import { styles } from './style';
import { API } from '../../data/api';
import Card from '../../components/card';

export default class Articles extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      visible: true,
      modalVisible: false
    };

    this.onItemPressed = this.onItemPressed.bind(this);
    this.renderItems = this.renderItems.bind(this);
    this.onSubmitSearch = this.onSubmitSearch.bind(this);
    this.onClearSearch = this.onClearSearch.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    API.getArticles(this.props.details.id)
      .then(res => {
        if (res && res.data) {
          this.setState({
            data: res.data.articles,
            needUpdate: !this.state.needUpdate,
            visible: false
          });
        }
      }).catch(err => {
        console.log(err);
      });
  }

  onItemPressed(item) {
    Actions.web({details: item});
  }

  rightIcon() {
    return (
      <TouchableOpacity onPress={() => {this.searchBar.show()}}>
        <View style={styles.rightIcon}>
          <Icon name="search" size={24} color="#444" />
        </View>
      </TouchableOpacity>
    );
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

  renderItems = ({item}) => {
    return (
      <Card
        item={item}
        onPress={this.onItemPressed}
      />
    );
  };

  onSubmitSearch(val) {
    let q = this.searchBar.getValue();
    if (q && q !== '') {
      let data = this.state.data;
      let dataLength = data.length;
      for (var i = 0; i < dataLength; i++) {
        let findIndex = data[i].title.toLowerCase().indexOf(q.toLowerCase());
        data[i].hide = findIndex < 0;
      }

      this.searchPerformed = true;
      this.setState({needUpdate: !this.state.needUpdate});
    }

  }

  onClearSearch() {
    if (this.searchPerformed) {
      this.searchPerformed = false;
      let data = this.state.data;
      let dataLength = data.length;
      for (var i = 0; i < dataLength; i++) {
        data[i].hide = false;
      }
      this.setState({needUpdate: !this.state.needUpdate});
      this.searchBar.hide();
    }
  }

  closeModal() {
    this.setState({modalVisible: false});
  }

  render() {
    const titleConfig = {
      title: `Articles - ${this.props.details.name}`,
    };

    return (
      <View style={styles.container}>
        <Spinner visible={this.state.visible} textContent={"Loading..."} textStyle={{color: '#FFF'}} />
        <NavigationBar
          title={titleConfig}
          rightButton={this.rightIcon()}
          leftButton={this.leftIcon()}
        />
        <SearchBar
          ref={(ref) => this.searchBar = ref}
          onSubmitEditing={this.onSubmitSearch}
          onBack={this.onClearSearch}
          onHide={this.onClearSearch}
          onX={this.onClearSearch}
        />

        <View style={styles.containerItem}>
          <FlatList
            extraData={this.state.needUpdate}
            removeClippedSubviews={false}
            initialNumToRender={this.state.data.length}
            keyExtractor={(item, index) => item.url}
            bounces={false}

            data={this.state.data}
            renderItem={this.renderItems}
          />
        </View>
      </View>
    );
  }
}
