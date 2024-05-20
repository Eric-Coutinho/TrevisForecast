import styles from './styles.module.scss'
import Formulario from '../../components/Form'


export default function LoginPage() {
    let fields = ["Email", "Senha"];

    return (
        <Formulario title={"Login"} fields={fields}/>
    )
}