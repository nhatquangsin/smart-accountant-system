import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import styled from 'styled-components';
import SwipeoutRemove from '../../components/SwipeoutRemove';

const Container = styled.TouchableOpacity`
  display: flex;
  flex-direction: column;

  padding: 12px;
  background-color: #fff;
  width: 100%;
  border-bottom-color: #f1f1f1;
  border-bottom-width: 2px;
`;

const Header = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

const Typography = styled.Text`
  font-size: 18px;
`;

const Detail = styled.Text``;

export default ({ onRemove, name, phone, address }) => (
  <SwipeoutRemove onRemove={onRemove}>
    <Container activeOpacity={0.75}>
      <Header>
        <Typography>{name}</Typography>
        <Detail>{phone}</Detail>
      </Header>
      <Detail>{address}</Detail>
    </Container>
  </SwipeoutRemove>
);
