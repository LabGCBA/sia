import {Button, Col, Form, Icon, Input, Row} from 'antd';
import React, {Component} from 'react';

import {autobind} from 'core-decorators';

const FormItem = Form.Item;

class ConnectForm extends Component {
    @autobind
    handleSubmit(e) {
        e.preventDefault();

        this
            .props
            .form
            .validateFields((err, values) => {
                if (err) return;

                console.log('Received values of form: ', values);
            });
    }

    render() {
        const styles = require('./ConnectForm.scss');
        const {getFieldDecorator} = this.props.form;

        const colSizeXS = { span: 16, offset: 4 };
        const colSizeSM = { span: 12, offset: 6 };
        const colSizeMD = { span: 12, offset: 6 };
        const colSizeLG = { span: 12, offset: 6 };

        return (
            <Row className="step">
                <Col xs={colSizeXS} sm={colSizeSM} md={colSizeMD} lg={colSizeLG} className="col">
                    <div className="connect-form">
                        <h1>Conecta a una instancia de ODIN</h1>
                        <Form onSubmit={this.handleSubmit} className="login-form">
                            <FormItem>
                                {getFieldDecorator('url', {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Debes ingresar una URL válida'
                                        }
                                    ]
                                })(
                                    <Input addonBefore={<Icon type="link" />} placeholder="URL" />
                                )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator('token', {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Debes ingresar un token'
                                        }
                                    ]
                                })(
                                    <Input
                                      addonBefore={<Icon type="lock" />}
                                      type="text"
                                      placeholder="Token" />
                                )}
                            </FormItem>
                            <FormItem>
                                <Button type="primary" htmlType="submit" className="connect-button">
                                    Conectar
                                </Button>
                            </FormItem>
                        </Form>
                    </div>
                </Col>
            </Row>
        );
    }
}

export default Form.create()(ConnectForm);
