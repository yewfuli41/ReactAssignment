
import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  text: {
    color: 'black'
  },
  backButton: {
    alignSelf: 'flex-start',
    width: 100,
    marginTop: 10,
  },
  nextButton: {
    alignSelf: "flex-end",
    marginTop: 10,
    width: 100,
  },
  buttonRow: {
    flexDirection: "row", // Arrange buttons in a row
    justifyContent: "space-around", // Space between buttons
    marginTop: 20,
  },
  editProfilecontainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ffffff",
  },
  themeSwitcher: {
    padding:15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  section: {
    flex: 1,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  infoItem: {
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
    color: "#666",
  },
  infoValue: {
    fontSize: 16,
    lineHeight: 22,
  },
  infoValueLink: {
    fontSize: 16,
    color: "#007AFF",
    textDecorationLine: "underline",
  },
  mapPlaceholder: {
    height: 200,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "ddd",
    padding: 20,
  },
  mapPlaceholderText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#666",
    textAlign: "center",
  },
  mapPlaceholderSubText: {
    fontSize: 12,
    color: "#999",
    marginTop: 5,
    textAlign: "center",
  },
  openMapsButton: {
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
  },
  openMapsButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
  directionItem: {
    marginBottom: 15,
  },
  directionTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
  },
  directionText: {
    fontSize: 15,
    lineHeight: 22,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  faqItem: {
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  faqQuestion: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  questionText: {
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
  },
  expandIcon: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  faqAnswer: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  answerText: {
    fontSize: 16,
  },

  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 12,
    fontSize: 16,
  },
  radioGroup: {
    flexDirection: 'row',
    marginTop: 5,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  radio: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  radioSelected: {
    backgroundColor: '#007AFF',
  },
  radioLabel: {
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 40,
  },
  saveButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  cancelButtonText: {
    fontSize: 16,
  },
  inputError: {
    borderColor: '#ff4d4d',
    borderWidth: 1,
  },
  errorText: {
    color: '#ff4d4d',
    fontSize: 14,
    marginTop: 4,
  },
  profileImagePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  profileImagePlaceholderText: {
    fontSize: 60,
    color: '#888',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  optionsContainer: {
    width: '100%',
    marginBottom: 40,
  },
  optionButton: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  optionText: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  logoutButton: {
    backgroundColor: '#ff4d4d',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    position: 'absolute',
    bottom: 30,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  // booking history screen
  bookRecordsContainer: {
    alignSelf: "stretch",
    marginVertical: 5,
    marginHorizontal: 10,
    padding: 10,
    backgroundColor: "#fffff0",
    borderRadius: 8,
  },
  bookRecordHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bookRecordIndex: {
    fontWeight: "bold",
    fontSize: 16,
  },
  bookRecordDate: {
    color: "grey",
  },
  bookRecordDetails: {
    marginTop: 8,
  },
  update_button: {
    backgroundColor: '#00C297',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginRight: 10,
    alignItems: 'center',
  },
  delete_button: {
    backgroundColor: 'red',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignItems: 'center',
  },
  update_delete_buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },

  // Chatbox button
  chatButton: {
    color: '#15b5b0',
    fontSize: 45,
  },
  profileBackground: {
    padding: 20,
  },
  profileImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignSelf: 'flex-end',
    marginBottom: 8,
  },
  profileName: {
    color: 'black',
    fontSize: 20,
    alignSelf: 'flex-end',
  },
  drawerItemsContainer: {
    backgroundColor: '#fff',
    flex: 1,
  },
  footer: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: 'grey',
  },
  card: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3, // For Android shadow
    flexDirection: "column",
    justifyContent: "space-between",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    alignSelf:"center"
  },
  cardDescription: {
    fontSize: 14,
    lineHeight: 18,
    marginBottom: 16,
  },
  bookNowButton: {
    paddingVertical: 12,
    marginBottom: 16,
    alignSelf: "center", // Center horizontally
    width: 100, // Fixed width
    height: 50, // Fixed height
    backgroundColor: "#FF8F00", // Button color
    borderRadius: 8, // Rounded corners
    justifyContent: "center", // Center text vertically
    alignItems: "center", // Center text horizontally
  },
  bookNowButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
})
export default style;