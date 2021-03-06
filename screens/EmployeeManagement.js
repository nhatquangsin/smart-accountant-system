/* eslint-disable no-nested-ternary */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import i18n from 'i18n-js';
import {
  View,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  LayoutAnimation,
} from 'react-native';
import { connect } from 'react-redux';
import { withTheme, Snackbar } from 'react-native-paper';

import theme from '../constants/theme';
import { handle401 } from '../constants/strategies';
import { logout, getEmployees, removeEmployee } from '../redux/actions';
import { EmployeeItem } from '../containers/EmployeeManagement';
import { FeatherIcon, Loading, Searchbar, Empty } from '../components';
import { HeaderWrapper, Header, Typography } from '../containers/Home';

class EmployeeManagement extends React.Component {
  state = {
    searchText: '',
    timer: undefined,
    refreshing: false,
    visibleSnackbar: false,
  };

  componentDidMount = () => {
    this.props.getEmployees(
      {},
      {
        handle401: () =>
          handle401({
            logout: this.props.logout,
            navigation: this.props.navigation,
          }),
      }
    );
  };

  _onRefresh = () => {
    this.setState({ refreshing: true, searchText: '' });
    this.props.getEmployees(
      {},
      {
        success: () => {
          this.setState({ refreshing: false });
        },
        handle401: () =>
          handle401({
            logout: this.props.logout,
            navigation: this.props.navigation,
          }),
      }
    );
  };

  handleSearch = query => {
    const { timer } = this.state;
    clearTimeout(timer);
    this.setState({
      searchText: query,
      timer: setTimeout(() => {
        this.props.getEmployees(
          {
            search: query,
          },
          {
            handle401: () =>
              handle401({
                logout: this.props.logout,
                navigation: this.props.navigation,
              }),
          }
        );
      }, 300),
    });
  };

  handleRemove = _id => {
    this.props.removeEmployee(_id, {
      success: () => {
        LayoutAnimation.spring();
      },
      failure: () => {
        this.setState({ visibleSnackbar: true });
      },
      handle401: () =>
        handle401({
          logout: this.props.logout,
          navigation: this.props.navigation,
        }),
    });
  };

  render() {
    const { navigation, employees, info } = this.props;
    const { searchText, refreshing, visibleSnackbar } = this.state;
    return (
      <View style={{ display: 'flex', flex: 1 }}>
        <HeaderWrapper>
          <Header>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <FeatherIcon color={theme.colors.white} name="chevron-left" />
            </TouchableOpacity>
            <Typography>{i18n.t('employeeManagement')}</Typography>
            <TouchableOpacity
              onPress={() => navigation.navigate('EmployeeAddition')}
            >
              <FeatherIcon color={theme.colors.white} name="plus" />
            </TouchableOpacity>
          </Header>
        </HeaderWrapper>
        <Searchbar value={searchText} onChangeText={this.handleSearch} />

        {employees ? (
          <ScrollView
            refreshControl={
              <RefreshControl
                onRefresh={this._onRefresh}
                refreshing={refreshing}
              />
            }
          >
            {!employees.employees.length ? (
              <Empty name={i18n.t('employee')} />
            ) : (
              employees.employees
                .filter(employee => employee._id !== info._id)
                .map(employee => (
                  <EmployeeItem
                    editable
                    onEdit={() =>
                      navigation.navigate('EmployeeAddition', { employee })
                    }
                    onRemove={() => this.handleRemove(employee._id)}
                    key={employee._id}
                    onPress={() =>
                      navigation.navigate('EmployeeDetail', { employee })
                    }
                    fullname={employee.fullname}
                    username={employee.username}
                    role={
                      employee.role === 1
                        ? i18n.t('staff')
                        : employee.role === 2
                        ? i18n.t('accountant')
                        : i18n.t('manager')
                    }
                    color={
                      employee.role === 1
                        ? '#8ec448'
                        : employee.role === 2
                        ? '#f87d4d'
                        : '#e05246'
                    }
                    phone={employee.phone}
                    email={employee.email}
                  />
                ))
            )}
          </ScrollView>
        ) : (
          <Loading />
        )}
        <Snackbar
          visible={visibleSnackbar}
          onDismiss={() => this.setState({ visibleSnackbar: false })}
          action={{ label: 'OK', onPress: () => {} }}
        >
          {i18n.t('messageDeleteFail')}
        </Snackbar>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  employees: state.employee.employees,
  info: state.user.info,
});
const mapDispatchToProps = {
  logout,
  getEmployees,
  removeEmployee,
};

export default withTheme(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(EmployeeManagement)
);
