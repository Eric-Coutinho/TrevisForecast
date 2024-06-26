import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './styles.module.scss'

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

import axios from "axios";
import CryptoJS from "crypto-js";
import { SECRET } from "../../env";
import { jwtDecode } from 'jwt-decode';
import { BackAPI } from '../../api/api';

export default function Formulario({ title, fields, margin }) {
    const [formData, setFormData] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        localStorage.setItem('formData', JSON.stringify(formData));
        localStorage.setItem('name', formData.Nome || "");
        localStorage.setItem('email', formData.Email || "");
        localStorage.setItem('senha', formData.Senha || "");
        localStorage.setItem('confirma', formData['Confirmar Senha'] || "");
    }, [formData]);

    const handleInputChange = (fieldName, value) => {
        setFormData(prevState => ({
            ...prevState,
            [fieldName]: value
        }));
    };

    const handleSubmit = async () => {
        const { Email, Senha, Nome, 'Confirmar Senha': ConfirmarSenha } = formData;

        if (!Email || !Senha || (title == "Registrar" && (!Nome || !ConfirmarSenha))) {
            alert("Os campos não podem estar vazios.");
            return;
        }

        if (ConfirmarSenha && Senha !== ConfirmarSenha) {
            alert("As senhas não coincidem.");
            return;
        }

        if (title == "Registrar") {
            const json = {
                name: Nome,
                email: Email,
                password: Senha
            };

            const jsonCrypt = CryptoJS.AES.encrypt(
                JSON.stringify(json),
                SECRET
            ).toString();

            try {
                const res = await BackAPI.post("/user/register", {
                    jsonCrypt
                });

                alert("Usuário Cadastrado com sucesso!");
                navigate('/');
            } catch (error) {
                alert("Falha ao criar usuário.");
                console.log(error, "error");
            }
        }

        else if (title == "Login") {
            const json = {
                email: Email,
                password: Senha
            };

            const jsonCrypt = CryptoJS.AES.encrypt(
                JSON.stringify(json),
                SECRET
            ).toString();

            const res = await BackAPI.post("/user/login", {
                jsonCrypt
            }).then((res) => {
                const response = res.data.token;

                let token = jwtDecode(response);
                token = token.id;

                sessionStorage.setItem("token", token);
                navigate('/');
            })
                .catch((error) => {
                    alert("Falha ao realizar login.");
                    console.log(error, "error");
                });
        }
    };

    return (
        <Container style={{ marginTop: margin ? margin : '10%' }}>
            <Row className={styles.cardRow}>
                <Col sm="12" md="12" lg="6" className={styles.cardBody}>
                    <div className={styles.title}>
                        {title}
                    </div>
                    <Form>
                        <Form.Group className="mb-3">
                            {fields.map((field, i) => {
                                let type = 'text';

                                if (field === 'Senha' || field === 'Confirmar Senha')
                                    type = 'password';
                                else if (field == 'Email')
                                    type = 'email';

                                return (
                                    <div key={i} className={styles.inputDiv}>
                                        <Form.Label className={styles.label}>{field}</Form.Label>
                                        <Form.Control type={type} placeholder={field} onChange={(e) => handleInputChange(field, e.target.value)}></Form.Control>
                                    </div>
                                )
                            })}
                        </Form.Group>
                    </Form>
                    <Button variant='primary' className={styles.btn} onClick={handleSubmit} type='submit'>{title}</Button>
                    <Button variant='secondary' className={styles.btn}>Cancelar</Button>
                </Col>
            </Row>
        </Container>
    )

}