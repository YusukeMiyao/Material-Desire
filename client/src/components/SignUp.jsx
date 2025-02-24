import React from "react";
// import { Form } from 'react-bootstrap';
import styled from "styled-components";

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
import firebase from "../utils/firebase";
const Wrap = styled.div`
  width: auto;
  background-color: #f2e7fe;
  padding: 34px 8px 16px;
  margin-bottom: 64px;
`;
const SignUpArea = styled.div`
  background-color: white;
  padding: 10px;
`;
class SignUp extends React.Component {
  state = {
    loading: false, //処理中にボタンにspinner表示する制御用
  };

  _isMounted = false;

  //Submitされたら
  handleOnSubmit = (values) => {
    //spinner表示開始
    if (this._isMounted) this.setState({ loading: true });
    //新規登録処理
    firebase
      .auth()
      .createUserWithEmailAndPassword(values.email, values.password)
      .then((res) => {
        //正常終了時
        //spinner表示終了
        if (this._isMounted) this.setState({ loading: false });
        //Homeに移動
        this.props.history.push("/home"); //history.pushを使うためwithRouterしている
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
      <Wrap>
        <SignUpArea>
          <p style={{ textAlign: "center" }}>
            ソーシャルアカウントで登録/ログイン
          </p>
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={(values) => this.handleOnSubmit(values)}
            validationSchema={Yup.object().shape({
              email: Yup.string().email().required(),
              password: Yup.string().required(),
              // tel: Yup.string().required(),
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
                  <Label for="name">Email</Label>
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
                {/* <FormGroup>
                                        <Label for="tel">Tel</Label>
                                        <Input
                                            type="tel"
                                            name="tel"
                                            id="tel"
                                            value={values.tel}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            invalid={touched.tel && errors.tel ? true : false}
                                        />
                                        <FormFeedback>
                                            {errors.tel}
                                        </FormFeedback>
                                    </FormGroup> */}
                <div style={{ textAlign: "center" }}>
                  <Button
                    color="success"
                    type="submit"
                    disabled={this.state.loading}
                  >
                    <Spinner
                      size="sm"
                      color="light"
                      style={{ marginRight: 5 }}
                      hidden={!this.state.loading}
                    />
                    新規登録
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </SignUpArea>
        {/* <div>
          <Link to="/signin">ログインはこちら。</Link>
        </div> */}
      </Wrap>
    );
  }
}

export default withRouter(SignUp);
