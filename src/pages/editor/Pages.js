import React, { useEffect, useContext, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link, useHistory } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { Spinner, Button, Table } from "react-bootstrap";
import { FaEdit, FaEye, FaEyeSlash } from "react-icons/fa";

import { store } from "../../store/store";
import { _getLengthPages, _getPages } from "../../store/actions/page";

import "../styles/news.css";

const Loader = () => {
  return (
    <div className="loader">
      Идет загрузка
      <Spinner animation="border" variant="primary" />
    </div>
  );
};

const Pages = () => {
  const { state, dispatch } = useContext(store);
  const history = useHistory();
  const [hasMore, setHasMore] = useState(true);
  const [quantityPages, setQuantityPages] = useState(0);

  const { loaders, pages, maxContentLength } = state;

  const pagesLength = maxContentLength.pages;

  // useEffect(() => {
  //   if (pagesLength !== null && quantityPages >= pagesLength) {
  //     setHasMore(false);
  //   }
  // }, [quantityPages]);

  const getPages = () => {
    // setQuantityPages(quantityPages + 10);
    // _getPages({ dispatch }, quantityPages + 10);
    _getPages({ dispatch }, "0");
  };

  useEffect(() => {
    getPages();

    // _getLengthPages({ dispatch });
  }, []);

  return (
    <div>
      <h1>Страницы</h1>

      <div className="my-posts-wrap">
        {pages.length === 0 && !loaders.getPages && <p>Пусто</p>}
        <Table striped bordered hover className="mt-3">
          <thead>
            <tr>
              <th>ID</th>
              <th>Заголовок</th>
              <th>Путь</th>
              <th>Видимость</th>
            </tr>
          </thead>
          <tbody>
            {pages.map((page) => {
              const { title, id, route, is_visible, lang } = page;

              return (
                <tr key={title + id}>
                  <td>{id}</td>
                  <td>
                    {title}
                    <br />

                    <Link to={`editor/editpage/${id}/kz`}>Каз</Link>
                    <Link to={`editor/editpage/${id}/ru`}>Рус</Link>
                  </td>
                  <td>{route}</td>
                  <td width={40} style={{ textAlign: "center" }}>
                    {is_visible ? (
                      <FaEye size="24" />
                    ) : (
                      <FaEyeSlash color="#dc3545" size="24" />
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>

        {/* NO VISIBLE */}
        {/* if u need to infinite scroll  */}
        {false && (
          <InfiniteScroll
            dataLength={pages.length}
            next={getPages}
            hasMore={hasMore}
            endMessage={pages.length !== 0 && <h4>Все страницы загружены.</h4>}
            loader={<Loader />}
          >
            {false &&
              pages.map((page) => {
                const { title, id, route, is_visible } = page;

                return (
                  <Card className="my-card-post  my-2" key={id}>
                    <Card.Header>
                      <div className="my-card-post-header">
                        <div>
                          <Card.Title>{title}</Card.Title>
                          <Card.Subtitle className="mb-2 text-muted">
                            <p className="mb-0">Путь: {route}</p>
                            <p>Видимость: {is_visible.toString()}</p>
                          </Card.Subtitle>
                        </div>
                      </div>

                      <div className="my-card-post-header-buttons">
                        <Link to="/">
                          <Button>
                            Изменить
                            <FaEdit className="ml-2 mb-1" />
                          </Button>
                        </Link>
                      </div>
                    </Card.Header>
                  </Card>
                );
              })}
          </InfiniteScroll>
        )}
      </div>
    </div>
  );
};

export default Pages;
