import { Alert, Linking, Platform } from 'react-native';

export const Months: { long: string; short: string }[] = [
    { long: 'January', short: 'Jan' },
    { long: 'February', short: 'Feb' },
    { long: 'March', short: 'Mar' },
    { long: 'April', short: 'Apr' },
    { long: 'May', short: 'May' },
    { long: 'June', short: 'Jun' },
    { long: 'July', short: 'Jul' },
    { long: 'August', short: 'Aug' },
    { long: 'September', short: 'Sep' },
    { long: 'October', short: 'Oct' },
    { long: 'November', short: 'Nov' },
    { long: 'December', short: 'Dec' },
  ];


  // Helper function to generate a random color
export const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };



// //   open map
export const openMap = (address: string) => {
    if(typeof address === 'string'){
    const encodedAddress = encodeURIComponent(address);

    let url = '';
    if (Platform.OS === 'android') {
      url = `google.navigation:q=${encodedAddress}`;
    } else if (Platform.OS === 'ios') {
      // For iOS, checking if Google Maps is installed
      const googleMapsUrl = `comgooglemaps://?q=${encodedAddress}`;
      const appleMapsUrl = `http://maps.apple.com/?q=${encodedAddress}`;

      // Try to open Google Maps first
      Linking.canOpenURL(googleMapsUrl)
        .then((supported) => {
          if (supported) {
            Linking.openURL(googleMapsUrl).catch((err) => {
              console.error('Error opening Google Maps:', err);
            });
          } else {
            // If Google Maps is not installed, fall back to Apple Maps
            Linking.openURL(appleMapsUrl).catch((err) => {
              console.error('Error opening Apple Maps:', err);
            });
          }
        })
        .catch((err) => {
          console.error('Error checking for Google Maps:', err);
        });
      return;
    }

    // For other platforms (i.e., Android, iOS fallback to Google Maps or Apple Maps)
    Linking.openURL(url).catch((err) => console.error('Error opening Google Maps:', err));

}
else{
    Alert.alert('please, give me valid address');
}
  };
