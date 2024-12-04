import React, { useState, Suspense } from 'react';
import { useRoute } from '@react-navigation/native';
import SidebarDrawer from '../Sidebar/SidebarDrawer';
import { ActivityIndicator, Text, View } from 'react-native';

// Lazy-loaded screens
const GeneralScreen = React.lazy(() => import('./screens/General'));

// Define the type for route parameters
type RouteParams = {
  id: string;
};

// Define a fallback loading component
const LoadingFallback = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <ActivityIndicator size="large" color="#0000ff" />
    <Text>Loading...</Text>
  </View>
);

const TaskDetailScreen: React.FC = (): JSX.Element => {
  const route = useRoute();
  const { id } = route.params as RouteParams;
  const [taskNavigator, setTaskNavigator] = useState<string>('General');
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  // Function to determine the component to render dynamically
  const renderComponent = (): JSX.Element => {
    switch (taskNavigator) {
      case 'General':
        return <GeneralScreen isDrawerOpen={isDrawerOpen}
        setDrawerOpen={setDrawerOpen} id={id} />;
      default:
        return <Text>Component not found!</Text>;
    }
  };



  return (
    <SidebarDrawer setOpen={setDrawerOpen} open={isDrawerOpen}
      componentName="task"
      navigator={taskNavigator}
      setNavigator={setTaskNavigator}
    >
      {/* Wrap the dynamically rendered component in Suspense */}
      <Suspense fallback={<LoadingFallback />}>
        {renderComponent()}
      </Suspense>
    </SidebarDrawer>
  );
};

export default TaskDetailScreen;
