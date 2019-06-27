import React from 'react';
import styled from 'styled-components';

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

export default ({ name, phone, address, onPress }) => (
  <Container activeOpacity={0.75} onPress={onPress}>
    <Header>
      <Typography>{name}</Typography>
      <Detail>{phone}</Detail>
    </Header>
    <Detail>{address}</Detail>
  </Container>
);