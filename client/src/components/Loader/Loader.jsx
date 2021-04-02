import React from 'react'

// Styles
import styles from './Loader.module.css'

function LoaderPage() {
    return (
        <div className={styles.loader_content}>
            <h2>Loading...</h2>
        </div>
    )
}

export default function Loader({ to }) {

    if (to === 'page') {
        return <LoaderPage />
    }

    return (
        <div>
            Loading...
        </div>
    )
}
