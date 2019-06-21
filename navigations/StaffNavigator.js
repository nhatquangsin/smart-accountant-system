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

import InvoiceAddition from '../screens/InvoiceAddition';
import InvoiceProductAddition from '../screens/InvoiceProductAddition';

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
    InvoiceAddition,
    Invoice,
    InvoiceDetail,
    InvoiceProductAddition,
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
    InvoiceStack,
    HomeStack,
    CustomerStack,
    ReceiptStack,
  },
  {
    tabBarOptions: {
      activeTintColor: theme.colors.primary,
    },
  }
);

export default StaffNavigator;
