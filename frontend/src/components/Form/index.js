import styles from './styles.module.scss'

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { useState } from 'react';

export default function Formulario({ title, fields }) {
    const [formData, setFormData] = useState({});
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleInputChange = (fieldName, value) => {
        setFormData(prevState => ({
            ...prevState,
            [fieldName]: value
        }));
    };

    const handleSubmit = () => {
        const { Email, Senha, Nome, 'Confirmar Senha': ConfirmarSenha } = formData;

        if (!Email || !Senha) {
            alert("Os campos não podem estar vazios.");
            return;
        }

        setEmail(Email);
        setPassword(Senha);

        if (Nome)
            setName(Nome);

        if (ConfirmarSenha)
            setConfirmPassword(ConfirmarSenha);

        if (ConfirmarSenha) {
            if (Senha !== ConfirmarSenha) {
                alert("As senhas não coincidem.");
                return;
            }
        }

        localStorage.setItem('email', Email);
        localStorage.setItem('senha', Senha);
        localStorage.setItem('confirma', ConfirmarSenha);

        console.log(name, Email, Senha, ConfirmarSenha);
    };

    return (
        <Container className={styles.formContainer}>
            <h2 style={{ textAlign: 'center' }}>
                {title}
            </h2>
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
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