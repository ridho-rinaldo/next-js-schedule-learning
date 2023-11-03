import { Select } from 'antd';

const Option = Select.Option;

const SelectComponent = ({
    placeholder,
    val,
    onChange,
    onFocus,
    onBlur,
    data = [],
    disabled
}) => (
    <Select
        showSearch
        placeholder={placeholder}
        value={val}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        disabled={disabled !== undefined ? disabled : false}
    >
        {
            data.map((item, index) => (
                <Option key={index} value={item.value}>{item.label}</Option>
            ))
        }
    </Select>
);

export default SelectComponent;
