import { View, Text, StyleSheet } from 'react-native'
import GeneralHeader from "@/components/GeneralHeader";
import { SearchInfoCard } from '@/components/search';
import { recentSearch } from '@/assets/TempData'; //Delete later
import { useRouter } from 'expo-router';

const SearchResult = () => {
  const router = useRouter();
  const onBackPress = () => {
    //clear something before navigate back
    router.back();
  }

  return (
    <View style={styles.container}>
      <GeneralHeader title={"Vũng Tàu"} onBackPress={() => onBackPress()} />
      <SearchInfoCard
        style={{ marginHorizontal: 20, marginVertical: 15, }}
        searchKeyword={recentSearch[0]?.title}
        period={recentSearch[0].period}
        numOfGuestRoom={recentSearch[0].numOfGuestRoom}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  }
})

export default SearchResult;