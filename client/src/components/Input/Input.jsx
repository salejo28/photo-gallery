import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faExclamationCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons'

library.add(faCheckCircle, faExclamationCircle)

function ValidateInputForm({ type, name, label, message, placeholder, onChange, styles, valid }) {
    
    const ValidateIcon = ({ className, valid }) => {
        return !valid ? 
            (<FontAwesomeIcon icon="exclamation-circle" className={className} />) : 
            (<FontAwesomeIcon icon="check-circle" className={className} />)
    }

    const validateClass = valid === null ? '': !valid ? `${styles.form_control_error}` : `${styles.form_control_success}`

    return(
        <div className={`${styles.form_control} ${validateClass}`}>
            <label htmlFor={name}>{label}</label>
            <input 
                type={type}
                name={name}
                onChange={onChange}
                placeholder={placeholder}
                className={styles.form_input}
            />
            <ValidateIcon className={styles.icon} valid={valid} />
            <small>{message}</small>
        </div>
    )

}

export default function Input({to, type, onChange, name, label, styles, message, placeholder, valid, className, checked, value }) {

    if (to === 'form') {
        return <ValidateInputForm 
            type={type} 
            name={name} 
            onChange={onChange}
            label={label}
            styles={styles}
            message={message}
            placeholder={placeholder}
            valid={valid}
        />
    }

    return (
        <input 
            type={type}
            placeholder={placeholder}
            name={name}
            onChange={onChange}
            className={className}
            checked={checked}
            value={value}
        />
    )
}
