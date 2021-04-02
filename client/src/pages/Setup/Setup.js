import React, { Component, Fragment } from 'react'

// Components
import { MultiSteps } from '../../components/Forms/index'
import Alert from '../../components/Alert/Alert'

// Styles
import styles from './Setup.module.css'

export default class Setup extends Component {

    state = {
        alert: {
            show: false,
            message: ""
        }
    }

    setShowAlert(show, message) {
        let { alert } = this.state

        alert.show = show
        alert.message = message

        this.setState({
            alert
        })

    }

    render() {
        const { alert } = this.state

        return (

            <Fragment>
                <Alert options={alert} />
                <div className={styles.container_set}>
                    <div className={styles.content}>
                        <div className={styles.content_multisteps}>
                            <MultiSteps styles={styles} setAlert={this.setShowAlert.bind(this)} />
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}
