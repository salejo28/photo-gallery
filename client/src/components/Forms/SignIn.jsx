import React from 'react'

// Components
import Input from '../Input/Input'
import Button from '../Button/Button'

export function SignIn({ styles, onChange, onSubmit, errors }) {
    return (
        <div className={styles.content}>
            <div className={styles.content_header}>
                Login
            </div>
            <div className={styles.content_form}>
                <form className={styles.form} onSubmit={onSubmit}>
                    <Input 
                        to="form"
                        type="email"
                        name="email"
                        label="Email"
                        styles={styles}
                        onChange={onChange}
                        valid={errors.email.valid}
                        message={errors.email.message}
                        placeholder="email@email.com"
                    />
                    <Input 
                        to="form"
                        type="password"
                        name="password"
                        label="Password"
                        styles={styles}
                        onChange={onChange}
                        valid={errors.password.valid}
                        message={errors.password.message}
                        placeholder="your password"
                    />

                    <Button 
                        type="submit"
                        className={styles.form_btn}
                        text="Login"
                    />
                </form>
            </div>
        </div>
    )
}
