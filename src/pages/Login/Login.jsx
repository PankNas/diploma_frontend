import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";

import styles from "./Login.module.scss";

import { fetchAuth, selectIsAuth } from "../../redux/slices/auth";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export const Login = () => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "test@test.ru",
      password: "123",
    },
    mode: "onChange",
  });

  const onSubmit = async ({email, password}) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(console.log)
      .catch(console.log);
  };

  // if (isAuth) {
  //   return <Navigate to="/" />;
  // }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вход в аккаунт
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="E-Mail"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          type="email"
          {...register("email", { required: "Укажите почту" })}

        />
        <TextField
          className={styles.field}
          label="Пароль"
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          {...register("password", { required: "Укажите пароль" })}
          fullWidth
        />
        <Button
          disabled={!isValid}
          type="submit"
          size="large"
          variant="contained"
          fullWidth
        >
          Войти
        </Button>
      </form>
    </Paper>
  );
};

// export const Login = () => {
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
//       email: "test@test.ru",
//       password: "123",
//     },
//     mode: "onChange",
//   });
//
//   const onSubmit = async (values) => {
//     const data = await dispatch(fetchAuth(values));
//
//     console.log("data client: ", data);
//
//     if (!data.payload) {
//       return alert("Не удалось авторизоваться!");
//     }
//
//     if ("token" in data.payload.data) {
//       localStorage.setItem("token", data.payload.data.token);
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
//         Вход в аккаунт
//       </Typography>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <TextField
//           className={styles.field}
//           label="E-Mail"
//           error={Boolean(errors.email?.message)}
//           helperText={errors.email?.message}
//           type="email"
//           {...register("email", { required: "Укажите почту" })}
//
//         />
//         <TextField
//           className={styles.field}
//           label="Пароль"
//           error={Boolean(errors.password?.message)}
//           helperText={errors.password?.message}
//           {...register("password", { required: "Укажите пароль" })}
//           fullWidth
//         />
//         <Button
//           disabled={!isValid}
//           type="submit"
//           size="large"
//           variant="contained"
//           fullWidth
//         >
//           Войти
//         </Button>
//       </form>
//     </Paper>
//   );
// };