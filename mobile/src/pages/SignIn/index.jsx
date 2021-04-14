import React, { useContext, useState } from "react";
import AuthContext from "../../contexts/auth";
import { TextInput, Button, IconButton } from "react-native-paper";
import Loginmobile from "../../assets/images/loginmobile.svg";
import { LinearGradient } from "expo-linear-gradient";

import { Container, Content, Wrapper } from "./styles";

export default function SignIn() {
  const { signIn } = useContext(AuthContext);
  const [pressed, setPressed] = useState(false);
  const [login, setLogin] = useState(null);
  const [password, setPassword] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSignIn() {
    try {
      setLoading(true);
      await signIn({
        login,
        password,
      });
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  return (
    <Container>
      <LinearGradient
        colors={["#0a0742", "#0a0742", "black"]}
        style={{
          flex: 1,
          position: "absolute",
          right: 0,
          left: 0,
          top: 0,
          bottom: 0,
          backgroundColor: "#232958",
          height: "100%",
          width: "100%",
        }}
      >
        <Loginmobile
          width="100%"
          style={{
            position: "absolute",
            right: 0,
            bottom: -650,
          }}
        />
      </LinearGradient>
      <Content onPress={() => setPressed(false)}>
        {pressed ? (
          <Wrapper>
            <IconButton
              icon="arrow-down"
              color="white"
              size={30}
              onPress={() => setPressed(false)}
            />
            <TextInput
              value={login}
              mode="flat"
              label="Login"
              theme={{
                colors: {
                  placeholder: "white",
                  text: "white",
                  primary: "white",
                  underlineColor: "transparent",
                  background: "transparent",
                  disabled: "white",
                },
              }}
              style={{ width: "80%" }}
              onChangeText={(login) => setLogin(login)}
            />
            <TextInput
              secureTextEntry
              theme={{
                colors: {
                  placeholder: "white",
                  text: "white",
                  primary: "white",
                  disabled: "white",
                  underlineColor: "transparent",
                  background: "transparent",
                },
              }}
              style={{ width: "80%", marginTop: 40 }}
              value={password}
              mode="flat"
              label="Senha"
              onChangeText={(password) => setPassword(password)}
            />
            <Button
              loading={loading}
              style={{
                height: 60,
                justifyContent: "center",
                marginTop: 60,
                marginBottom: 60,
                width: "90%",
              }}
              labelStyle={{textTransform: "none"}}
              mode="contained"
              color="#FE5200"
              onPress={handleSignIn}
            >
              Entrar
            </Button>
          </Wrapper>
        ) : (
          <Button
            style={{
              height: 60,
              alignSelf: "center",
              justifyContent: "center",
              marginBottom: 60,
              width: "90%",
            }}
            labelStyle={{textTransform: "none"}}
            mode="contained"
            color="#FE5200"
            onPress={() => setPressed(true)}
          >
            Login
          </Button>
        )}
      </Content>
    </Container>
  );
}
