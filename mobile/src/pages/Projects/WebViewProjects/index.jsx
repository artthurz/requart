import React from "react";
import { WebView } from "react-native-webview";

import { Container } from "./styles";

const WebViewProjects = ({ route }) => {
  let link = route.params.link;
  const pattern = /^((http|https|ftp):\/\/)/;

  if (!pattern.test(link)) {
    link = "http://" + link;
  }

  return (
    <Container>
      <WebView source={{ uri: link }} />
    </Container>
  );
};

export default WebViewProjects;
