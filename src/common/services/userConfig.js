import { store } from '../../redux/store';
let count = 0;
export default function CommonUserConfig() {
    const state = store.getState();
    const { userInfo } = state?.userLogin;

    const config = {
        headers: {
            'Content-Type': 'application/json',
            authorization: userInfo?.data.token
        }
    };
    count = count + 1;
    return config;
}
