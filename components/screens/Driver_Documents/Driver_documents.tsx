import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import {
  useNavigation,
  useRoute,
  RouteProp,
  NavigationProp,
  useFocusEffect,
} from "@react-navigation/native";
import {
  getDriverDocumentData,
  updateDriverDocumentDatawithstaus,
} from "../../../api-requests/driverDocument";

type RootStackParamList = {
  Home: undefined;
  HelpScreen: undefined;
  DriverDocuments: { driverId: number };
  DocumentReviewScreen: { driverId: number };
  Insurance: { driverId: number };
  Aadhar_document: { driverId: number };
  Pancard: { driverId: number };
  Rc_document: { driverId: number };
  Review_screen: { driverId: number };
};

type HomeScreenNavigationProp = NavigationProp<
  RootStackParamList,
  keyof RootStackParamList
>;
type DriverDocumentsRouteProp = RouteProp<
  RootStackParamList,
  "DriverDocuments"
>;

export default function Driver_documents() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const route = useRoute<DriverDocumentsRouteProp>();
  const { driverId } = route.params;
  console.log("Driver ID: ", driverId);

  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const [uploadedDocs, setUploadedDocs] = useState<Record<string, boolean>>({
    "Driving License": false,
    "Registration certificate": false,
    "Aadhar card": false,
    Pancard: false,
    Insurance: false,
  });

 
    const fetchDocuments = async () => {
      try {
        const driverDocuments = await getDriverDocumentData(driverId);
        console.log("Driver Documents Response:", driverDocuments); // Log the response

        const uploaded = { ...uploadedDocs };

        // Check if the response contains missing documents
        if (driverDocuments.missingDocuments) {
          console.log("Missing Documents:", driverDocuments.missingDocuments); // Log missing documents
          // Mark uploaded documents based on the response
          driverDocuments.uploadedDocuments.forEach((doc: string) => {
            uploaded[doc] = true; // Mark as uploaded
          });
          setUploadedDocs(uploaded);
        } else {
          // If the response is an array of documents, handle accordingly
          driverDocuments.forEach((doc: any) => {
            uploaded[doc.doc_type] = true; // Mark as uploaded
          });
          setUploadedDocs(uploaded);
        }
      } catch (error) {
        console.error("Error fetching driver documents:", error);
        Alert.alert(
          "Error",
          "Failed to fetch driver documents. Please try again later."
        );
      }
    };

    useFocusEffect(
      React.useCallback(() => {
        fetchDocuments(); // Fetch documents when the screen is focused
      }, [driverId])
    );

  const handleCheckDocuments = async () => {
    try {
      const response = await getDriverDocumentData(driverId);
      console.log("Check Documents Response:", response); // Log the response

      if (response.missingDocuments && response.missingDocuments.length > 0) {
        // Navigate to the first missing document's screen
        response.missingDocuments.forEach((missingDoc: string) => {
          const screen = screenMapping[missingDoc];
          if (screen) {
            navigation.navigate(screen, { driverId } as never);
          }
        });
      } else {
        // All documents are present, update driver document status if necessary
       const updateResponse = await updateDriverDocumentDatawithstaus(
         driverId,
         {
           status: "under_verification",
         }
       );

       if (updateResponse && updateResponse.message) {
         Alert.alert("Success", updateResponse.message);
       }

       navigation.navigate("Review_screen", { driverId });

      }
    } catch (error) {
      console.error("Error checking documents:", error);
      Alert.alert(
        "Error",
        "Failed to check documents. Please try again later."
      );
    }
  };


  const handlePress = (
    taskName: string,
    screenName: keyof RootStackParamList
  ) => {
    setSelectedTask(taskName);

    // Prevent navigation for already uploaded documents
    if (uploadedDocs[taskName]) {
      Alert.alert(
        "Document Already Uploaded",
        `You have already uploaded the ${taskName}.`
      );
      return; // Stop the function if the document is already uploaded
    }

    // Handle navigation based on whether the screen needs driverId
    if (
      screenName === "DriverDocuments" ||
      screenName === "Insurance" ||
      screenName === "Aadhar_document" ||
      screenName === "Pancard" ||
      screenName === "Rc_document" ||
      screenName === "DocumentReviewScreen"
    ) {
      // Screens that expect driverId
      navigation.navigate(screenName, { driverId: driverId });
    } else {
      // Screens that don't expect driverId (like Home or HelpScreen)
      console.error();
    }
  };

  const screenMapping: Record<string, keyof RootStackParamList> = {
    "Driving License": "DriverDocuments",
    "Registration certificate": "Rc_document",
    "Aadhar card": "Aadhar_document",
    Pancard: "Pancard",
    Insurance: "Insurance",
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#000000" barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image
              source={require("../../../assets/images/Elemove.png")}
              style={styles.logoElemove}
            />
            <Text style={styles.headerTitle}>XLR</Text>
          </View>
          <TouchableOpacity
            style={styles.helpButton}
            onPress={() => navigation.navigate("HelpScreen")}
          >
            <Text style={styles.helpText}>Help ?</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <View style={styles.welcomeContent}>
            <Text style={styles.welcomeText}>Welcome</Text>
            <Text style={styles.instructions}>
              Here's what you need to do to set up your account
            </Text>
          </View>

          <View style={styles.taskList}>
            {[
              "Driving License",
              "Registration certificate",
              "Aadhar card",
              "Pancard",
              "Insurance",
            ].map((doc) => (
              <TouchableOpacity
                key={doc}
                style={[
                  styles.taskItem,
                  selectedTask === doc && { backgroundColor: "#FFD700" },
                ]}
                onPress={() => handlePress(doc, screenMapping[doc])}
              >
                <Text
                  style={[
                    styles.taskText,
                    uploadedDocs[doc] && { color: "black" }, // Green for uploaded
                  ]}
                >
                  {uploadedDocs[doc] ? "✔️ " : ""}
                  {doc}
                </Text>
                <FontAwesome
                  name="angle-right"
                  size={24}
                  color={selectedTask === doc ? "#000" : "black"}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity
          style={styles.bottomButton}
          onPress={handleCheckDocuments}
        >
          <Text style={styles.buttonText}>Proceed to Next</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  header: {
    backgroundColor: "#000",
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#FFD700",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoElemove: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  headerTitle: {
    color: "#FFD700",
    fontWeight: "bold",
    fontSize: 24,
  },
  helpButton: {
    backgroundColor: "#FFD700",
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  helpText: {
    color: "#000",
    fontWeight: "bold",
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  welcomeContent: {
    marginBottom: 30,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFD700",
    marginBottom: 10,
  },
  instructions: {
    fontSize: 16,
    color: "#FFD700",
  },
  taskList: {
    marginTop: 20,
  },
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFD700",
    padding: 18,
    borderRadius: 8,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#FFD700",
  },
  taskText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  bottomButton: {
    backgroundColor: "#FFD700",
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    borderRadius: 8,
    marginTop: 30,
    marginBottom: 40,
  },
  buttonText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
  },
});