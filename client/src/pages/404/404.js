import React from 'react'

// Components
import Button from '../../components/Button/Button'

// Styles
import styles from './NotFound.module.css'

export default function NotFound(props) {

    const goBack = () => {
        props.history.goBack()
    }

    return (
        <div className={styles.container_404}>
            <div className={styles.noise}></div>
            <div className={styles.overlay}></div>
            <div className={styles.terminal}>
                <h1>
                    Error <span className={styles.errorcode}>404</span>
                </h1>
                <p className={styles.output}>
                    The page you are looking for might have been removed, had its name changed or is temporarily unavailable.
                </p>
                <p className={styles.output}>
                    Please try to <Button
                        type="button"
                        text="Go Back"
                        onClick={goBack}
                        className={styles.btn_goBack}
                    />
                </p>
                <p className={styles.output}>Good lucky</p>
            </div>
        </div>
    )
}
