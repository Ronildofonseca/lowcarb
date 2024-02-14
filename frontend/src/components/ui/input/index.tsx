import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'
import styles from './styles.module.scss'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> { }
interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> { }
//cria uma interface que vai tipar o input de forma que ele se torna agnostico a qualquer modificação, onde foi passado como parametro o ...rest que serão as definições passadas, segundo a necessidade onde ele for ser utilizado.
export function Input({ ...rest }: InputProps) {
    return (
        <input className={styles.input}{...rest} />
    )
}

export function TextArea({ ...rest }: TextAreaProps) {
    return (
        <textarea className={styles.input}{...rest}></textarea>
    )
}