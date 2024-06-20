import api from '../../api'

export const login = (form, navigate) => () => {

    api.post('/auth/login', {
        email: form.email,
        password: form.password
    })
        .then((res) => {
            const { token, refreshToken } = res.data.data
            localStorage.setItem('token', token)
            localStorage.setItem('refreshToken', refreshToken)
            alert(`Login berhasil. Selamat datang!`)
            navigate('/')
        })
        .catch((err) => {
            console.log(err.response);
            const error = err.response.data
            alert(`Anda gagal login - ${error.message}`)
        })
}

export const registerTalent = (form, navigate) => () => {

    api.post('/workers/register', {
        email: form.email,
        password: form.password,
        name: form.name,
        phone: form.phone
    })
        .then((res) => {
            console.log(res.response);
            alert(`Register berhasil dengan email ${form.email} dan password ${form.password}. Silakan Login`)
            navigate('/login')
        })
        .catch((err) => {
            console.log(err.response);
            const error = err.response.data
            alert(`Anda gagal register - ${error.message}`)
        })
}

export const registerRecruiter = (form, navigate) => () => {

    api.post('/recruiters/register', {
        email: form.email,
        password: form.password,
        name: form.name,
        company: form.company,
        position: form.position,
        phone: form.phone
    })
        .then((res) => {
            console.log(res.response);
            alert(`Register berhasil dengan email ${form.email} dan password ${form.password}. Silakan Login`)
            navigate('/login')
        })
        .catch((err) => {
            console.log(err.response);
            const error = err.response.data
            alert(`Anda gagal register - ${error.message}`)
        })
}

