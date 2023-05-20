import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {Navigate} from "react-router-dom";

import {fetchAuth, selectIsAuth} from "../redux/slices/auth";
import Form from "../components/Form/Form";

export const Login = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  const onSubmit = async (values) => {
    const user = await dispatch(fetchAuth(values));
    console.log(user);

    if (!user) return alert("Не удалось авторизоваться!");
  };

  if (isAuth) return <Navigate to="/"/>;

  return (
    <Form type={'LOGIN'} title={'Вход в аккаунт'} onSubmit={onSubmit}/>
  );
};
