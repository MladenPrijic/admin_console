import React, { Component } from 'react';
import Select from "react-select";
export default class AdminConsoleSelect extends Component {
    render() {
        const {
            isValid
        } = this.props

        const customStyles = {
            control: (base, state) => ({
                ...base,
                // state.isFocused can display different borderColor if you need it
                borderColor: isValid || isValid === undefined ?
                    '#ddd' : 'red',
                // overwrittes hover style
                '&:hover': {
                    borderColor: isValid || isValid === undefined ?
                        '#ddd' : 'red'
                }
            })
        }
        return <Select styles={customStyles} {...this.props} />
    }
}