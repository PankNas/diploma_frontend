import React from "react";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import SimpleMDE from "react-simplemde-editor";

import "easymde/dist/easymde.min.css";
import styles from "./AddPost.module.scss";
import { useSelector } from "react-redux";
import { selectIsAuth } from "../../redux/slices/auth";
import { useNavigate, Navigate, useParams } from "react-router-dom";
import axios from "../../axios";

import {db} from '../../firebase';
import { ref, set } from "firebase/database";

export const AddPost = () => {
  const {id} = useParams();
  const isAuth = useSelector(selectIsAuth);
  const navigate = useNavigate();

  const [isLoading, setLoading] = React.useState(false);
  const [description, setDescription] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [tags, setTags] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState("");
  const inputFileRef = React.useRef(null);

  const isEditing = Boolean(id);

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];

      formData.append("file", file);

      const { data } = await axios.post("/upload", formData);

      setImageUrl(data.url.slice(4));
    } catch (err) {
      console.warn(err);
      alert("Ошибка при загрузке файла!");
    }
  };

  const onClickRemoveImage = () => {
    setImageUrl("");
  };

  const onSubmit = async () => {
    try {
      setLoading(true);

      const fields = {
        title,
        imageUrl,
        tags,
        description,
      };

      let rand = 1 - 0.5 + Math.random() * (100000 - 1 + 1);

      set(ref(db, `posts/${Math.round(rand)}`), fields)
        .then(res => {
          console.log(res);
        });
      // const { data } = await (isEditing ? axios.patch(`/courses/${id}`, fields) : axios.post("/courses", fields));

      // navigate(`/courses/${isEditing ? id : data._id}`);
    } catch (err) {
      console.warn(err);

      alert('Ошибка при создании курса');
    }
  };

  React.useEffect(() => {
    if (!id) return;

    axios
      .get(`/courses/${id}`)
      .then(({data}) => {
        setTitle(data.title);
        setDescription(data.description);
        setImageUrl(data.imageUrl);
        setTags(data.tags.join(','));
      })
      .catch(err => {
        console.warn(err);
        alert('Ошибка при получении курса!')
      });
  }, []);

  const onChange = React.useCallback((value) => {
    setDescription(value);
  }, []);

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: "400px",
      autofocus: true,
      placeholder: "Введите текст...",
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    []
  );

  if (!localStorage.getItem("token") && !isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Paper style={{ padding: 30 }}>
      <Button
        onClick={() => inputFileRef.current.click()}
        variant="outlined"
        size="large"
      >
        Загрузить превью
      </Button>
      <input
        ref={inputFileRef}
        type="file"
        onChange={handleChangeFile}
        hidden
      />
      {imageUrl && (
        <>
          <Button
            variant="contained"
            color="error"
            onClick={onClickRemoveImage}
          >
            Удалить
          </Button>
          <img
            className={styles.image}
            src={`http://localhost:8000${imageUrl}`}
            alt="Uploaded"
          />
        </>
      )}
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Заголовок статьи..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
      />
      <TextField
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        classes={{ root: styles.tags }}
        variant="standard"
        placeholder="Тэги"
        fullWidth
      />
      <SimpleMDE
        className={styles.editor}
        value={description}
        onChange={onChange}
        options={options}
      />
      <div className={styles.buttons}>
        <Button onClick={onSubmit} size="large" variant="contained">
          {isEditing ? 'Сохранить' : 'Опубликовать'}
        </Button>
        <a href="/">
          <Button size="large">Отмена</Button>
        </a>
      </div>
    </Paper>
  );
};

// export const AddPost = () => {
//   const {id} = useParams();
//   const isAuth = useSelector(selectIsAuth);
//   const navigate = useNavigate();
//
//   const [isLoading, setLoading] = React.useState(false);
//   const [description, setDescription] = React.useState("");
//   const [title, setTitle] = React.useState("");
//   const [tags, setTags] = React.useState("");
//   const [imageUrl, setImageUrl] = React.useState("");
//   const inputFileRef = React.useRef(null);
//
//   const isEditing = Boolean(id);
//
//   const handleChangeFile = async (event) => {
//     try {
//       const formData = new FormData();
//       const file = event.target.files[0];
//
//       formData.append("file", file);
//
//       const { data } = await axios.post("/upload", formData);
//
//       setImageUrl(data.url.slice(4));
//     } catch (err) {
//       console.warn(err);
//       alert("Ошибка при загрузке файла!");
//     }
//   };
//
//   const onClickRemoveImage = () => {
//     setImageUrl("");
//   };
//
//   const onSubmit = async () => {
//     try {
//       setLoading(true);
//
//       const fields = {
//         title,
//         imageUrl,
//         tags,
//         description,
//       };
//
//       const { data } = await (isEditing ? axios.patch(`/courses/${id}`, fields) : axios.post("/courses", fields));
//
//       navigate(`/courses/${isEditing ? id : data._id}`);
//     } catch (err) {
//       console.warn(err);
//
//       alert('Ошибка при создании курса');
//     }
//   };
//
//   React.useEffect(() => {
//     if (!id) return;
//
//     axios
//       .get(`/courses/${id}`)
//       .then(({data}) => {
//         setTitle(data.title);
//         setDescription(data.description);
//         setImageUrl(data.imageUrl);
//         setTags(data.tags.join(','));
//       })
//       .catch(err => {
//         console.warn(err);
//         alert('Ошибка при получении курса!')
//       });
//   }, []);
//
//   const onChange = React.useCallback((value) => {
//     setDescription(value);
//   }, []);
//
//   const options = React.useMemo(
//     () => ({
//       spellChecker: false,
//       maxHeight: "400px",
//       autofocus: true,
//       placeholder: "Введите текст...",
//       status: false,
//       autosave: {
//         enabled: true,
//         delay: 1000,
//       },
//     }),
//     []
//   );
//
//   if (!localStorage.getItem("token") && !isAuth) {
//     return <Navigate to="/" />;
//   }
//
//   return (
//     <Paper style={{ padding: 30 }}>
//       <Button
//         onClick={() => inputFileRef.current.click()}
//         variant="outlined"
//         size="large"
//       >
//         Загрузить превью
//       </Button>
//       <input
//         ref={inputFileRef}
//         type="file"
//         onChange={handleChangeFile}
//         hidden
//       />
//       {imageUrl && (
//         <>
//           <Button
//             variant="contained"
//             color="error"
//             onClick={onClickRemoveImage}
//           >
//             Удалить
//           </Button>
//           <img
//             className={styles.image}
//             src={`http://localhost:8000${imageUrl}`}
//             alt="Uploaded"
//           />
//         </>
//       )}
//       <br />
//       <br />
//       <TextField
//         classes={{ root: styles.title }}
//         variant="standard"
//         placeholder="Заголовок статьи..."
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         fullWidth
//       />
//       <TextField
//         value={tags}
//         onChange={(e) => setTags(e.target.value)}
//         classes={{ root: styles.tags }}
//         variant="standard"
//         placeholder="Тэги"
//         fullWidth
//       />
//       <SimpleMDE
//         className={styles.editor}
//         value={description}
//         onChange={onChange}
//         options={options}
//       />
//       <div className={styles.buttons}>
//         <Button onClick={onSubmit} size="large" variant="contained">
//           {isEditing ? 'Сохранить' : 'Опубликовать'}
//         </Button>
//         <a href="/">
//           <Button size="large">Отмена</Button>
//         </a>
//       </div>
//     </Paper>
//   );
// };
