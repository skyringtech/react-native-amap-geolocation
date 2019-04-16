import React from "react";
import {
  AppRegistry,
  Button,
  StyleSheet,
  Text,
  View,
  ScrollView,
  PermissionsAndroid,
  Platform
} from "react-native";
import {
  init,
  addLocationListener,
  start,
  stop,
  setInterval,
  setNeedAddress
} from "react-native-amap-geolocation";

const style = StyleSheet.create({
  body: {
    padding: 16
  },
  controls: {
    flexWrap: "wrap",
    alignItems: "flex-start",
    flexDirection: "row",
    marginBottom: 16
  },
  button: {
    flexDirection: "column",
    marginRight: 8,
    marginBottom: 8
  },
  result: {
    fontFamily: Platform.OS === "ios" ? "menlo" : "monospace"
  }
});

class App extends React.Component {
  state = { location: null };

  async componentDidMount() {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      await init({
        ios: "9bd6c82e77583020a73ef1af59d0c759",
        android: "043b24fe18785f33c491705ffe5b6935"
      });
      addLocationListener(location => this.updateLocationState(location));
    } else {
      console.error("Location permission denied");
    }
  }

  componentWillUnmount() {
    stop();
  }

  updateLocationState(location) {
    if (location) {
      location.updateTime = new Date().toLocaleString();
      this.setState({ location });
      console.log(location);
    }
  }

  startLocation = () => start();
  stopLocation = () => {
    stop();
    this.setState({ location: null });
  };

  setInterval2000 = () => setInterval(2000);
  setInterval10000 = () => setInterval(10000);
  setNeedAddressTrue = () => setNeedAddress(true);
  setNeedAddressFalse = () => setNeedAddress(false);

  render() {
    const { location } = this.state;
    return (
      <ScrollView style={style.body}>
        <View style={style.controls}>
          <View style={style.button}>
            <Button onPress={this.startLocation} title="开始定位" />
          </View>
          <View style={style.button}>
            <Button onPress={this.stopLocation} title="停止定位" />
          </View>
          <View style={style.button}>
            <Button onPress={this.setInterval2000} title="setInterval(2000)" />
          </View>
          <View style={style.button}>
            <Button onPress={this.setInterval10000} title="setInterval(10000)" />
          </View>
          <View style={style.button}>
            <Button onPress={this.setNeedAddressTrue} title="setNeedAddress(true)" />
          </View>
          <View style={style.button}>
            <Button onPress={this.setNeedAddressFalse} title="setNeedAddress(false)" />
          </View>
        </View>
        <Text style={style.result}>{JSON.stringify(location, null, 2)}</Text>
      </ScrollView>
    );
  }
}

AppRegistry.registerComponent("RNAMapGeolocation", () => App);
