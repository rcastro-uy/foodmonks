import React from "react";
import { Alert } from "react-bootstrap";

export const Error = ({error}) => (
        <Alert variant="danger">
            {error}
        </Alert>
);