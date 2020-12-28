import User from '../../models/users/User';

export default {
    render(user: User) {
        return {
            id: user.id
        };
    },
};