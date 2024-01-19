import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { XMarkIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';

import { theme } from '../theme';

interface Props {
  showSearch: boolean;
  toggleSearch: (value: boolean) => void;
  onChangeSearchText: (text: string) => void;
}

const SearchBar = ({ showSearch, toggleSearch, onChangeSearchText }: Props) => {
  return (
    <View
      className="flex-row justify-end items-center rounded-full"
      style={{
        backgroundColor: showSearch ? theme.bgWhite(0.2) : 'transparent',
      }}>
      {showSearch ? (
        <TextInput
          onChangeText={onChangeSearchText}
          placeholder="Search city"
          placeholderTextColor="lightgray"
          className="pl-6 h-10 pb-1 flex-1 text-base text-white"
        />
      ) : null}
      <TouchableOpacity
        onPress={() => toggleSearch(!showSearch)}
        className="rounded-full p-3 m-1"
        style={{ backgroundColor: theme.bgWhite(0.3) }}>
        {showSearch ? (
          <XMarkIcon size="25" color="white" />
        ) : (
          <MagnifyingGlassIcon size="25" color="white" />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;
