import React from "react";
import { ImageBackground, ListRenderItemInfo } from "react-native";

import { View, StyleSheet, Modal, Text, TouchableOpacity } from "react-native";
import { save } from "../Storage";
import { JWTContext } from "../Context";
import Icon from "react-native-vector-icons/AntDesign";
import SearchModal from "../components/SearchModal";
import Sorter from "../components/Sorter";

export default function Home() {
  const { jwt, setJwt, ip } = React.useContext(JWTContext);
  const [posts, setPosts] = React.useState<Post[]>([]);
  const [isSearching, setIsSearching] = React.useState(false);
  const [aux, setAux] = React.useState(false);
  const [group, setGroup] = React.useState<Group>(null);
  const [user, setUser] = React.useState<User>(null);

  function logout() {
    setJwt("");
    save("", "");
  }

  React.useEffect(() => {
    async function fetchData() {
      let address = "";

      if (group) address = `${ip}/post/all?groupName=${group.title}`;
      else if (user) address = `${ip}/post/all?username=${user.username}`;
      else address = `${ip}/post/all`;

      let posts = await fetch(address, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      })
        .then((response) => response.json())
        .then((data) => data);
      setPosts(posts);
    }
    fetchData();
  }, [aux, group, user]);

  return (
    <ImageBackground
      source={require("../assets/Background.jpeg")}
      style={styles.backgroundImage}
    >
      <View style={styles.topBar}>
        <TouchableOpacity
          onPress={() => {
            setUser(null);
            setGroup(null);
          }}
        >
          <Icon name="left" style={styles.searchIcon} />
        </TouchableOpacity>
        {group && <Text style={styles.groupName}>Group: {group.title}</Text>}
        {user && <Text style={styles.groupName}>User: {user.username}</Text>}
        <TouchableOpacity onPress={() => setIsSearching(true)}>
          <Icon name="search1" style={styles.searchIcon} />
        </TouchableOpacity>
      </View>

      {group && (
        <View style={styles.secondBar}>
          <Text style={styles.groupDescription}>{group.description}</Text>
        </View>
      )}

      {isSearching && (
        <SearchModal
          closeSearchModal={() => setIsSearching(false)}
          searchResult={(group, user) => {
            setGroup(group);
            setUser(user);
            setIsSearching(false);
          }}
        />
      )}

      <Sorter posts={posts} setAux={setAux} />

      <TouchableOpacity style={styles.button} onPress={logout}>
        <Text style={styles.buttonText}>Sign out</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6FB",
  },
  searchIcon: {
    fontSize: 30,
    color: "#4D5B9E",
  },
  topBar: {
    paddingTop: 20,
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  groupName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4D5B9E",
  },
  secondBar: {
    alignItems: "center",
    marginBottom: 10,
  },
  groupDescription: {
    fontSize: 16,
    color: "#4D5B9E",
    textAlign: "center",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  button: {
    backgroundColor: "#4D5B9E",
    borderRadius: 5,
    paddingVertical: 12,
    marginTop: 20,
    alignItems: "center",
    marginLeft: 35,
    marginRight: 35,
    marginBottom: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});