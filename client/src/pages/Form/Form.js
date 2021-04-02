import React, { Component, Fragment } from 'react'

// Components
import { SignIn, SignUp } from '../../components/Forms/index'
import Button from '../../components/Button/Button'
import Alert from '../../components/Alert/Alert'

// Helpers
import { CheckMatchPasswords, ValidateLogin, ValidateRegister } from '../../helpers/Validation'

// Styles
import styles from './Form.module.css'

export default class Form extends Component {

    state = {
        login: true,
        argsLogin: {},
        argsRegister: {},
        errors: {
            username: {
                valid: null,
                message: ""
            },
            email: {
                valid: null,
                message: ""
            },
            password: {
                valid: null,
                message: ""
            },
            confirmPassword: {
                valid: null,
                message: ""
            }
        },
        alert: {
            show: false,
            message: ""
        }
    }

    componentDidMount() {
        document.getElementById("rightSide").classList.add(styles.right)
    }

    showAlert() {
        let { alert } = this.state
        alert.show = true
        alert.message = "Fill out the form correctly"
        this.setState({
            alert
        })
    }

    hideAlert() {
        let { alert } = this.state
        if (alert.show) {
            alert.show = false
            alert.message = ""
            this.setState({
                alert
            })
        }
    }

    clearErrors() {
        let { errors } = this.state
        const array = ['username', 'email', 'password', 'confirmPassword']
        array.map(field => {
            errors[field].valid = null
            errors[field].message = ""
        })
    }

    changeState() {
        const { login } = this.state
        let { errors, argsLogin, argsRegister } = this.state

        if (login) {
            document.getElementById("rightSide").classList.remove(styles.right)
            document.getElementById("rightSide").classList.add(styles.left)
        } else {
            document.getElementById("rightSide").classList.remove(styles.left)
            document.getElementById("rightSide").classList.add(styles.right)
        }

        this.clearErrors()

        argsLogin = {}
        argsRegister = {}

        this.setState(prevState => ({
            login: !prevState.login,
            errors: errors, argsRegister,
            argsLogin
        }))

    }

    onChangeLogin(e) {
        const { name, value } = e.target
        let { errors, argsLogin } = this.state

        this.hideAlert()

        const { message, valid } = ValidateLogin(name, value)

        switch (name) {
            case "email":
                errors.email.valid = valid
                errors.email.message = message
                break;
            case "password":
                errors.password.valid = valid
                errors.password.message = message
                break
            default:
                break;
        }

        argsLogin[name] = value

        this.setState({
            errors,
            argsLogin
        })


    }

    onChangeRegister(e) {
        const { name, value } = e.target
        let { errors, argsRegister } = this.state

        this.hideAlert()

        const { message, valid } = ValidateRegister(name, value)

        switch (name) {
            case "username":
                errors.username.valid = valid
                errors.username.message = message
                break;
            case "email":
                errors.email.valid = valid
                errors.email.message = message
                break;
            case "password":
                errors.password.valid = valid
                errors.password.message = message
                break
            case "confirmPassword":
                if (!CheckMatchPasswords(argsRegister.password, value)) {
                    errors.confirmPassword.valid = false
                    errors.confirmPassword.message = "Passwords do not match"
                } else {
                    errors.confirmPassword.valid = true
                    errors.confirmPassword.message = ""
                }
                break
            default:
                break;
        }

        argsRegister[name] = value
        this.setState({
            argsRegister,
            errors
        })

    }

    onSubmitLogin(e, args) {
        e.preventDefault()
        const { errors } = this.state

        if (!errors.email.valid || !errors.password.valid) {
            this.showAlert()
        } else {
            console.log(args)
        }

    }

    onSubmitRegister(e, args) {
        e.preventDefault()
        const { errors } = this.state

        if (!errors.email.valid || !errors.password.valid || !errors.username.valid || !errors.confirmPassword.valid) {
            this.showAlert()
        } else {
            console.log(args)
        }
    }

    render() {
        const { login, argsLogin, argsRegister, errors, alert } = this.state
        const current = login ? "Register" : "Login"
        return (
            <Fragment>
                <Alert options={alert} />
                <div className={styles.content_forms}>
                    <div className={styles.login}>
                        <div className={styles.container}>
                            {
                                login && <SignIn
                                    styles={styles}
                                    onChange={this.onChangeLogin.bind(this)}
                                    onSubmit={e => this.onSubmitLogin(e, argsLogin)}
                                    errors={errors}
                                />
                            }
                            {
                                !login && <SignUp
                                    styles={styles}
                                    onChange={this.onChangeRegister.bind(this)}
                                    onSubmit={e => this.onSubmitRegister(e, argsRegister)}
                                    errors={errors}
                                />
                            }
                        </div>
                        <Button
                            to="rightSide"
                            id="rightSide"
                            styles={styles}
                            onClick={this.changeState.bind(this)}
                            current={current}
                        />
                    </div>
                </div>
            </Fragment>
        )
    }
}
