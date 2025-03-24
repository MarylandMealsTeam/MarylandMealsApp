import { FlatList, RefreshControl } from "react-native";
import { createContext, Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import FoodCard from "@/components/cards/FoodCard";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { CameraIcon, FilterIcon, SearchIcon } from "lucide-react-native";
import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";
import React from "react";
import { Center } from "@/components/ui/center";
import { Spinner } from "@/components/ui/spinner";
import ContentLayout from "@/components/layouts/ContentLayout";
import { getMenu, resetMenu } from "@/api/menuSession";
import { HStack } from "@/components/ui/hstack";
import FilterView from "@/components/widgets/FilterView";
import HelpButton from "@/components/widgets/HelpButton";
import { Allergen } from "@/types/Allergen";
import Meal from "@/interfaces/Meal";

const HeaderView = ({ setSearchText }: { setSearchText: Dispatch<SetStateAction<string>> }) => {

  return (
    <VStack space="md" className="sticky top-0 pb-3 bg-zinc-100">
      <HStack className="w-full items-center justify-between" >
        <Heading size="3xl" className="text-primary-500">
          Dining Hall Menu
        </Heading>
        <HStack space="2xl">
          <HelpButton title="Menu Legend" message="When browsing the Maryland Meals app, you can easily view allergens and menu items displayed in an intuitive layout designed for quick scanning. Each food item shows essential information including allergen indicators and dietary symbols, helping you identify suitable options at a glance. For a more comprehensive experience, simply tap on any food item to access detailed nutritional information, ingredient lists, and complete allergen details. From this expanded view, you can also log meals to your food diary, track your dietary patterns, or save favorites for quick access later. This seamless interaction makes it simple to make informed dining decisions while managing your dietary preferences and restrictions across all campus dining halls." />
          <FilterView />
        </HStack>
      </HStack>
      <Input className="bg-zinc-200 border-outline-100 rounded-lg">
        <InputSlot className="pl-3">
          <InputIcon as={SearchIcon} />
        </InputSlot>
        <InputField
          onChangeText={(text) => setSearchText(text.toLowerCase())}
          placeholder="Search..."
          selectionColor="#E11932"
          className="text-md"
        />
      </Input>
    </VStack>
  );
};

type FilterContextType = { setDiningHalls: Dispatch<SetStateAction<string[]>>, setAllergens: Dispatch<SetStateAction<Allergen[]>> }

export const FilterContext = createContext<FilterContextType>({
  setDiningHalls: function (value: SetStateAction<string[]>): void {
    throw new Error("Function not implemented.");
  },
  setAllergens: function (value: SetStateAction<Allergen[]>): void {
    throw new Error("Function not implemented.");
  }
});


export default function Food() {
  const [searchText, setSearchText] = useState("");
  const [menu, setMenu] = useState<Meal[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [diningHalls, setDiningHalls] = useState<string[]>([]);
  const [allergens, setAllergens] = useState<Allergen[]>([]);



  const fetchItems = async () => {
    if (refreshing || searchText !== "") { return; }
    setRefreshing(true);
    const data = await getMenu(diningHalls, allergens);
    setMenu(data as Meal[]);
    setRefreshing(false);
  };

  const onRefresh = async () => {
    setMenu([]);
    resetMenu();
    await fetchItems();
  };

  useEffect(() => { fetchItems() }, []);

  // VirtualizedList: You have a large list that is slow to update -
  // make sure your renderItem function renders components that follow React performance 
  // best practices like PureComponent, shouldComponentUpdate,
  // etc. { "contentLength": 9748.3330078125, "dt": 3067, "prevDt": 871 }

  const MenuSpinner = () => {
    return (
      <Center>
        <Spinner size="small" className="py-10 text-primary-500" />
      </Center>
    );
  };

  const ListEmptyView = () => {
    return (
      <Center className="w-full h-[75%]">
        <Heading size="lg">No results found</Heading>
      </Center>
    );

  };



  const FoodLogMemoView = useCallback(({ item }: { item: Meal }) => (<FoodCard item={item} />), []);

  // const [filterMenu, setFilterMenu] = useState(searchFilter);


  // if scrolled too fast it can bug out
  // menu is null at certain times
  return (
    <ContentLayout data={1}>
      <FlatList
        className="px-5"
        data={menu?.filter((food) => food.menu_item.name.toLowerCase().includes(searchText.toLowerCase()))}
        renderItem={FoodLogMemoView}
        keyExtractor={(food) => food.id.toString()}
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[0]}
        onEndReached={fetchItems}
        onEndReachedThreshold={5}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["red"]} tintColor={"red"} />}
        refreshing={refreshing}
        onRefresh={onRefresh}
        ListHeaderComponent={<FilterContext.Provider value={{ setDiningHalls, setAllergens }}><HeaderView setSearchText={setSearchText} /></FilterContext.Provider>}
        ListEmptyComponent={<ListEmptyView />}
        ListFooterComponent={() => refreshing && <MenuSpinner />}
        initialNumToRender={4}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="always"
        removeClippedSubviews
      // getItemLayout={}
      // windowSize={}
      // viewabilityConfig
      // debug
      />
    </ContentLayout>
  );


}
