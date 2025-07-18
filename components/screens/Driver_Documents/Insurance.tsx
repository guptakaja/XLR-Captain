import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Image, StatusBar, ScrollView, StyleSheet, Modal } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation, useRoute, NavigationProp, RouteProp } from '@react-navigation/native';
import { postDriverDocumentData } from '../../../api-requests/driverDocument';

type RootStackParamList = {
  Home: undefined;
  HelpScreen: undefined;
  Insurance: { driverId: number };
  HomeScreen: { driverId: number };
  Review_screen: { driverId: number };
};

type InsuranceScreenNavigationProp = NavigationProp<RootStackParamList, 'Insurance'>;
type InsuranceScreenRouteProp = RouteProp<RootStackParamList, 'Insurance'>;

const Insurance: React.FC = () => {
  const navigation = useNavigation<InsuranceScreenNavigationProp>();
  const route = useRoute<InsuranceScreenRouteProp>();

  const [frontImage, setFrontImage] = useState<string | null>(null);
  const [backImage, setBackImage] = useState<string | null>(null);
  const [docType] = useState<string>("Insurance");
  const [docNumber, setDocNumber] = useState<string>("");
  const [status] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false); // Added loading state
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [docNumberError, setDocNumberError] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null); 


  const driverId = route.params.driverId;

  const pickImage = async (setImage: React.Dispatch<React.SetStateAction<string | null>>) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
const insuranceNumberRegex = /^(?=.*[A-Z])[A-Z0-9]{10,17}$/;

  const uploadImages = async () => {
    // Reset success message and start showing the loader
    setSuccessMessage(null);
    setLoading(true); // Show loader

    // Ensure images and document number are provided
    if (!frontImage || !backImage) {
      console.error("Both front and back images are required");
      setLoading(false);
      return;
    }

    if (!docNumber) {
      console.error("Document number is required");
      setLoading(false);
      return;
    }
    // Validate Insurance Number
    if (!insuranceNumberRegex.test(docNumber)) {
      setDocNumberError(
        "Please enter a valid Insurance number (e.g., INS1234567890)."
      );
      setLoading(false);
      return;
    }

    let formData = new FormData();
    formData.append("front_image", {
      uri: frontImage,
      name: frontImage.split("/").pop() || "frontImage.jpg",
      type: "image/jpeg",
    } as any);
    formData.append("back_image", {
      uri: backImage,
      name: backImage.split("/").pop() || "backImage.jpg",
      type: "image/jpeg",
    } as any);
    formData.append("doc_type", docType);
    formData.append("doc_number", docNumber);
    formData.append("status", JSON.stringify(status));
    formData.append("driver_id", driverId.toString());

    try {
      const response = await postDriverDocumentData(formData);
      console.log("Upload successful:", response);

      // Show success message and hide loader
      setSuccessMessage("Document submitted successfully");
      setShowSuccessModal(true); // Show success modal
       navigation.goBack();
    } catch (error) {
      console.error("Error uploading images:", error);
    } finally {
      // Hide loader once the process is complete
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <FontAwesome
          name="arrow-left"
          size={24}
          color="#FFD700"
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>Insurance Document</Text>
      </View>
      <StatusBar backgroundColor={"#000"} barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        <View style={styles.content}>
          <Text style={styles.label}>Insurance Number</Text>
          <TextInput
            value={docNumber}
            onChangeText={(text) => {
              setDocNumber(text);
              setDocNumberError(null); // Reset error when user types
            }}
            style={[styles.input, docNumberError ? styles.inputError : null]}
            placeholder="Enter Insurance number..."
          />

          {docNumberError && (
            <Text style={styles.errorText}>{docNumberError}</Text>
          )}

          <Text style={styles.label}>Front Image</Text>
          <View style={styles.imageContainer}>
            {frontImage ? (
              <Image source={{ uri: frontImage }} style={styles.image} />
            ) : (
              <View style={styles.placeholder}>
                <Text style={styles.placeholderText}>
                  Front side of your Document
                </Text>
              </View>
            )}
            <TouchableOpacity
              style={styles.uploadButton}
              onPress={() => pickImage(setFrontImage)}
            >
              <MaterialIcons
                name="add-photo-alternate"
                size={24}
                color="black"
              />
              <Text style={styles.uploadButtonText}>Upload</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Back Image</Text>
          <View style={styles.imageContainer}>
            {backImage ? (
              <Image source={{ uri: backImage }} style={styles.image} />
            ) : (
              <View style={styles.placeholder}>
                <Text style={styles.placeholderText}>
                  Back side of your Document
                </Text>
              </View>
            )}
            <TouchableOpacity
              style={styles.uploadButton}
              onPress={() => pickImage(setBackImage)}
            >
              <MaterialIcons
                name="add-photo-alternate"
                size={24}
                color="black"
              />
              <Text style={styles.uploadButtonText}>Upload</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.submitButton}
            onPress={uploadImages}
            disabled={loading}
          >
            <Text style={styles.submitButtonText}>
              {loading ? "Submitting..." : "Submit"}
            </Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000", // Main BG
  },
  header: {
    backgroundColor: "#000",
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: "#FFD700",
  },
  headerTitle: {
    color: "#FFD700",
    fontWeight: "bold",
    fontSize: 20,
    marginLeft: 10,
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  label: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#FFD700", // Primary text
  },
  imageContainer: {
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 5,
    marginBottom: 10,
  },
  placeholder: {
    height: 200,
    borderWidth: 1,
    borderRadius: 5,
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    borderColor: "#FFD700",
  },
  placeholderText: {
    color: "#ccc", // Placeholder
  },
  uploadButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#FFD700", // Button BG
    borderColor: "#FFD700",
  },
  uploadButtonText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: "#000", // Button text
  },
  input: {
    backgroundColor: "#FFF", // Input BG
    color: "#000", // Input text
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    marginBottom: 20,
    borderColor: "#FFD700",
  },
  inputError: {
    borderColor: "#FFD700",
  },
  submitButton: {
    height: 50,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFD700",
  },
  submitButtonText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
  },
  errorText: {
    color: "#FFD700",
    marginBottom: 5,
  },
  successMessageContainer: {
    marginTop: 20,
    padding: 10,
  },
  successMessage: {
    color: "#FFD700",
    fontWeight: "bold",
    textAlign: "center",
  },
  loader: {
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  successText: {
    color: "green",
    fontSize: 18,
    marginBottom: 10,
  },
  closeButtonText: {
    color: "#FFD700",
    fontSize: 16,
    marginTop: 10,
  },
});


export default Insurance;
