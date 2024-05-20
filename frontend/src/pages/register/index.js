import styles from './styles.module.scss'
import Formulario from '../../components/Form'

export default function RegisterPage() {
    let fields = ["Nome", "Email", "Senha", "Confirmar Senha"];

    return (
        <Formulario title={"Registrar"} fields={fields} margin='5%'/>
    )
}