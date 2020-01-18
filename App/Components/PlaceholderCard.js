import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text } from 'react-native'
import styles from './Styles/PlaceholderCardStyle'

const PlaceholderCard = ({ children, style, dark, ...props }) => (
  <View style={[styles.card, style, dark && styles.dark]} {...props}>
    {children}
  </View>
)

export default PlaceholderCard
