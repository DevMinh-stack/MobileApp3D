import { fetchAllItems } from "@/app/service/itemService";
import CategoryCard from "@/components/CategoriesCard";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native";

export default function Index() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadItems() {
      try {
        const data = await fetchAllItems();
        setItems(data);
        console.log(data, "data");
      } catch (err: any) {
        console.error("Failed to fetch items:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadItems();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 bg-primary items-center justify-center">
        <ActivityIndicator size="large" color="#fff" />
        <Text className="text-white mt-3">Loading items...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 bg-primary items-center justify-center">
        <Text className="text-red-400">Failed to load items: {error}</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full h-full" />

      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        {/* Logo */}
        <Image source={icons.logoInservio} className="w-14 h-14 mt-20 mb-4 mx-auto" />

        <View className="flex-1 mt-5">
          {/* Search */}
          <SearchBar />
        </View>

        {/* Categories từ API */}
        <Text className="text-lg font-bold text-white mt-8 mb-4">
          BROWSE BY CATEGORIES
        </Text>

        <View className="flex-row flex-wrap justify-between">
          {items.map((item) => (
            <CategoryCard
              key={item.id}
              title={item.name}
              imagaes={{ uri: item.image || "https://via.placeholder.com/150" }}
              onPress={() => console.log("Go to", item.name)}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
