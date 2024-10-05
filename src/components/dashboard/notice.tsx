/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { View, StyleSheet } from 'react-native';
import React, { FC } from 'react';
import { NoticeHeight } from '@utils/scaling';
import { Colors, Fonts } from '@utils/Constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomText from '@components/ui/CustomText';
import { Defs, G, Path, Svg, Use } from 'react-native-svg';
import { wavyData } from '@utils/dummyData';

const Notice: FC = () => {
  return (
    <View style={{ height: NoticeHeight }}>
      <View style={styles.container}>
        <View style={styles.noticeContainer}>
          <SafeAreaView style={{ padding: 10 }}>
            <CustomText style={styles.heading} variant="h9" fontFamily={Fonts.Bold}>
              It's raining today at your location
            </CustomText>
            <CustomText variant="h9" style={styles.textCenter}>
              Delivery might get late
            </CustomText>
          </SafeAreaView>
        </View>
      </View>
      <Svg
        width="100%"
        height="35"
        fill="#CCD5E4"
        preserveAspectRatio="none"
        viewBox="0 0 4000 1000"
        style={styles.wave}
      >
        <Defs>
          <Path id="wavepath" d={wavyData} />
        </Defs>
        <G>
          <Use xlinkHref="#wavepath" y="321" />
        </G>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#CCD5E4',
  },
  noticeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CCD5E4'
  },
  textCenter: {
    textAlign: 'center',
    marginBottom: 8,
  },
  wave:{
width:'100%',
transform:[{rotateX:'180deg'}]
  },
  heading: {
    textAlign: 'center',
    color: '#2D3875',
    marginBottom: 8,
  },
});

export default Notice;
