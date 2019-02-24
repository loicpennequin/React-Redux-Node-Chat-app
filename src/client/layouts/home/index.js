import { useState } from 'react';
import { RegisterForm } from 'components/forms';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';

import SVG from 'react-inlinesvg';
import { Flex, Grid, Card, Button } from 'components/ui';
import img from './../../assets/home-img.svg';

import './style.scss';

const HomeLayout = ({ success, fetching, error }) => {
    const [formDisplayed, setFormDisplayed] = useState(false);

    const toggleForm = () => setFormDisplayed(!formDisplayed);

    return (
        <Grid cols="2" className="height100" styleName="background">
            <Grid.Item>
                <Flex
                    tag="section"
                    justifyContent="center"
                    flexDirection="column"
                    alignItems="center"
                    className="height100 centered"
                    styleName="intro"
                >
                    <h1 className="text-xl text-center m-bottom-sm text-bold">
                        <span>🤖</span> {'<'}Chat App {'>'} <span>🤖</span>
                    </h1>
                    <h2 className="m-bottom-md text-center">
                        This is an application that I made to improve my skills
                        in React, Redux and NodeJs. You can add people as
                        friends and chat with them in real time.
                    </h2>
                    <Button
                        className="align-self-end m-right-md text-sm"
                        color="primary"
                        onClick={toggleForm}
                    >
                        ➡️ Try it out
                    </Button>
                </Flex>
            </Grid.Item>
            <Grid.Item>
                <Flex
                    tag="section"
                    justifyContent="center"
                    alignItems="center"
                    styleName="register-form_wrapper"
                >
                    <SVG
                        src={img}
                        styleName={`img ${formDisplayed ? 'blurred' : ''}`}
                        wrapper={React.createFactory('div')}
                    />
                    <CSSTransition
                        in={formDisplayed}
                        timeout={500}
                        classNames="register-form"
                        unmountOnExit
                        mountOnEnter
                    >
                        <div className="register-form">
                            <RegisterForm />
                        </div>
                    </CSSTransition>
                </Flex>
            </Grid.Item>
        </Grid>
    );
};

function mapState(state) {
    return {
        success: state.register.success,
        fetching: state.register.registering,
        error: state.register.error
    };
}

export default connect(mapState)(HomeLayout);
