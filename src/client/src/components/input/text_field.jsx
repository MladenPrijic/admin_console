import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TextField extends Component {

    render() {
        let formGroupClass = this.props.formGroupClass ? this.props.formGroupClass : "form-group";
        if(this.props.isError === true){
            formGroupClass = `${formGroupClass} has-error`;
        }
        return (
            <div className={formGroupClass}>
                <label>{this.props.label}</label>
                <input
                    type={this.props.textFieldType ? this.props.textFieldType : 'text' }
                    ref={this.props.refEl}
                    name={this.props.name} defaultValue={this.props.defaultValue}
                    className={this.props.inputClass ? this.props.inputClass : "form-control"}
                    onChange={this.props.inputChange}
                    value={this.props.value}
                    placeholder={this.props.placeholder}
                />
                <span className="help-block">{this.props.helpText}</span>
                <span className="help-block has-error">{this.props.errorText}</span>
            </div>
        )
    }
}

TextField.propTypes = {
    formGroupClass : PropTypes.string,
    isError: PropTypes.bool,
    label: PropTypes.string,
    ref: PropTypes.object,
    name: PropTypes.string,
    defaultValue: PropTypes.string,
    inputClass: PropTypes.string,
    inputChange: PropTypes.func,
    value: PropTypes.string,
    textFieldType: PropTypes.string
};

export default TextField;