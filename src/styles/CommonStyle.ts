import { StyleSheet } from 'react-native';

// Define common color theme
const COLORS = {
  primary: '#891818', // Primary color
  white: '#fff', // White color for background, text
  dark: '#333', // Dark text color
  light: '#f0f0f0', // Light background color
  gray: '#ccc', // Gray for borders and inactive text
  error: 'red', // Error text color
};

const CardColor = {
  mutedGray: '#b7acac', // Neutral/Muted color
  NotStarted: '#ffa812', // Highlight/Accent color
  InProgress: '#00a651', // Positive/Success indicator
  Completed: '#f56954', // Warning/Error indicator
  Overdue: '#00c0ef', // Informational/Secondary indicator
};

// Define reusable styles
const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white, // Use the white background color
  },
  flex:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary, // Use the primary color for titles
    marginBottom: 20,
  },
  button: {
    backgroundColor: COLORS.primary, // Apply primary color to buttons
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: COLORS.white, // White text on the button
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.gray, // Use gray for input borders
    borderRadius: 8,
    width: '80%',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 45,
    fontSize: 14,
    color: COLORS.dark, // Dark text color for inputs
  },
  errorText: {
    color: COLORS.error, // Red error text
    fontSize: 14,
    marginTop:5,
  },
});

export { commonStyles, COLORS, CardColor }; // Export styles and colors for reuse
