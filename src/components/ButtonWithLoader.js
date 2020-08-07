import React from "react";
import { Button, Spinner } from "react-bootstrap";

const ButtonWithLoader = ({ options, children, loading, ...other }) => {
  return (
    <Button
      disabled={loading}
      variant={options[0]}
      type={options[1]}
      className="mt-2"
      {...other}
    >
      {loading && (
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
          className="mr-2"
        />
      )}
      {children}
    </Button>
  );
};

export default ButtonWithLoader;
