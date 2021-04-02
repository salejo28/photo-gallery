import React from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationCircle, faTimes } from '@fortawesome/free-solid-svg-icons'

// Styles
import styles from './Alert.module.css'

library.add(faExclamationCircle, faTimes)

export default function Alert({ options }) {

    if (options.show) {
        const alert = document.getElementById('alert')
        alert.classList.remove(styles.hide)
        alert.classList.add(styles.show)
        alert.classList.add(styles.showAlert)

        setTimeout(() => {
            alert.classList.add(styles.hide)
            alert.classList.remove(styles.show)
        }, 5000)
    }

    const onClick = () => {
        const alert = document.getElementById('alert')
        alert.classList.add(styles.hide)
        alert.classList.remove(styles.show)
    }

    return (
        <div className={`${styles.alert} ${styles.hide}`} id="alert">
            <FontAwesomeIcon icon="exclamation-circle" className={styles.icon} />
            <span className={styles.msg}>{options.message}</span>
            <span className={styles.close_btn} onClick={onClick}>
                <FontAwesomeIcon icon="times" className={styles.icon_times} />
            </span>
        </div>
    )
}
