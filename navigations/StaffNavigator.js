import React from 'react';
import {
  createBottomTabNavigator,
  createStackNavigator,
} from 'react-navigation';
import i18n from 'i18n-js';
import { Localization } from 'expo';
import FeatherIcon from '../components/FeatherIcon';

import Home from '../screens/Home';
import Profile from '../screens/Profile';

import Invoice from '../screens/Invoice';
import InvoiceDetail from '../screens/InvoiceDetail';

import Receipt from '../screens/Receipt';
import ReceiptDetail from '../screens/ReceiptDetail';

import Transaction from '../screens/Transaction';
import TransactionDetail from '../screens/TransactionDetail';

import Account from '../screens/Account';
import AccountDetail from '../screens/AccountDetail';

import PaymentMethod from '../screens/PaymentMethod';
import PaymentMethodAddition from '../screens/PaymentMethodAddition';

import EmployeeManagement from '../screens/EmployeeManagement';
import EmployeeAddition from '../screens/EmployeeAddition';
import EmployeeDetail from '../screens/EmployeeDetail';

import CustomerManagement from '../screens/CustomerManagement';
import CustomerAddition from '../screens/CustomerAddition';
import theme from '../constants/theme';
import { en, vi } from '../constants/localization';

i18n.fallbacks = true;
i18n.translations = { en, vi };
i18n.locale = Localization.locale;

export const HomeStack = createStackNavigator(
  {
    Home,
    Profile,
  },
  {
    headerMode: 'none',
  }
);

const InvoiceStack = createStackNavigator(
  {
    Invoice,
    InvoiceDetail,
  },
  {
    headerMode: 'none',
  }
);

const ReceiptStack = createStackNavigator(
  {
    Receipt,
    ReceiptDetail,
  },
  {
    headerMode: 'none',
  }
);

const CustomerStack = createStackNavigator(
  {
    CustomerManagement,
    CustomerAddition,
  },
  {
    headerMode: 'none',
  }
);

HomeStack.navigationOptions = {
  tabBarLabel: i18n.t('dashboard'),
  tabBarIcon: ({ focused }) => (
    <FeatherIcon focused={focused} name="bar-chart-2" />
  ),
};

InvoiceStack.navigationOptions = {
  tabBarLabel: i18n.t('invoice'),
  tabBarIcon: ({ focused }) => <FeatherIcon focused={focused} name="feather" />,
};

ReceiptStack.navigationOptions = {
  tabBarLabel: i18n.t('receipt'),
  tabBarIcon: ({ focused }) => (
    <FeatherIcon focused={focused} name="clipboard" />
  ),
};

CustomerStack.navigationOptions = {
  tabBarLabel: i18n.t('customer'),
  tabBarIcon: ({ focused }) => <FeatherIcon focused={focused} name="users" />,
};

const StaffNavigator = createBottomTabNavigator(
  {
    HomeStack,
    CustomerStack,
    InvoiceStack,
    ReceiptStack,
  },
  {
    tabBarOptions: {
      activeTintColor: theme.colors.primary,
    },
  }
);

export default StaffNavigator;