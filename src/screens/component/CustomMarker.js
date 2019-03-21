import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, } from 'react-native';

const propTypes = {
  name: PropTypes.string.isRequired,
  fontSize: PropTypes.number,
};

const defaultProps = {
  fontSize: 13,
  name: "P"
};

class CustomMarker extends React.Component {
  render() {
    const { fontSize, name } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.bubble}>
          <Text style={styles.name}>{name}</Text>
        </View>
        <View style={styles.arrowBorder} />
      </View>
    );
  }
}

CustomMarker.propTypes = propTypes;
CustomMarker.defaultProps = defaultProps;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
  },
  bubble: {
    flex: 0,
    alignSelf: 'flex-start',
    backgroundColor: '#A4B0BE',
    padding: 5,
    borderRadius: 3,
    borderColor: '#A4B0BE',
    borderWidth: 0.5
  },
  dollar: {
    color: '#FFFFFF',
    fontSize: 10,
  },
  name: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 5
  },
  arrow: {
    backgroundColor: 'transparent',
    borderWidth: 4,
    borderColor: 'transparent',
    borderTopColor: '#FFF',
    alignSelf: 'center',
    marginTop: -9,
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderWidth: 8,
    borderColor: 'transparent',
    borderTopColor: '#A4B0BE',
    alignSelf: 'center',
    marginTop: -0.5,
  },
});

export default CustomMarker;
