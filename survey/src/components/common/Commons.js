import React from 'react';
import {
    FormGroup,
    FormControl,
    ControlLabel,
    HelpBlock,
    Image,
    Button
} from 'react-bootstrap';

export const FieldGroup = ({ id, label, help, validationState = null, ...props }) => {
    return (
        <FormGroup controlId={id} validationState={validationState}>
            <ControlLabel>{label}</ControlLabel>
            <FormControl {...props} />
            <FormControl.Feedback />
            {help && <HelpBlock>{help}</HelpBlock>}
        </FormGroup>
    );
}

export const StaticFieldGroup = ({ id, label,colonSign, ...props }) => {
    return (
        <FormGroup controlId={id} >
            <ControlLabel>{label}{colonSign}</ControlLabel>&nbsp;
            <FormControl.Static {...props} />
        </FormGroup>
    );
}

export const Captcha = ({ reloadCaptchaHandler, src, id, help, validationState = null, ...props }) => {
    return (
        <div>
            <Image src={src} />‌ &nbsp; 
            <Button bsSize="xsmall" onClick={()=>reloadCaptchaHandler()}>
                <i className="fa fa-refresh text-red"></i>
            </Button>
            <FormGroup controlId={id} validationState={validationState}>
                <ControlLabel>کد امنیتی</ControlLabel>
                <FormControl type="text" placeholder="کد امنیتی"{...props} />
                <FormControl.Feedback />
                {help && <HelpBlock>{help}</HelpBlock>}
            </FormGroup>
        </div>
    );
}
// export const ActionBar = ({actions})=> {
//     return (        
//             <ButtonToolbar>
//                 {actions.map(action =>
//                     <LinkContainer key={action.rel} to={action.href}>
//                         <Button key={action.rel} onClick={action.onClick} >
//                             {action.rel}
//                         </Button>
//                     </LinkContainer>
//                 )}
//             </ButtonToolbar>        
//     );
// }