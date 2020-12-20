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
  providerTwitter,
  providerGoogle,
  providerFacebook,
  ui,
  language,
} from "../utils/firebase";
import Auth from "../Auth";

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

  loginWithTwitter = () => {
    firebase.auth().languageCode = "ja";

    firebase
      .auth()
      .signInWithPopup(providerTwitter)
      .then((result) => {
        this.props.history.push("/home");

        // if (this._isMounted)
        // this.setState({ loading: false });
      })
      .catch((error) => {
        console.log(error);
        if (this._isMounted) this.setState({ loading: false });
        alert(error);
      });
    // firebase
    //   .auth()
    //   .signInWithRedirect(providerTwitter)
    //   .getRedirectResult()
    //   .then((result) => {
    //     this.props.history.push("/home");
    //     if (this._isMounted) this.setState({ loading: false });
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     if (this._isMounted) this.setState({ loading: false });
    //     alert(error);
    //   });
  };

  loginWithFacebook = () => {
    firebase.auth().languageCode = "ja";

    firebase
      .auth()
      .signInWithPopup(providerFacebook)
      .then((result) => {
        this.props.history.push("/home");
      })
      .catch((error) => {
        console.log(error);
        if (this._isMounted) this.setState({ loading: false });
        alert(error);
      });
    // firebase.auth().signInWithRedirect(providerFacebook);
    // firebase
    //   .auth()
    //   .getRedirectResult()
    //   .then((result) => {
    //     this.props.history.push("/home");
    //     if (this._isMounted) this.setState({ loading: false });
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     if (this._isMounted) this.setState({ loading: false });
    //     alert(error);
    //   });
  };

  loginWithGoogle = () => {
    firebase.auth().languageCode = "ja";
    firebase
      .auth()
      .signInWithPopup(providerGoogle)
      .then((result) => {
        this.props.history.push("/home");

        // if (this._isMounted)
        // this.setState({ loading: false });
      })
      .catch((error) => {
        console.log(error);
        if (this._isMounted) this.setState({ loading: false });
        alert(error);
      });
    // firebase
    //   .auth()
    //   .signInWithRedirect(providerGoogle)
    //   .then((result) => {
    //     this.props.history.push("/home");

    //     // if (this._isMounted)
    //     // this.setState({ loading: false });
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     if (this._isMounted) this.setState({ loading: false });
    //     alert(error);
    //   });
  };

  componentDidMount = () => {
    this._isMounted = true;
  };

  componentWillUnmount = () => {
    this._isMounted = false;
  };

  render() {
    return (
      <div className="container">
        <div
          className="mx-auto"
          style={{ width: 400, background: "#eee", padding: 20, marginTop: 60 }}
        >
          <p style={{ textAlign: "center" }}>サインイン</p>
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
                <FormGroup>
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
                </FormGroup>
                <div style={{ textAlign: "center" }}>
                  <Button
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
                  </Button>
                  <ui>
                    <Button onClick={this.loginWithTwitter}>twitter</Button>
                    <Button onClick={this.loginWithFacebook}>facebook</Button>
                    <Button onClick={this.loginWithGoogle}>google</Button>
                  </ui>
                </div>
              </Form>
            )}
          </Formik>
        </div>
        <div
          className="mx-auto"
          style={{ width: 400, background: "#fff", padding: 20 }}
        >
          <Link to="/signup">新規登録はこちら。</Link>
        </div>
      </div>
    );
  }
}

export default withRouter(SignInOrUp);
