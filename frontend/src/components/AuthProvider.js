import React, { Component } from 'react';
import axios from 'axios';

const {
    Provider: AuthContextProvider,
    Consumer: AuthContext,
} = React.createContext();

class AuthProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id: null,
            error: null,
            signIn: this.signIn,
            signOut: this.signOut,
            initialized: false
        }
    }

    componentDidMount() {
        const token = window.localStorage.getItem('token');
        if (token) {
            axios.get('/api/me', {
                headers: {
                    Authorization: `bearer ${token}`,
                }
            })
            .then(response => {
                const { user_id, initialized } = response.data;
                this.setState({ user_id });
                console.log({user_id, token});
                this.setState({ initialized: true });
                console.log({initialized});AuthContext
            })
            .catch(err => {
                console.error(err);
                localStorage.removeItem('token');
            })
        } else {
            this.setState({ initialized: true })
        }
    }

    signIn = ({ email, password }) => {
        axios.post('/auth/login', { email, password })
            .then(response => {
                const { user_id, token } = response.data;
                window.localStorage.setItem('token', token);
                this.setState({ user_id, initialized: true });
                console.log(this.state.user_id, token);
            })
            .catch(error => {
                console.error(error);
                this.setState({ error: 'wrong email or password' });
            })
    }

    signOut = () => {
        localStorage.removeItem('token');
        window.location.reload();
    }


    render() {
        const { children } = this.props;
        return (
            <AuthContextProvider value={this.state}>
                {children}
            </AuthContextProvider>
        )
    }
}

export { AuthContext };
export default AuthProvider;
