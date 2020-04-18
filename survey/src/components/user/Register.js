import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FieldGroup, Captcha } from '../common/Commons';
import {
    Alert,
    Radio,
    Button,
    Col,
    Form,
    FormGroup,
    ControlLabel,
    PageHeader,
    ButtonToolbar,
    Checkbox,
} from 'react-bootstrap';
import revalidator from 'revalidator';


const schema = {
    properties: {
        username: {
            type: 'string',
            required: true,
            format: 'email',
            allowEmpty: false,
            // allowEmpty: false,
            // pattern: /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/,
            messages: {
                required: 'ایمیل را وارد کنید.',
                allowEmpty: 'ایمیل را وارد کنید.',
                format: 'ایمیل معتبر وارد کنید'
            }
        },
        password: {
            type: 'string',
            required: true,
            allowEmpty: false,
            messages: {
                required: 'گذرواژه را وارد کنید.',
            }
            // pattern: /^[a-z0-9_-]{6,18}$/ // copied from https://code.tutsplus.com/tutorials/8-regular-expressions-you-should-know--net-6149
        },
        confirmPassword: {
            type: 'string',
            required: true,
            // pattern: /^[a-z0-9_-]{6,18}$/,
            allowEmpty: false,
            messages: {
                required: 'گذرواژه را تکرار کنید.',
            }
        },
        // email: {
        //     type: 'string',
        //     required: true,
        //     format: 'email',
        //     // allowEmpty: false
        // },
        name: {
            type: 'string',
            required: true,
            allowEmpty: false,
            pattern: /^[\u0600-\u06FF\s]|[a-z]+$/,
            messages: {
                required: 'نام را وارد کنید.',
                pattern: 'نام معتبر وارد کنید.',
            }
        },
        // lastName: {
        //     type: 'string',
        //     required: true,
        //     allowEmpty: false,
        //     pattern: /^[\u0600-\u06FF\s]|^[a-z]+$/,
        //     messages: {
        //         required: 'نام خانوادگی را وارد کنید.',
        //         pattern: 'نام خانوادگی معتبر وارد کنید.',
        //     }
        // },
        gender: {
            enum: ['MALE', 'FEMALE']
        },
        edu: {
            enum: ['DI', 'BS', 'MS', 'DR']
        },
        captchaCode: {
            type: 'string',
            required: true,
            allowEmpty: false,
            messages: {
                required: 'کد امنیتی مندرج در تصویر فوق را وارد کنید.',
            }
        }
    }
}

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = { registerModel: {}, errors: {} };
        this.onFieldChange = this.onFieldChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }


    onFieldChange(e) {
        const { name, value } = e.target;
        this.setState({
            registerModel: {
                ...this.state.registerModel,
                [name]: value
            },
            errors: {
                ...this.state.errors,
                [name]: null
            }
        });
        // this.validateFields(name);
    }

    validateFields() {
        const { registerModel } = this.state;
        const validatorResult = revalidator.validate(registerModel, schema);
        let errors = {};

        if (!validatorResult.valid) {

            errors = validatorResult.errors.reduce((errors, error) => {
                errors[error.property] = error.message;
                return errors;
            }, {});
        }

        if (!errors['confirmPassword'] && registerModel.confirmPassword != registerModel.password) {
            errors['confirmPassword'] = "گذرواژه ها تطابق ندارند.";
        }

        return errors;
    }

    onSubmit(e) {
        e.preventDefault();
        const errors = this.validateFields();
        const { registerModel } = this.state;
        const { onSubmit } = this.props;

        if (Object.keys(errors).length > 0) {

            this.setState({
                ...this.state,
                errors
            })

        } else {
            onSubmit(registerModel);
        }

    }

    render() {
        const { submitting, callbackError, captcha, reloadCaptchaHandler } = this.props;
        const { errors } = this.state;

        return (
            <div>
                <PageHeader>
                    ثبت نام
				</PageHeader>
                <Col xs={12} sm={8} md={4} lg={4} lgOffset={4} mdOffset={4} smOffset={2}>

                    <Form onChange={this.onFieldChange} onSubmit={this.onSubmit} >
                        {callbackError ?

                            <Alert bsStyle="danger">
                                {callbackError}
                            </Alert>
                            :
                            null
                        }


                        <FieldGroup
                            id="registerUsername"
                            label="ایمیل"
                            name="username"
                            validationState={errors['username'] ? "error" : null}
                            help={errors['username'] ? errors['username'] : null}
                            placeholder="Email"
                            style={{ direction: "ltr" }}
                            type="text" />

                        <FieldGroup
                            id="registerPassword"
                            label="گذرواژه"
                            name="password"
                            validationState={errors['password'] ? "error" : null}
                            help={errors['password'] ? errors['password'] : null}
                            placeholder="گذرواژه"
                            type="password" />

                        <FieldGroup
                            id="registerConfirmPassword"
                            label="تکرار گذرواژه"
                            name="confirmPassword"
                            validationState={errors['confirmPassword'] ? "error" : null}
                            help={errors['confirmPassword'] ? errors['confirmPassword'] : null}
                            placeholder="تکرار گذرواژه"
                            type="password" />

                        <FieldGroup
                            id="registerName"
                            label="نام (نام مستعار)"
                            name="name"
                            validationState={errors['name'] ? "error" : null}
                            help={errors['name'] ? errors['name'] : null}
                            placeholder="نام (نام مستعار)"
                            type="text" />

                        {/* <FieldGroup
                            id="registerLastName"
                            label="نام خانوادگی"
                            name="lastName"
                            validationState={errors['lastName'] ? "error" : null}
                            help={errors['lastName'] ? errors['lastName'] : null}
                            placeholder="نام خانوادگی"
                            type="text" /> */}

                        {/* <FieldGroup
                            id="registerEmail"
                            label="ایمیل"
                            name="email"
                            validationState={errors['email'] ? "error" : null}
                            help={errors['email'] ? errors['email'] : null}
                            placeholder="Email"
                            style={{ direction: "ltr" }}
                            type="text" /> */}

                        <FormGroup>
                            <ControlLabel>جنسیت</ControlLabel>
                            <fieldset>
                                <Radio value="MALE" name="gender" inline>
                                    مذکر
                            </Radio>
                                {' '}
                                <Radio value="FEMALE" name="gender" inline>
                                    مونث
                            </Radio>
                            </fieldset>
                        </FormGroup>

                        <FormGroup >
                            <ControlLabel>سطح تحصیلات</ControlLabel>
                            <fieldset >
                                <Radio value="DI" name="edu" inline>
                                    دیپلم
                            </Radio>
                                {' '}
                                <Radio value="BS" name="edu" inline>
                                    لیسانس
                            </Radio>
                                {' '}
                                <Radio value="MS" name="edu" inline>
                                    فوق‌لیسانس
                            </Radio>
                                {' '}
                                <Radio value="DR" name="edu" inline>
                                    دکترا
                            </Radio>
                                {' '}
                            </fieldset>
                        </FormGroup>

                        <FieldGroup
                            id="ًregisterSchoolDiscipline"
                            label="رشته تحصیلی دبیرستان"
                            name="schoolDiscipline"
                            validationState={errors['schoolDiscipline'] ? "error" : null}
                            help={errors['schoolDiscipline'] ? errors['schoolDiscipline'] : null}
                            placeholder="رشته تحصیلی دبیرستان"
                            type="text" />

                        <FieldGroup
                            id="ًregisterUnivDiscipline"
                            label="رشته تحصیلی دانشگاه"
                            name="univDiscipline"
                            validationState={errors['univDiscipline'] ? "error" : null}
                            help={errors['univDiscipline'] ? errors['univDiscipline'] : null}
                            placeholder="رشته تحصیلی دانشگاه"
                            type="text" />

                        <FieldGroup
                            id="ًregisterCityBirth"
                            label="شهر محل تولد"
                            name="cityBirth"
                            validationState={errors['cityBirth'] ? "error" : null}
                            help={errors['cityBirth'] ? errors['cityBirth'] : null}
                            placeholder="شهر محل تولد"
                            type="text" />

                        <FieldGroup
                            id="ًregisterCityResidence"
                            label="شهر محل زندگی"
                            name="cityResidence"
                            validationState={errors['cityResidence'] ? "error" : null}
                            help={errors['cityResidence'] ? errors['cityResidence'] : null}
                            placeholder="شهر محل زندگی"
                            type="text" />

                        <FieldGroup
                            id="ًregisterAge"
                            label="سن"
                            name="age"
                            validationState={errors['age'] ? "error" : null}
                            help={errors['age'] ? errors['age'] : null}
                            placeholder="سن"
                            type="text" />

                        <FormGroup name="maritalStatus">
                            <ControlLabel>وضعیت تاهل</ControlLabel>
                            <fieldset>
                                <Radio value="SINGLE" inline>
                                    مجرد
                                </Radio>
                                {' '}
                                <Radio value="MARRIED" inline>
                                    متاهل
                                </Radio>
                                {' '}
                                <Radio value="DIVORCED" inline>
                                    جدا شده
                                </Radio>
                                {' '}
                            </fieldset>
                        </FormGroup>

                        <FieldGroup
                            id="ًregisterNumberOfChildren"
                            label="تعداد فرزندان"
                            name="numberOfChildren"
                            validationState={errors['numberOfChildren'] ? "error" : null}
                            help={errors['numberOfChildren'] ? errors['numberOfChildren'] : null}
                            placeholder="تعداد فرزندان"
                            type="text" />

                        <FieldGroup
                            id="ًregisterMotherTongue"
                            label="زبان مادری"
                            name="motherTongue"
                            validationState={errors['motherTongue'] ? "error" : null}
                            help={errors['motherTongue'] ? errors['motherTongue'] : null}
                            placeholder="زبان مادری"
                            type="text" />

                        {/* <FormGroup >
                            <fieldset>
                                <Checkbox value={true} name="mentalIllnessHistory" inline>
                                    <ControlLabel>
                                        سابقه مراجعه به روانشناس دارم
                                    </ControlLabel>
                                </Checkbox>
                            </fieldset>
                        </FormGroup>

                        <FormGroup >
                            <fieldset>
                                <Checkbox value={true} name="physicalIllnessHistory" inline>
                                    <ControlLabel>
                                        سابقه بیماری جسمی دارم
                                    </ControlLabel>
                                </Checkbox>
                            </fieldset>
                        </FormGroup>

                        <FormGroup >
                            <fieldset>
                                <Checkbox value={true} name="drugUseHistory" inline>
                                    <ControlLabel>
                                        سابقه مصرف دارو دارم
                                     </ControlLabel>
                                </Checkbox>
                            </fieldset>
                        </FormGroup> */}

                        <FormGroup >
                            <fieldset>
                                <Checkbox value={true} name="willingnessToParticipate" inline>
                                    <ControlLabel>
                                        مایلم از نتایج آزمون های من در تحقیقات استفاده شود
                                    </ControlLabel>
                                </Checkbox>
                            </fieldset>
                        </FormGroup>
                        <Captcha
                            reloadCaptchaHandler={reloadCaptchaHandler}
                            src={captcha}
                            id="ًregisterCaptcha"
                            name="captchaCode"
                            validationState={errors['captchaCode'] ? "error" : null}
                            help={errors['captchaCode'] ? errors['captchaCode'] : null} />
                        <ButtonToolbar>
                            <Button type="submit" bsStyle="success" disabled={submitting}>
                                <i className="fa fa-paper-plane" >&nbsp;</i>
                                {/* <i className="fa fa-check-square-o" >&nbsp;</i>                                 */}
                                ثبت نام
                        </Button>
                        </ButtonToolbar>
                    </Form>
                </Col>
            </div >
        );
    }
}

Register.PropTypes = {
    onSubmit: PropTypes.func.isRequired,
    reloadCaptchaHandler: PropTypes.func.isRequired,
    captcha: PropTypes.string,
    callbackError: PropTypes.string.isRequired,
    submitting: PropTypes.bool.isRequired,
};


export default Register;