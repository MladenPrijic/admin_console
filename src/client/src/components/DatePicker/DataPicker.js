import React, { Component } from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { formatDate, parseDate } from 'react-day-picker/moment';
import 'react-day-picker/lib/style.css';

class DataPicker extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      value:
        this.props.value !== ''
          ? formatDate(this.props.value, this.props.format)
          : '',
      cleareDate: false,
    };
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.clearText) {
      return { value: '', clearText: false };
    }
    if (nextProps.value !== prevState.value) {
      return { value: nextProps.value };
    } else return null;
  }

  handleOnCleare = e => {
    e.preventDefault();
    this.setState({ clearText: true }, () => this.props.onDayChange());
  };

  render() {
    const {
      valid,
      onDayChange,
      placeholder,
      format,
      name,
      clearText,
    } = this.props;
    return (
      <div className="d-inline">
        <DayPickerInput
          formatDate={formatDate}
          parseDate={parseDate}
          format={format}
          placeholder={placeholder}
          value={this.state.value}
          inputProps={{
            className: valid ? 'form-control is-invalid' : 'form-control',
          }}
          name={name}
          onDayChange={onDayChange}
        />
        <button onClick={this.handleOnCleare} className="close">
          {clearText === undefined ? <span aria-hidden="true">&times;</span> : <span aria-hidden="true">{clearText}</span>}
        </button>
      </div>
    );
  }
}

export default DataPicker;
