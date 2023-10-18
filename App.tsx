import React from "react";
import { NativeBaseProvider } from "native-base";
import {
  HStack,
  Menu,
  Box,
  HamburgerIcon,
  Pressable,
  VStack,
  Text,
} from "native-base";
import { Cadastro } from "./src/screens/Cadastro";
import { Listagem } from "./src/screens/Listagem";

export default function App() {
  const [activeScreen, setActiveScreen] = React.useState<
    "cadastro" | "listagem"
  >("cadastro");

  return (
    <NativeBaseProvider>
      <Menu
        w="full"
        trigger={(triggerProps) => {
          return (
            <Pressable
              accessibilityLabel="More options menu"
              {...triggerProps}
              bgColor={"blue.500"}
              marginTop={10}
              h={10}
              alignItems={"center"}
              space={4}
              flexDirection={"row"}
            >
              <HamburgerIcon color="white" />
              <Text ml={5} color={"white"}>
                Menu
              </Text>
            </Pressable>
          );
        }}
      >
        <Menu.Item onPress={() => setActiveScreen("cadastro")}>
          Cadastro de Usuário
        </Menu.Item>
        <Menu.Item onPress={() => setActiveScreen("listagem")}>
          Listagem de Usuários
        </Menu.Item>
      </Menu>
      <VStack mt={10} p={10}>
        {activeScreen === "cadastro" ? <Cadastro /> : <Listagem />}
      </VStack>
    </NativeBaseProvider>
  );
}
