import React, { useEffect, useContext, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link, useHistory } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { Spinner, Button } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";

import { store } from "../../store/store";
import {
  _getPosts,
  _deletePost,
  _getLengthPosts,
} from "../../store/actions/post";
import "../styles/news.css";

const Loader = () => {
  return (
    <div className="loader">
      Идет загрузка
      <Spinner animation="border" variant="primary" />
    </div>
  );
};

const News = () => {
  const { state, dispatch } = useContext(store);
  const history = useHistory();
  const [hasMore, setHasMore] = useState(true);
  const [quantityPosts, setQuantityPosts] = useState(0);

  const { loaders, posts, maxContentLength } = state;

  const postsLength = maxContentLength.posts;

  useEffect(() => {
    if (postsLength !== null && quantityPosts >= postsLength) {
      setHasMore(false);
    }
  }, [quantityPosts]);

  const getPosts = () => {
    setQuantityPosts(quantityPosts + 10);
    _getPosts({ dispatch }, quantityPosts + 10);
  };

  useEffect(() => {
    getPosts();

    _getLengthPosts({ dispatch });
  }, []);

  return (
    <div>
      <h1>Новости</h1>

      <div className="my-posts-wrap">
        {posts.length === 0 && !loaders.getPosts && <p>Пусто</p>}

        <InfiniteScroll
          dataLength={posts.length}
          next={getPosts}
          hasMore={hasMore}
          endMessage={posts.length !== 0 && <h4>Все посты загружены.</h4>}
          loader={<Loader />}
        >
          {posts.map(({ Title, NewsDate, ID }) => (
            <Card className="my-card-post  my-2" key={ID}>
              <Card.Header>
                <div className="my-card-post-header">
                  <div>
                    <Card.Title>
                      <Link to={`/press/editnews/${ID}`}>{Title}</Link>
                    </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {new Date(NewsDate).toLocaleDateString()}
                    </Card.Subtitle>
                  </div>
                </div>
                <div className="my-card-post-header-buttons">
                  <Link to={`/press/editnews/${ID}`}>
                    <Button>
                      <FaEdit />
                    </Button>
                  </Link>
                  <Button
                    variant="danger"
                    onClick={() => {
                      _deletePost({ dispatch, history }, ID);
                    }}
                  >
                    <FaTrash />
                  </Button>
                </div>
              </Card.Header>
            </Card>
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default News;
