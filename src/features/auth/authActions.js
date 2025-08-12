import { loginStart, loginSuccess, loginFailure } from './authSlice';

export const login = ({ email, password }) => async (dispatch) => {
    dispatch(loginStart());

    // Simulate API call delay
    await new Promise((r) => setTimeout(r, 1000));

    // Dummy fixed email and password
    const dummyEmail = 'admin@example.com';
    const dummyPassword = '123456';

    if (email === dummyEmail && password === dummyPassword) {
        dispatch(loginSuccess({
            user: { id: 1, name: 'Admin User', email: dummyEmail, role: 'Admin' },
            token: 'fake-jwt-token-123',
        }));
    } else {
        dispatch(loginFailure('Invalid email or password'));
    }
};
