import { useEffect, useState } from 'react';

import styles from './styles.module.scss'

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

import axios from "axios";
import CryptoJS from "crypto-js";
import { SECRET } from "../../env";

export default function Formulario({ title, fields }) {
    const [formData, setFormData] = useState({});
    const [name, setName] = useState({});
    const [email, setEmail] = useState({});
    const [password, setPassword] = useState({});


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

        const json = {
            name,
            email,
            password
        };

        const jsonCrypt = CryptoJS.AES.encrypt(
            JSON.stringify(json),
            SECRET
        ).toString();

        console.log(jsonCrypt.toString());

        try {
            var res = await axios.post("http://localhost:8080/api/user/register", {
                jsonCrypt,
            });

            console.log(res.data.message);
            setName("");
            setEmail("");
            setPassword("");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Container className={styles.formContainer}>
            <h2 style={{ textAlign: 'center' }}>
                {title}
            </h2>
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
                                <Form.Label>{field}</Form.Label>
                                <Form.Control type={type} placeholder={field} onChange={(e) => handleInputChange(field, e.target.value)}></Form.Control>
                            </div>
                        )
                    })}
                </Form.Group>
            </Form>
            <div className={styles.btnArea}>
                <Button variant='primary' className={styles.btn} onClick={handleSubmit} type='submit'>{title}</Button>
                <Button variant='danger' className={styles.btn}>Cancelar</Button>
            </div>
        </Container>
    )

}