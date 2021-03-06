import * as appActions from '../../redux/actions/app/creators';
import * as navigationActions from '../../redux/actions/navigation/creators';
import * as step1Actions from '../../redux/actions/step1/creators';
import * as step2Actions from '../../redux/actions/step2/creators';
import * as step3Actions from '../../redux/actions/step3/creators';
import * as step4Actions from '../../redux/actions/step4/creators';

import {Col, Grid, Row} from 'antd';
import {Navigation, Steps} from '../../components';
import React, {Component, PropTypes} from 'react';

import Emitter from 'wildemitter';
import {autobind} from 'core-decorators';
import {bindActionCreators} from 'redux';
import config from '../../config';
import {connect} from 'react-redux';

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            step1: bindActionCreators(step1Actions, dispatch),
            step2: bindActionCreators(step2Actions, dispatch),
            step3: bindActionCreators(step3Actions, dispatch),
            step4: bindActionCreators(step4Actions, dispatch),
            app: bindActionCreators(appActions, dispatch),
            navigation: bindActionCreators(navigationActions, dispatch)
        }
    };
}

function mapStateToProps(state) {
    return {
        stores: {
            app: state.app,
            step1: state.step1,
            step2: state.step2,
            step3: state.step3,
            step4: state.step4,
            navigation: state.navigation
        }
    };
}

@connect(mapStateToProps, mapDispatchToProps)
export default class App extends Component {
    static propTypes = {
        stores: PropTypes.shape({
            app: PropTypes.object.isRequired,
            step1: PropTypes.object.isRequired,
            step2: PropTypes.object.isRequired,
            step3: PropTypes.object.isRequired,
            step4: PropTypes.object.isRequired,
            navigation: PropTypes.object.isRequired
        }).isRequired,
        actions: PropTypes.shape({
            step1: PropTypes.object.isRequired,
            step2: PropTypes.object.isRequired,
            step3: PropTypes.object.isRequired,
            step4: PropTypes.object.isRequired,
            app: PropTypes.shape({
                setInstance: PropTypes.func.isRequired,
                setFiles: PropTypes.func.isRequired,
                addData: PropTypes.func.isRequired
            }).isRequired,
            navigation: PropTypes.shape({
                previous: PropTypes.func.isRequired,
                next: PropTypes.func.isRequired
            }).isRequired
        }).isRequired
    };

    constructor(props) {
        super(props);

        this.events = new Emitter();
    }

    render() {
        const styles = require('./App.scss');

        const colSizes = {
            xs: {
                span: 22
            },
            sm: {
                span: 20
            },
            md: {
                span: 20
            },
            lg: {
                span: 18
            }
        };

        return (
            <Row id="app" type="flex" align="middle" justify="center">
                <Col xs={colSizes.xs} sm={colSizes.sm} md={colSizes.md} lg={colSizes.lg} id="container">
                    <Steps
                      stores={{
                          step1: this.props.stores.step1,
                          step2: this.props.stores.step2,
                          step3: this.props.stores.step3,
                          step4: this.props.stores.step4
                      }}
                      actions={{
                          step1: this.props.actions.step1,
                          step2: this.props.actions.step2,
                          step3: this.props.actions.step3,
                          step4: this.props.actions.step4,
                          app: this.props.actions.app
                      }}
                      events={this.events}
                      instance={{
                          endpoints: this.props.stores.app.endpoints,
                          token: this.props.stores.app.token
                      }}
                      files={this.props.stores.app.files}
                      loadingFiles={this.props.stores.app.loadingFiles}
                      step={this.props.stores.navigation.current} />
                    <Navigation
                      store={this.props.stores.navigation}
                      getPrevious={this.props.actions.navigation.previous}
                      getNext={this.props.actions.navigation.next}
                      finished={this.props.stores.navigation.current === this.props.stores.app.lastStep} />
                </Col>
            </Row>
        );
    }
}
