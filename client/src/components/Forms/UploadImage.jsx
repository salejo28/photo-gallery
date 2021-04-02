import React, { Fragment, useState } from 'react'

// Components
import Input from '../Input/Input'
import Button from '../Button/Button'

export default function UploadImage({ styles, setForm, setAlert }) {

    const [fileToImage, setFileToImage] = useState("http://www.jdevoto.cl/web/wp-content/uploads/2018/04/default-user-img.jpg")
    const [fileToSend, setFile] = useState({})

    const onChange = (e) => {
        
        var pattern = /^image/

        if (!pattern.test(e.target.files[0].type)) {
            setAlert(true, "The uploaded file is not an image")
            return
        }

        setFile(e.target.files[0])

        setFileToImage(URL.createObjectURL(e.target.files[0]))
        setForm(e)
    }

    const sendToServer = (file) => {

        if (Object.entries(file).length === 0) {
            setAlert(true, "Choose an image")
            return
        }
        
        try {
            console.log(file)
            
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Fragment>
            <div className={styles.container_upload}>

                <img
                    src={fileToImage}
                    alt="Set User"
                    className={styles.img}
                />

                <div className={styles.group}>
                    <div className={styles.div_file}>
                        <p className={styles.add_file}>Add File</p>
                        <Input
                            type="file"
                            name="file"
                            onChange={onChange}
                            className={styles.file}
                        />
                    </div>
                </div>
            </div>
            <div className={styles.content_btns}>
                <Button
                    type="button"
                    className={`${styles.btn} ${styles.btn_skip}`}
                    text="Skip"
                />
                <Button
                    type="button"
                    className={`${styles.btn} ${styles.btn_send}`}
                    text="Send"
                    onClick={() => sendToServer(fileToSend)}
                />
            </div>
        </Fragment>
    )
}
