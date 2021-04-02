import React from 'react'

function RightSide({ styles, onClick, current, id }) {
    return(
        <div className={`${styles.right_side}`} id={id} onClick={onClick}>
            <div className={styles.inner_container}>
                <div className={styles.text}>
                    {current}
                </div>
            </div>
        </div>
    )
}

export default function Button({ to, text, className, type, current, onClick, styles, id }) {

    if (to === "rightSide") {
        return <RightSide styles={styles} current={current} onClick={onClick} id={id} />
    }

    return (
        <button type={type} className={className} onClick={onClick}>
            {text}
        </button>
    )
}
