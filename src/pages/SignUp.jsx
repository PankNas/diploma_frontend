import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchSignUp, selectIsAuth} from "../redux/slices/auth";
import {Navigate} from "react-router-dom";
import Form from "../components/Form/Form";

export const SignUp = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  const onSubmit = async (values) => {
    const user = await dispatch(fetchSignUp(values));

    if (!user) return alert("Не удалось зарегистрироваться!");
  };

  if (isAuth) return <Navigate to="/"/>;

  return (
    <Form type={'SIGN_UP'} title={'Создание аккаунта'} onSubmit={onSubmit}/>
  );
};
