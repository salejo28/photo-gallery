const expressions = {
    username: /^[a-zA-Z0-9_-]{4,16}$/,
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    password: /^.{4,16}$/
}

function CheckField(name, value) {

    if (expressions[name].test(value)) {
        return true
    }

    return false

}

export function ValidateLogin(name, value) {
    let valid
    let message

    let result

    switch (name) {
        case "email":
            result = CheckField(name, value)
            if (!result) {
                valid = result
                message = "Invalid Email"
            } else {
                valid = result
                message = ""
            }

            break
        case "password":
            result = CheckField(name, value)
            if (!result) {
                valid = result
                message = "The password must have 4 to 16 digits"
            } else {
                valid = result
                message = ""
            }

            break
        default:
            break
    }

    return { valid, message }

}

export function ValidateRegister(name, value) {
    let valid
    let message

    let result

    switch (name) {
        case "username":
            result = CheckField(name, value)
            if (!result) {
                valid = result
                message = "The username can contain letters, numbers, hyphen, underscore"
            } else {
                valid = result
                message = ""
            }
            break
        case "email":
            result = CheckField(name, value)
            if (!result) {
                valid = result
                message = "Invalid Email"
            } else {
                valid = result
                message = ""
            }

            break
        case "password":
            result = CheckField(name, value)
            if (!result) {
                valid = result
                message = "The password must have 4 to 16 digits"
            } else {
                valid = result
                message = ""
            }

            break
        default:
            break
    }

    return { valid, message }
}

export function CheckMatchPasswords(password, confirmPassword) {

    if (password !== confirmPassword) {
        return false
    }

    return true

}