import React from 'react';
import {Select} from 'antd';
import {autobind} from 'core-decorators';

const _ = { without: require('lodash/without') };

const Component = React.Component;
const Option = Select.Option;

export default class ColumnControl extends Component {
    static defaultProps = {
        hiddenColumns: [],
        onChange: function () {}
    };

    constructor(props) {
        super(props);

        this.state = {
            hiddenColumnsValue: ''
        };
    }

    @autobind
    showColumn(value) {
        const col = value;
        const hidden = _.without(this.props.hiddenColumns, col);

        this.setState({hiddenColumnsValue: ''});
        this.props.onChange(hidden);
    }

    render() {
        return (
            <div className="reactPivot-columnControl">
                { !this.props.hiddenColumns.length ? '' :
                <Select size="small" defaultValue="" onChange={this.showColumn}>
                    <Option value={''}>Columnas ocultas</Option>
                    { this.props.hiddenColumns.map((column) => {
                        return <Option key={column}>{column}</Option>;
                    })}
                </Select>
                }
            </div>
        );
    }
}
