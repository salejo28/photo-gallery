import React from 'react'
import { useForm, useStep } from 'react-hooks-helper'

// Components
import UploadImageForm from './UploadImage'
import Plan from './Plan'

export function MultiSteps({ styles, setAlert }) {

    const defaultData = {
        plan: "",
        file: null
    }

    const steps = [
        { id: "plan" },
        { id: "file" }
    ]

    const [formData, setForm] = useForm(defaultData)
    const { step, navigation } = useStep({
        steps,
        initialStep: 0
    })

    const props = { formData, setForm, navigation, styles, setAlert }

    switch (step.id) {
        case "plan":
            return (
                <div>
                    <Plan {...props} />
                </div>
            )
        case "file": 
            return (
                <div>
                    <UploadImageForm {...props} />
                </div>
            )
        default:
            break;
    }

    /* return (
        <div>
            <div>

            </div>
            <div>
                <UploadImageForm {...props} />
            </div>
        </div>
    ) */
}
