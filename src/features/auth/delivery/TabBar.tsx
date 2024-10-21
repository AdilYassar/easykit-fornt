/* eslint-disable @typescript-eslint/no-unused-vars */
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import React, { FC } from 'react';
import { Colors, Fonts } from '@utils/Constants';
import CustomText from '@components/ui/CustomText';

interface TabBarProps {
  selectedTab: 'available' | 'delivered';
  onTabChange: (tab: 'available' | 'delivered') => void;
}

const TabBar: FC<TabBarProps> = ({ selectedTab, onTabChange }) => {
  return (
    <View style={styles.tabContainer}>
      {/* Available Tab */}
      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.tab, selectedTab === 'available' && styles.activeTab]}
        onPress={() => onTabChange('available')}
      >
        <CustomText
          variant="h8"
          fontFamily={Fonts.SemiBold}
          style={[
            styles.tabText,
            selectedTab === 'available' ? styles.activeTabText : styles.inActiveTabText,
          ]}
        >
          Available
        </CustomText>
      </TouchableOpacity>

      {/* Delivered Tab */}
      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.tab, selectedTab === 'delivered' && styles.activeTab]}
        onPress={() => onTabChange('delivered')}
      >
        <CustomText
          variant="h8"
          fontFamily={Fonts.SemiBold}
          style={[
            styles.tabText,
            selectedTab === 'delivered' ? styles.activeTabText : styles.inActiveTabText,
          ]}
        >
          Delivered
        </CustomText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
    
  },
  tab: {
    paddingVertical: 10,
    borderRadius: 25,
    borderWidth: 2,
    width: '30%',
    margin: 10,
    borderColor: Colors.border,
    alignItems: 'center',
   
  },
  activeTab: {
    backgroundColor: Colors.secondary,
    borderColor: Colors.secondary,
  },
  tabText: {
    color: Colors.text,
  },
  activeTabText: {
    color: 'white',
  },
  inActiveTabText: {
    color: Colors.disabled,
  },
});

export default TabBar;
