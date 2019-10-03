import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SelectField extends Component {

    render() {
        let formGroupClass = this.props.formGroupClass ? this.props.formGroupClass : "form-group";
        if (this.props.isError == true) {
            formGroupClass = `${formGroupClass} has-error`;
        }
        return (
            <div className={formGroupClass}>
                <label>{this.props.label}</label>
                <div className="custom-dropdown">
                    <select
                        ref={this.props.refEl}
                        name={this.props.name}
                        defaultValue={this.props.defaultValue}
                        className={this.props.inputClass ? this.props.inputClass : "subscribers form-control"}
                        onChange={this.props.selectChange}
                        value={this.props.value}
                    >
                        {
                            this.props.isNullable == true && (<option value={null}>{this.props.nullText && this.props.nullText}</option>)
                        }
                        {
                            this.props.options && this.props.options.map((item,index)=><option key={index} value={item[this.props.valueField]}>{item[this.props.textField]}</option>)
                        }
                    </select>
                    <span className="help-block">{this.props.helpText}</span>
                    <span className="help-block has-error">{this.props.errorText}</span>
                </div>
            </div>
        )
    }
}

SelectField.propTypes = {
    formGroupClass: PropTypes.string,
    isError: PropTypes.bool,
    label: PropTypes.string,
    ref: PropTypes.object,
    name: PropTypes.string,
    defaultValue: PropTypes.string,
    inputClass: PropTypes.string,
    selectChange: PropTypes.func,
    value: PropTypes.string,
    valueField: PropTypes.string,
    textField: PropTypes.string,
    options: PropTypes.array
};

SelectField.defaultValue = {
    options: []
};

export default SelectField;