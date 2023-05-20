import React from "react";
import { useParams } from "react-router-dom";

import { Post } from "../components/Post";
import { CommentsBlock } from "../components/CommentsBlock";
import axios from "../axios.js";
import ReactMarkdown from "react-markdown";

export const FullPost = () => {
  const [data, setData] = React.useState();
  const [isLoading, setLoading] = React.useState(true);

  const { id } = useParams();

  React.useEffect(() => {
    axios
      .get(`/courses/${id}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);

        alert("Ошибка при получении курса");
      });
  }, []);

  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost />;
  }

  return (
    <Post
      id={data._id}
      title={data.title}
      imageUrl={data.imageUrl ? `http://localhost:8000${data.imageUrl}` : ''}
      user={data.user}
      createdAt={data.createdAt}
      viewsCount={data.viewsCount}
      commentsCount={3}
      tags={data.tags}
      isFullPost
    >
      <ReactMarkdown children={data.description}/>
    </Post>
  );
};
