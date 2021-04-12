import React, { useContext } from "react";
import { Container, Text, Avatar, Card, SmallText, Title } from "./styles";

import AuthContext from "../../contexts/auth";

export default function Home() {
  const { user } = useContext(AuthContext);

  return (
    <Container>
      <Card>
        <Title>Bem vindo!</Title>
        <Avatar
          source={{
            uri: user.avatar.url,
          }}
        />
        <Text>{user.name}</Text>
        <SmallText>{user?.email}</SmallText>
      </Card>
    </Container>
  );
}
