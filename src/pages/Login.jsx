import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authActions";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";

export default function LoginPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user, loading, error } = useSelector((state) => state.auth);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login({ email, password }));
    };

    return (
        <Container fluid className="vh-100">
            <Row className="h-100">
                <Col
                    md={6}
                    className="bg-warning text-dark d-flex flex-column justify-content-center align-items-start p-5"
                >
                    <h5 className="mb-4 fw-bold">Royel Attire</h5>
                    <h2 className="fw-bold">Elevate Your Style</h2>
                    <p className="mt-3">
                        Discover the latest trends in fashion. <br />
                        Quality wear for every occasion.
                    </p>
                </Col>

                <Col md={6} className="d-flex justify-content-center align-items-center bg-light">
                    <div className="card shadow p-4 w-75 border-0">
                        <div className="card-body">
                            <h3 className="mb-4 text-center fw-bold text-warning">Welcome Back</h3>
                            {error && <Alert variant="danger">{error}</Alert>}
                            <Form onSubmit={submitHandler}>
                                <Form.Group className="mb-3">
                                    <div className="input-group">
                                        <span className="input-group-text bg-white border-end-0">
                                            <i className="bi bi-envelope-fill text-warning"></i>
                                        </span>
                                        <Form.Control
                                            type="email"
                                            className="border-start-0"
                                            placeholder="Enter email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                </Form.Group>

                                <Form.Group className="mb-4">
                                    <div className="input-group">
                                        <span className="input-group-text bg-white border-end-0">
                                            <i className="bi bi-lock-fill text-warning"></i>
                                        </span>
                                        <Form.Control
                                            type="password"
                                            className="border-start-0"
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                </Form.Group>

                                <Button
                                    variant="warning"
                                    type="submit"
                                    disabled={loading}
                                    className="w-100 text-white fw-bold"
                                >
                                    {loading ? 'Logging in...' : 'Login'}
                                </Button>
                            </Form>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}
