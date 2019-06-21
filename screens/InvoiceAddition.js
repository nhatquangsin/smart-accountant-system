/* eslint-disable no-shadow */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import i18n from 'i18n-js';
import { connect } from 'react-redux';
import { withTheme, Button, Snackbar } from 'react-native-paper';
import { View, TouchableOpacity, ScrollView, Text } from 'react-native';

import {
  DetailItem,
  DescriptionHeader,
  FooterInvoice,
} from '../containers/InvoiceDetail';
import theme from '../constants/theme';
import { FeatherIcon } from '../components';
import { handle401 } from '../constants/strategies';
import SwipeoutRemove from '../components/SwipeoutRemove';
import { Radio, RadioGroup, AmazingText } from '../containers/InvoiceAddition';
import { logout, addInvoice, getInvoices } from '../redux/actions';
import { Header, Typography, HeaderWrapper } from '../containers/Home';
import { FewStyledContainer } from '../containers/PaymentMethodAddition';

class InvoiceAddition extends React.Component {
  state = {
    type: 0,
    detail: [
      {
        key: Math.random(),
        product: 'a',
        quantity: 1,
        unitPrice: 1,
      },
    ],
    isVisible: false,
  };

  handleAddInvoice = () => {
    const { type, detail } = this.state;
    this.props.addInvoice(
      {
        type,
        detail: detail.map(({ product, quantity, unitPrice }) => ({
          product,
          quantity,
          unitPrice,
        })),
      },
      {
        success: () => {
          this.props.navigation.navigate('Invoice');
          this.props.getInvoices(
            {},
            {
              handle401: () =>
                handle401({
                  logout: this.props.logout,
                  navigation: this.props.navigation,
                }),
            }
          );
        },
        failure: () => {
          this.setState({
            isVisible: true,
          });
        },
        handle401: () =>
          handle401({
            logout: this.props.logout,
            navigation: this.props.navigation,
          }),
      }
    );
  };

  handleAdd = product => {
    const { detail } = this.state;
    this.setState({
      detail: [...detail, product],
    });
  };

  handleRemoveDetail = key => {
    const { detail } = this.state;
    this.setState({
      detail: detail.filter(item => item.key !== key),
    });
  };

  render() {
    const { navigation, isLoading } = this.props;
    const { detail, isVisible, type } = this.state;
    const totalCost = detail.reduce(
      (total, item) => total + item.unitPrice * item.quantity,
      0
    );
    return (
      <View style={{ display: 'flex', flex: 1 }}>
        <HeaderWrapper>
          <Header>
            <TouchableOpacity onPress={() => navigation.navigate('Invoice')}>
              <FeatherIcon color={theme.colors.white} name="chevron-left" />
            </TouchableOpacity>
            <Typography>{i18n.t('invoiceAddition')}</Typography>
            <FeatherIcon color={theme.colors.primary} name="user" />
          </Header>
        </HeaderWrapper>
        <RadioGroup>
          <Radio
            label={i18n.t('purchasedInvoice')}
            selected={type === 0}
            onPress={() => this.setState({ type: 0 })}
          />
          <Radio
            label={i18n.t('selledInvoice')}
            selected={type === 1}
            onPress={() => this.setState({ type: 1 })}
          />
        </RadioGroup>
        <ScrollView>
          {detail.map(({ key, product, quantity, unitPrice }, index) => (
            <SwipeoutRemove
              key={key}
              onRemove={() => this.handleRemoveDetail(key)}
            >
              {index === 0 && (
                <DescriptionHeader
                  product={i18n.t('product')}
                  quantity={i18n.t('quantity')}
                  unitPrice={i18n.t('unitPrice')}
                  cost={i18n.t('cost')}
                />
              )}
              <DetailItem
                product={product}
                quantity={quantity}
                unitPrice={unitPrice}
              />
            </SwipeoutRemove>
          ))}
          {detail.length > 0 && (
            <FooterInvoice color="#ad6b8d" totalCost={totalCost} />
          )}

          <AmazingText
            onPress={() => {
              navigation.navigate('InvoiceProductAddition', {
                handleAdd: this.handleAdd,
              });
            }}
          />
          {detail.length > 0 && (
            <FewStyledContainer paddingTop>
              <Button
                mode="contained"
                style={{ width: 170 }}
                contentStyle={{ height: 50 }}
                onPress={this.handleAddInvoice}
                loading={isLoading}
              >
                <Text>{i18n.t('actionSave')}</Text>
              </Button>
            </FewStyledContainer>
          )}
        </ScrollView>
        <Snackbar
          visible={isVisible}
          onDismiss={() => this.setState({ isVisible: false })}
          action={{ label: 'OK', onPress: () => {} }}
        >
          {i18n.t('messageAddFail')}
        </Snackbar>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.invoice.isLoading,
});
const mapDispatchToProps = {
  logout,
  addInvoice,
  getInvoices,
};

export default withTheme(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(InvoiceAddition)
);