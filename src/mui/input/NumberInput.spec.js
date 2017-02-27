import React from 'react';
import assert from 'assert';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import NumberInput from './NumberInput';

describe('<NumberInput />', () => {
    const defaultProps = {
        source: 'foo',
        meta: {},
        input: {
            onBlur: sinon.spy(),
            onChange: sinon.spy(),
        },
    };

    it('should use a mui TextField', () => {
        const props = { ...defaultProps };
        props.input.value = 'hello';

        const wrapper = shallow(<NumberInput {...props} />);

        const TextFieldElement = wrapper.find('TextField');
        assert.equal(TextFieldElement.length, 1);
        assert.equal(TextFieldElement.prop('value'), 'hello');
        assert.equal(TextFieldElement.prop('type'), 'number');
    });

    it('should call props `input.onChange` method when changed', () => {
        const onChange = sinon.spy();
        const wrapper = shallow(<NumberInput {...defaultProps} input={{ value: 2, onChange }} />);
        wrapper.find('TextField').simulate('change', null, 3);
        assert.deepEqual(onChange.args, [[null, '3']]);
    });

    it('should return a numeric value', () => {
        const props = { ...defaultProps };
        props.input.value = 2;

        const wrapper = shallow(<NumberInput {...props} />);
        const TextFieldElement = wrapper.find('TextField').first();
        TextFieldElement.simulate('blur');
        assert.deepEqual(props.input.onChange.args, [[2]]);
    });

    it('should call redux-form blur handler when blurred', () => {
        const props = { ...defaultProps };
        props.input.onBlur = sinon.spy();

        const wrapper = shallow(<NumberInput {...defaultProps} />);

        wrapper.find('TextField').simulate('blur');
        assert.deepEqual(props.input.onBlur.args.length, 1);
    });
});
