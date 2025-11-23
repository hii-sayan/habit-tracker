import { databases, HABIT_COLLECTION_ID, HABIT_DATABASE_ID } from "@/lib/appwrite";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Query } from "react-native-appwrite";
import { Button, Text } from "react-native-paper";
import { useAuth } from "../../lib/auth-context";
import { Habits } from "../../types/database.type";

export default function Index() {
  const { signOut, user } = useAuth();

  const [habits, setHabits] = useState<Habits[]>();

  useEffect(() => {
    fetchHabits();
  }, [user]);
  const fetchHabits = async () => {
    try {
      const response = await databases.listDocuments(
        HABIT_DATABASE_ID,
        HABIT_COLLECTION_ID,
        [Query.equal('user_id', user?.$id ?? "")]
      );
      setHabits(response.documents as Habits[]);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <View style={style.view}>
      <View>
        <Text variant="headlineSmall">Today's Habits</Text>
        <Button mode="text" onPress={signOut} icon="logout" >Logout</Button>
      </View>

      {habits?.length === 0 ? (
        <View>
          <Text>No Habits Found, Create One.</Text>
        </View>
      ) : (
        habits?.map((habit, key) =>
          <View key={key}>
            <Text>{habit.title}</Text>
            <Text>{habit.description}</Text>
            <View>
              {" "}
              <MaterialCommunityIcons name="fire" size={18} color={"#ff9800"} />
            </View>
          </View>
        )
      )}
    </View>
  );
}

const style = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  navButton: {
    width: 80,
    height: 20,
    backgroundColor: "lightblue",
    borderRadius: 10,
    textAlign: "center",
  },
}) 