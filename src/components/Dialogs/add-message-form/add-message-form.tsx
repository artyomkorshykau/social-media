import {maxLengthCreator, required} from "../../../utils/validators/login-form-validator";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {TextArea1} from "../../../common/form-control/form-control";
import React from "react";
import {MessageBody} from "../../../pages/dialogs/dialogs";

const maxLength = maxLengthCreator(100)

const AddMessageForm = (props: InjectedFormProps<MessageBody>) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={TextArea1}
                       name={'newMessageBody'}
                       placeholder={'Enter your message'}
                       validate={[required, maxLength]}
                />
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
}

export const AddMessageReduxForm = reduxForm<MessageBody>({form: 'dialogsAddMessageForm'})(AddMessageForm)