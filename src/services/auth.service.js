

class AuthService {

    login(user) {
        console.log(user);
        fetch('auth.json')
            .then(response => response.json())
            .then(data => {
                console.log('auth.json');
                console.log(data);
                return data;
            })
    }

}

export default AuthService;