import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input} from "../../common/FormControls/FormControls";
import {required} from "../../utils/validators/validator";
import s from "../../common/FormControls/FormControl.module.css";
import React from "react";
import {DataForm} from "./Login";

type LoginFormProps = {
    captchaUrl: string | null
}

export const LoginForm = ({
                              handleSubmit,
                              error,
                              captchaUrl
                          }: InjectedFormProps<DataForm, LoginFormProps> & LoginFormProps) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field placeholder={'Login'}
                       component={Input}
                       name={'email'}
                       validate={[required]}/>
            </div>
            <div>
                <Field placeholder={'Password'}
                       component={Input}
                       name={'password'}
                       validate={[required]}/>
            </div>
            <div>
                <Field name={'rememberMe'}
                       type={'checkbox'}
                       component={Input}
                /> Remember me
            </div>

            {captchaUrl && <img src={captchaUrl} alt={'captcha'}/>}
            {captchaUrl && <Field placeholder={'Antibot symbols'}
                                  component={Input}
                                  name={'captcha'}
                                  validate={[required]}/>}

            {error && <span className={s.formSummaryError}>{error}</span>}
            <div>
                <button>Sign up</button>
            </div>
        </form>
    )
}

export const LoginReduxForm = reduxForm<DataForm, LoginFormProps>({form: 'login'})(LoginForm)