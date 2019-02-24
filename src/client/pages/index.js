import { RegisterForm } from 'components/forms';
import { connect } from 'react-redux';

import HomeLayout from 'layouts/home';

const Index = () => {
    return <HomeLayout />;
};
Index.authLevel = 'public';

export default Index;
