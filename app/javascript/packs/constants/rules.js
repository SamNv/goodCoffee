export const requireRules = () => { return v => !!v || "This is required" }
export const emailRules = [
    (v) => !!v || "This is required",
    (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
]

export const minRules = value => {
    return v => (v && v.length >= value) || ("Min " + value + " characters")
}

export const maxRules = value => {
    return v => (v && v.length < value) || ("Must be less than " + value) 
}


export const minNumber = value => {
    return v => v ? (v && v >= value) || ("Must be greater than or equal to " + value) : true
}


export const maxNumber = value => {
    return v => v ? (v && v < value) || ("Must be less then or equal to " + value) : true
}