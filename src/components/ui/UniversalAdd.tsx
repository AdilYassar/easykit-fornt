/* eslint-disable @typescript-eslint/no-unused-vars */
import {View, Text, StyleSheet, Pressable} from 'react-native';
import React, {FC} from 'react';
import {useCartStore} from '@state/cartStore';
import {Colors, Fonts} from '@utils/Constants';
import CustomText from './CustomText';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {RFValue} from 'react-native-responsive-fontsize';

const UniversalAdd: FC<{item: any}> = ({item}) => {
  const count = useCartStore(state => state.getItemCount(item._id));
  const {addItem, removeItem} = useCartStore();

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: count === 0 ? '#fff' : Colors.secondary},
      ]}>
      {count === 0 ? (
        <Pressable onPress={() => addItem(item)} style={styles.add}>
          <CustomText
            variant="h9"
            fontFamily={Fonts.SemiBold}
            style={styles.addText}>
            Add
          </CustomText>
        </Pressable>
      ) : (
        <View style={styles.counterContainer}>
          <Pressable
            onPress={() => removeItem(item._id)}
            style={styles.counterminus}>
            <Icon name="minus" color="#fff" size={RFValue(16)} />
          </Pressable>
          <CustomText
            fontFamily={Fonts.SemiBold}
            variant="h8"
            style={styles.text}>
            {count}
          </CustomText>
          <Pressable onPress={() => addItem(item)} style={styles.counterPlus}>
            <Icon name="plus" color="#fff" size={RFValue(16)} />
          </Pressable>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: '#fff',
  },
  counterPlus: {
    left: 3,
  },
  counterminus: {right: 3},
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 4,
    paddingVertical: 6,
    justifyContent: 'space-between',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.secondary,
    width: 70,
    borderRadius: 8,
    left: 25,
  },
  addText: {
    color: Colors.secondary,
  },
  add: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
    paddingVertical: 6,
  },
});

export default UniversalAdd;
