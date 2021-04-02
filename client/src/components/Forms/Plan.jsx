import React, { Fragment } from 'react'

// Components
import Button from '../Button/Button'
import Input from '../Input/Input'

export default function Plan({ styles, formData, navigation, setForm, setAlert }) {

    const { plan } = formData

    const sendToServer = () => {

        if (plan === "") {
            setAlert(true, "Choose a plan")
            return
        }

        const data = {
            plan: plan
        }

        console.log(data)

        navigation.next()
    }
    return (
        <Fragment>
            <div className={styles.content_plan}>
                <label className={styles.card}>
                    <Input
                        type="radio"
                        className={styles.input}
                        onChange={setForm}
                        name="plan"
                        value="free"
                    />
                    <div className={styles.panel}>
                        <div className={styles.panel_heading}>
                            <span>Basic</span>
                        </div>
                        <div className={styles.panel_body}>
                            <div>
                                <b>Price:</b> <span>Free</span>
                            </div>
                            <div>
                                <b>Storage:</b> <span>5G</span>
                            </div>
                        </div>
                    </div>
                </label>
                <label className={styles.card}>
                    <Input
                        type="radio"
                        className={styles.input}
                        onChange={setForm}
                        name="plan"
                        value="pro"
                    />
                    <div className={styles.panel}>
                        <div className={styles.panel_heading}>
                            <span>Pro</span>
                        </div>
                        <div className={styles.panel_body}>
                            <div>
                                <b>Price:</b> <span>$6 US / mon</span>
                            </div>
                            <div>
                                <b>Storage:</b> <span>100G</span>
                            </div>
                        </div>
                    </div>
                </label>
            </div>

            <div className={styles.content_btns}>
                <Button
                    type="button"
                    className={`${styles.btn} ${styles.btn_send}`}
                    text="Next"
                    onClick={sendToServer}
                />
            </div>
        </Fragment>
    )
}
