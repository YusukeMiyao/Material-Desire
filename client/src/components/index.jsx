import React from "react";
import styled from "styled-components";
import SignUp from "./SignUp.jsx";
import SignIn from "./SignIn.jsx";
import Fv from "./Fv.jsx";
import Concept from "./Concept.jsx";

const Wrap = styled.div``;

class Index extends React.Component {
  render() {
    return (
      <Wrap>
        {/* <Header /> */}
        <Fv />
        <Concept />
        <SignIn />
      </Wrap>
    );
  }
}

export default Index;
