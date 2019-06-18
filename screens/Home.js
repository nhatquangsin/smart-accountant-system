/* eslint-disable react/destructuring-assignment */
import React from 'react';
import i18n from 'i18n-js';
import { connect } from 'react-redux';
import { withTheme } from 'react-native-paper';
import {
  View,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from 'react-native';

import {
  HeaderWrapper,
  Header,
  Typography,
  MenuContainer,
  MenuItem,
  FieldContainer,
  StyledField,
} from '../containers/Home';
import theme from '../constants/theme';
import { handle401 } from '../constants/strategies';
import { FeatherIcon, Loading } from '../components';
import { logout, getDashboard } from '../redux/actions';

class Home extends React.Component {
  state = {
    refreshing: false,
  };

  componentDidMount = () => {
    this.props.getDashboard({
      handle401: () =>
        handle401({
          logout: this.props.logout,
          navigation: this.props.navigation,
        }),
    });
  };

  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.props.getDashboard({
      success: () => {
        this.setState({ refreshing: false });
      },
      handle401: () =>
        handle401({
          logout: this.props.logout,
          navigation: this.props.navigation,
        }),
    });
  };

  render() {
    const { navigation, dashboard } = this.props;
    const { refreshing } = this.state;
    return (
      <View style={{ display: 'flex', flex: 1 }}>
        <HeaderWrapper>
          <Header>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
              <FeatherIcon color={theme.colors.white} name="user" />
            </TouchableOpacity>
            <Typography>{i18n.t('dashboard')}</Typography>
            <FeatherIcon color={theme.colors.primary} name="user" />
          </Header>
        </HeaderWrapper>
        {dashboard ? (
          <ScrollView
            refreshControl={
              <RefreshControl
                onRefresh={this._onRefresh}
                refreshing={refreshing}
              />
            }
          >
            <MenuContainer>
              <MenuItem
                onPress={() => navigation.navigate('PaymentMethod')}
                icon="shopping-cart"
                number={dashboard.totalCategory}
                name={i18n.t('paymentMethod')}
              />

              <FieldContainer>
                <StyledField left>
                  <MenuItem
                    mini
                    onPress={() => navigation.navigate('EmployeeManagement')}
                    color="#f87d4d"
                    icon="briefcase"
                    number={dashboard.totalEmployee}
                    name={i18n.t('employeeManagement')}
                  />
                </StyledField>
                <StyledField right>
                  <MenuItem
                    mini
                    onPress={() => navigation.navigate('CustomerManagement')}
                    color="#e05246"
                    icon="users"
                    number={dashboard.totalCustomer}
                    name={i18n.t('customerManagement')}
                  />
                </StyledField>
              </FieldContainer>
            </MenuContainer>
          </ScrollView>
        ) : (
          <Loading />
        )}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  dashboard: state.dashboard.dashboard,
});
const mapDispatchToProps = {
  logout,
  getDashboard,
};

export default withTheme(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Home)
);
