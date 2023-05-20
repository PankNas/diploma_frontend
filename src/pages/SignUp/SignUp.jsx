import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";

import styles from "./SignUp.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {fetchRegister, selectIsAuth, setUser} from "../../redux/slices/auth";
import { useForm } from "react-hook-form";
import {Navigate, useNavigate} from "react-router-dom";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      fullName: "Vasya Pypkin",
      email: "vasya@test.ru",
      password: "12345",
    },
    mode: "onChange",
  });

  const onSubmit = async ({email, password}) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(({user}) => {
        dispatch(setUser({
          email: user.email,
          id: user.uid,
          token: user.accessToken,
        }))
      })
      .then(_ => navigate('/'))
      .catch(console.log);
  };

  // if (isAuth) {
  //   return <Navigate to="/" />;
  // }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/*<TextField*/}
        {/*  error={Boolean(errors.fullName?.message)}*/}
        {/*  helperText={errors.fullName?.message}*/}
        {/*  {...register("fullName", { required: "Укажите полное имя" })}*/}
        {/*  className={styles.field}*/}
        {/*  label="Полное имя"*/}
        {/*  fullWidth*/}
        {/*/>*/}
        <TextField
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          type="email"
          {...register("email", { required: "Укажите почту" })}
          className={styles.field}
          label="E-Mail"
          fullWidth
        />
        <TextField
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          type="password"
          {...register("password", { required: "Укажите пароль" })}
          className={styles.field}
          label="Пароль"
          fullWidth
        />
        <Button
          disabled={!isValid}
          type="submit"
          size="large"
          variant="contained"
          fullWidth
        >
          Зарегистрироваться
        </Button>
      </form>
    </Paper>
  );
};

// export const SignUp = () => {
//   const isAuth = useSelector(selectIsAuth);
//   const dispatch = useDispatch();
//
//   const {
//     register,
//     handleSubmit,
//     setError,
//     formState: { errors, isValid },
//   } = useForm({
//     defaultValues: {
//       fullName: "Vasya Pypkin",
//       email: "vasya@test.ru",
//       password: "12345",
//     },
//     mode: "onChange",
//   });
//
//   const onSubmit = async (values) => {
//     const data = await dispatch(fetchRegister(values));
//
//     if (!data.payload) {
//       return alert("Не удалось зарегистрироваться!");
//     }
//
//     if ("token" in data.payload) {
//       localStorage.setItem("token", data.payload.token);
//     }
//   };
//
//   if (isAuth) {
//     return <Navigate to="/" />;
//   }
//
//   return (
//     <Paper classes={{ root: styles.root }}>
//       <Typography classes={{ root: styles.title }} variant="h5">
//         Создание аккаунта
//       </Typography>
//       <div className={styles.avatar}>
//         <Avatar sx={{ width: 100, height: 100 }} />
//       </div>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <TextField
//           error={Boolean(errors.fullName?.message)}
//           helperText={errors.fullName?.message}
//           {...register("fullName", { required: "Укажите полное имя" })}
//           className={styles.field}
//           label="Полное имя"
//           fullWidth
//         />
//         <TextField
//           error={Boolean(errors.email?.message)}
//           helperText={errors.email?.message}
//           type="email"
//           {...register("email", { required: "Укажите почту" })}
//           className={styles.field}
//           label="E-Mail"
//           fullWidth
//         />
//         <TextField
//           error={Boolean(errors.password?.message)}
//           helperText={errors.password?.message}
//           type="password"
//           {...register("password", { required: "Укажите пароль" })}
//           className={styles.field}
//           label="Пароль"
//           fullWidth
//         />
//         <Button
//           disabled={!isValid}
//           type="submit"
//           size="large"
//           variant="contained"
//           fullWidth
//         >
//           Зарегистрироваться
//         </Button>
//       </form>
//     </Paper>
//   );
// };
