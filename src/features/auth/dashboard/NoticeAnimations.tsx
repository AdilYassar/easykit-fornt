
/* eslint-disable @typescript-eslint/no-unused-vars */
import { View, Text, StyleSheet, Animated as RNAnimated} from 'react-native';
import React, { FC } from 'react';
import { NoticeHeight } from '@utils/scaling';
import Notice from '@components/dashboard/notice';


const NOTICE_HEIGHT = -(NoticeHeight + 12 );
const NoticeAnimations: FC<{noticePosition:any; children:React.ReactElement}> = ({noticePosition, children}) => {

    return (
    <View style={styles.container}>
     <RNAnimated.View style={[styles.noticeContainer, {transform:[{translateY:noticePosition}]}]}>
      <Notice />
     </RNAnimated.View>

     <RNAnimated.View style={[styles.contentContainer ,{paddingTop:noticePosition.interpolate({
        inputRange:[NOTICE_HEIGHT, 0],
        outputRange:[0, NOTICE_HEIGHT + 20],
     })}]}>
        {children}
        </RNAnimated.View>

    </View>
  );
};



const styles = StyleSheet.create({
    noticeContainer:{
        width:'100%',
        zIndex:999,
        position:'absolute',
    },
    contentContainer:{
        flex:1,
        width:'100%',
    },
    container:{
        flex:1,
        backgroundColor:'#fff',
    },
});
export default NoticeAnimations;