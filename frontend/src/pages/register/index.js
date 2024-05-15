import { useState } from 'react'

import styles from './styles.module.scss'
import Formulario from '../../components/Form'

import Row from 'react-bootstrap/Row';

export default function RegisterPage() {
    let fields = ["Nome", "Email", "Senha", "Confirmar Senha"];

    return (
        <>
            <Row style={{ marginTop: '10%' }}>
                <Formulario title={"Registrar"} fields={fields} />
            </Row>
        </>
    )
}