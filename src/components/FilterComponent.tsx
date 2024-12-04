import React from "react";
import { ScrollView, Text } from "react-native";
import { View } from "react-native";
import {
  CALENDAR_SCREEN,
  DASHBOARD_SCREEN,
  INSTALLER_SCREEN,
  SERVICE_SCREEN,
  TASK_SCREEN,
} from "../constants/screens";

const FilterComponent = ({ screen }: { screen?: string }): JSX.Element => {
  return (
    <ScrollView horizontal style={{ padding: 10 }}>
      <Text>Timeline</Text>
      {screen === DASHBOARD_SCREEN && <Text>Dashboard Filter</Text>}
      {screen === CALENDAR_SCREEN && <Text>Calendar Filter</Text>}
      {screen === TASK_SCREEN && <Text>Tasks Filter</Text>}
      {screen === SERVICE_SCREEN && <Text>Service Filter</Text>}
      {screen === INSTALLER_SCREEN && <Text>Installer Filter</Text>}
    </ScrollView>
  );
};

export default FilterComponent;
