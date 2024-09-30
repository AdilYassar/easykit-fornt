/* eslint-disable @typescript-eslint/no-unused-vars */
import { View, StyleSheet, Image } from 'react-native';
import React, { FC, useMemo } from 'react';
import AutoScroll from '@homielab/react-native-auto-scroll';
import { screenHeight, screenWidth } from '@utils/scaling';
import { imageData } from '@utils/dummyData'; // Assuming imageData is an array of image sources

const ProductSlider: FC = () => {
  const rows = useMemo(() => {
    const result = [];
    for (let i = 0; i < imageData.length; i += 4) {
      result.push(imageData.slice(i, i + 4));
    }
    return result;
  }, []);

  return (
    <View pointerEvents="none">
      <AutoScroll style={styles.autoScroll} endPaddingWidth={0} duration={10000}>
        <View style={styles.gridContainer}>
          {rows.map((row: typeof imageData, rowIndex: number) => (
            <MemoizedRow key={rowIndex} row={row} rowIndex={rowIndex} />
          ))}
        </View>
      </AutoScroll>
    </View>
  );
};

const Row: FC<{ row: typeof imageData; rowIndex: number }> = ({ row, rowIndex }) => {
  return (
    <View style={styles.row}>
      {row.map((image, imageIndex) => {
        const horizontalShift = rowIndex % 2 === 0 ? -18 : 18;
        return (
          <View
            key={imageIndex}
            style={[
              styles.itemContainer,
              { transform: [{ translateX: horizontalShift }] }
            ]}
          >
            <Image source={image} style={styles.image} />
          </View>
        );
      })}
    </View>
  );
};

const MemoizedRow = React.memo(Row);

const styles = StyleSheet.create({
  autoScroll: {
    position: 'absolute',
    zIndex: -2,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  gridContainer: {
    justifyContent: 'center',
    overflow: 'visible',
    alignItems: 'center',
  },
  itemContainer: {
    marginBottom: 12,
    marginHorizontal: 10,
    width: screenWidth * 0.15,
    height: screenHeight * 0.15,
    backgroundColor: '#c1ff72',
    borderRadius: 25,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});

export default ProductSlider;
