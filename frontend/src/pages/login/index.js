import { useState } from 'react'

import styles from './styles.module.scss'
import Formulario from '../../components/Form'

import Row from 'react-bootstrap/Row';

export default function LoginPage() {
    let fields = ["Email", "Senha"];

    return (
        <>
            <Row style={{ marginTop: '15%' }}>
                <Formulario title={"Login"} fields={fields} />
            </Row>
        </>
    )
}