import React from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  Spinner,
} from "reactstrap";
import { Link, withRouter } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import firebase, {
  // providerTwitter,
  // providerGoogle,
  // providerFacebook,
  // ui,
  // language,
  uiConfig,
} from "../utils/firebase";
import styled from "styled-components";
import Auth from "../Auth";
import FirebaseUIAuth from "react-firebaseui/StyledFirebaseAuth";

const SignInWrap = styled.div`
  width: 100%;
  background: #f2e7fe;
  padding: 20px 0;
  margin: 60px auto;
  box-shadow: 0px 5px 5px -5px grey;
`;
const SignInContent = styled.div`
  width: 360px;
  margin: auto;
  text-align: center;
  padding: 20px 0;
  background: #ffffff;
  border: solid 1px #e0e0e0;
  border-radius: 4px;
  p {
    margin-top: 0;
    span {
      font-size: 15px;
      color: #808080;
    }
  }
`;
const FirebaseUiAuthWrap = styled.div`
  font-size: 15px;
  color: #808080;
  text-align: center;
`;
class SignInOrUp extends React.Component {
  state = {
    loading: false, //spinner制御用
  };

  _isMounted = false;

  handleOnSubmit = (values) => {
    //spinner表示開始
    if (this._isMounted) this.setState({ loading: true });
    //サインイン（ログイン）処理
    firebase
      .auth()
      .signInWithEmailAndPassword(values.email, values.password)
      .then((res) => {
        //正常終了時
        this.props.history.push("/home");
        if (this._isMounted) this.setState({ loading: false });
      })
      .catch((error) => {
        //異常終了時
        if (this._isMounted) this.setState({ loading: false });
        alert(error);
      });
  };

  componentDidMount = () => {
    this._isMounted = true;
  };

  componentWillUnmount = () => {
    this._isMounted = false;
  };

  render() {
    return (
      <SignInWrap>
        <SignInContent>
          <p>
            ソーシャルアカウントで登録/ログイン
            <br />
            <span>（無料で使用できます）</span>
          </p>
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={(values) => this.handleOnSubmit(values)}
            validationSchema={Yup.object().shape({
              email: Yup.string().email().required(),
              password: Yup.string().required(),
            })}
          >
            {({
              handleSubmit,
              handleChange,
              handleBlur,
              values,
              errors,
              touched,
            }) => (
              <Form onSubmit={handleSubmit}>
                {/* <FormGroup>
                  <Label for="email">Email</Label>
                  <Input
                  type="email"
                  name="email"
                  id="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  invalid={touched.email && errors.email ? true : false}
                  />
                  <FormFeedback>{errors.email}</FormFeedback>
                  </FormGroup>
                  <FormGroup>
                  <Label for="password">Password</Label>
                  <Input
                  type="password"
                  name="password"
                  id="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  invalid={touched.password && errors.password ? true : false}
                  />
                  <FormFeedback>{errors.password}</FormFeedback>
                </FormGroup> */}
                <FirebaseUiAuthWrap>
                  {/* <Button
                    color="primary"
                    type="submit"
                    disabled={this.state.loading}
                    >
                    <Spinner
                    size="sm"
                    color="light"
                    style={{ marginRight: 5 }}
                    hidden={!this.state.loading}
                    />
                    ログイン
                  </Button> */}
                  <FirebaseUIAuth
                    uiConfig={uiConfig}
                    firebaseAuth={firebase.auth()}
                  />
                  （ログインせずに試すにはこちら）
                </FirebaseUiAuthWrap>
              </Form>
            )}
          </Formik>
        </SignInContent>
      </SignInWrap>
    );
  }
}

export default withRouter(SignInOrUp);
