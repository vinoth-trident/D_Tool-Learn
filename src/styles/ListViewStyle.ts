import { StyleSheet } from "react-native";
import { COLORS } from "./CommonStyle";

export const ListView = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      backgroundColor: "#f9f9f9",
    },
    card: {
      backgroundColor: "#fff",
      padding: 15,
      borderRadius: 8,
      marginBottom: 10,
      shadowColor: "#ccc",
      shadowOpacity: 0.8,
      shadowRadius: 4,
      elevation: 2,
    },
    taskHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    taskName: {
      fontSize: 16,
      fontWeight: "bold",
      color:COLORS.primary
    },
    description: {
      fontSize: 14,
      color: "#555",
      marginVertical: 5,
    },
    details: {
      fontSize: 12,
      color: "#777",
    },
    iconButton: {
      marginLeft: 10,
      padding: 5,
    },
    dropdown: {
      position: "absolute",
      width: 200,
      top: 20,
      right: 50,
      zIndex: 9999,
      backgroundColor: "#fff",
      borderRadius: 8,
      paddingHorizontal: 10,
      paddingVertical: 5,
      elevation: 5,
    },
    actionButton: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 4,
    },
    actionLabel: {
      fontSize: 12,
      marginLeft: 10,
      color: "#333",
    },
    searchContainer: {
      flexDirection: "row",
      alignItems: "center",
      padding: 10,
    },
    dropdownButtonStyle: {
      height: 36,
      backgroundColor: "#E9ECEF",
      borderRadius: 7,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 12,
    },
    sortIcons: {
      flexDirection: "row",
      alignItems: "center",
    },
    input: {
      flexDirection: "row",
      alignItems: "center",
      height: 35,
      width:"auto",
      borderRadius: 7,
      backgroundColor: "#E9ECEF",
    },
    searchInput: {
      flex: 1,
      paddingHorizontal: 10,
      fontSize: 14,
    },
    searchIcon: {
      padding: 7,
      position:'absolute',
      right:0,
      backgroundColor:COLORS.primary,
      borderTopRightRadius:7
    
    },
  });