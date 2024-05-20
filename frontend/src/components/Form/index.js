import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './styles.module.scss'

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import axios from "axios";
import CryptoJS from "crypto-js";
import {jwtDecode} from 'jwt-decode';
import { SECRET } from "../../env";

export default function Formulario({ title, fields, margin }) {
    const [formData, setFormData] = useState({});
    const [name, setName] = useState({});
    const [email, setEmail] = useState({});
    const [password, setPassword] = useState({});

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

        setName(Nome);
        setEmail(Email);
        setPassword(Senha);

        if (title == "Registrar") {
            const json = {
                name,
                email,
                password
            };

            const jsonCrypt = CryptoJS.AES.encrypt(
                JSON.stringify(json),
                SECRET
            ).toString();

            console.log(jsonCrypt);

            try {
                var res = await axios.post("http://localhost:8080/api/user/register", {
                    jsonCrypt
                });

                console.log(res.data.message);
                alert("Usuário Cadastrado com sucesso!");
                setName("");
                setEmail("");
                setPassword("");
                navigate('/');
            } catch (error) {
                alert("Falha ao criar usuário.");
                console.log(error);
            }
        }

        else if (title == "Login") {
            const json = {
                email,
                password
            };

            const jsonCrypt = CryptoJS.AES.encrypt(
                JSON.stringify(json),
                SECRET
            ).toString();

            try {
                var res = await axios.post("http://localhost:8080/api/user/login", {
                    jsonCrypt
                });

                const response = res.data.token;
                console.log("res: ", response);

                let token = jwtDecode(response);
                token = token.id;

                sessionStorage.setItem("token", token);
                setName("");
                setEmail("");
                setPassword("");
                navigate('/');
            } catch (error) {
                alert("Falha ao realizar login.");
                console.log(error);
            }
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