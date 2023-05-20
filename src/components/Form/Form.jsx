import React from 'react';
import {useForm} from "react-hook-form";
import TextField from "@mui/material/TextField";
import styles from "./Form.module.css";
import Button from "@mui/material/Button";

const Form = ({type, title, onSubmit}) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: {errors, isValid},
  } = useForm({
    defaultValues: {
      fullName: "Vasya Pypkin",
      email: "vasya@test.ru",
      password: "123456",
    },
    mode: "onChange",
  });

  return (
    <div className={styles.root}>
      <h1 className={styles.title}>{title}</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        {
          type === 'SIGN_UP' &&
          <TextField
            error={Boolean(errors.fullName?.message)}
            helperText={errors.fullName?.message}
            {...register("fullName", {required: "Укажите полное имя"})}
            className={styles.field}
            label="Полное имя"
            fullWidth
          />
        }
        <TextField
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          type="email"
          {...register("email", {required: "Укажите почту"})}
          className={styles.field}
          label="E-Mail"
          fullWidth
        />
        <TextField
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          type="password"
          {...register("password", {required: "Укажите пароль"})}
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
          {type === 'SIGN_UP' ? 'Зарегистрироваться' : 'Войти'}
        </Button>
      </form>
    </div>
  );
};

export default Form;
