/* eslint-disable @typescript-eslint/no-unused-vars */
import { View, Text, StyleSheet, Image } from 'react-native';
import React, { FC } from 'react';
import ScalePress from '@components/ui/ScalePress';
import { navigate } from '@utils/Navigation';
import CustomText from '@components/ui/CustomText';
import { Fonts } from '@utils/Constants';
import { useNavigation } from '@react-navigation/native';


const CategoryContainer:FC<{data:any}> = ({data}) => {
    const navigation = useNavigation(); // Access Navigation
    const renderItems = (items:any[])=>{
        return (<>{items.map((item, index)=>{
            return(
<ScalePress onPress={()=>navigate('Detail')} key={index} style={styles.item}>

    <View style={styles.imageContainer}>
        <Image source= {item.image} style = {styles.image}/>
    </View>
    <CustomText variant="h8" style={styles.text} fontFamily={Fonts.Medium} >{item.name}</CustomText>
</ScalePress>

            );
        })}</>
        );
    };
  return (
    <View style ={styles.container}>
      <View style = {styles.row}>{renderItems(data?.slice(0,4))}</View>
      <View style = {styles.row}>{renderItems(data?.slice(4))}</View>

    </View>
  );
};

const styles = StyleSheet.create({
    container:{
        marginVertical:15,

    },
    row:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'baseline',
        marginBottom:25,
    },
    text:{
        width:100,
        left:-20,
textAlign:'center',
    },
    item:{
        width:'25%',
        justifyContent:'center',
        alignItems:'center',
    },
    imageContainer:{
        width:60,
        height:80,
        justifyContent: 'center',
        alignItems:'center',
        borderRadius:10,
        padding:6,
        backgroundColor:'#E5F3F3',
        marginBottom:8,


    },
    image:{
        width:'100%',
        height:'100%',
        resizeMode:'contain',
    },
});

export default CategoryContainer;
