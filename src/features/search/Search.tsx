/* eslint-disable @typescript-eslint/no-unused-vars */
import { View } from 'react-native'
import React from 'react'
import StickyCategorySearch from './StickyCategorySearch'
import CategorySearchInput from './CategorySearchInput'
import CustomHeader from '@components/ui/CustomHeader'

const Search = () => {
  return (
    <View>
        <CustomHeader title="Search" />
        <CategorySearchInput onSearch={(query: string) => console.log(query)} />
    </View>
  )
}

export default Search