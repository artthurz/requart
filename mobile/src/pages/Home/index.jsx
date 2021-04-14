import React, { useContext } from "react";
import {
  Container,
  CardName,
  Avatar,
  Card,
  CardEmail,
  CardTitle,
  CardBackground,
} from "./styles";

import AuthContext from "../../contexts/auth";

export default function Home() {
  const { user } = useContext(AuthContext);

  return (
    <Container>
      <Card activeOpacity={0.8} pressDuration={3}>
        <CardBackground colors={["#0d095a", "#0a0742"]}>
          <CardTitle>Bem vindo!</CardTitle>
          <Avatar
            source={{
              uri: user.avatar.url,
            }}
          />
          <CardName>{user.name}</CardName>
          <CardEmail>{user?.email}</CardEmail>
        </CardBackground>
      </Card>
    </Container>
  );
}
