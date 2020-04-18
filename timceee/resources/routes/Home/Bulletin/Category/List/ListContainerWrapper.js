import React from 'react';
import ListContainer from './ListContainer';
import PropTypes from 'prop-types';
import {index, destroy} from './../Module';
import {connect} from 'react-redux';
import MaterialIcon from 'components/common/MaterialIcon';
import {Modal} from 'antd';

@connect((state) => ({
    categories: state.Bulletin.Category.categories,
    meta: state.Bulletin.Category.meta,
}), {
    index,
    destroy,
})
@autobind
/**
 *
 */
export default class ListContainerWrapper extends React.PureComponent {
    static propTypes = {
        categories: PropTypes.arrayOf(PropTypes.object),
        meta: PropTypes.object,
        activeItem: PropTypes.number,
        index: PropTypes.func,
        destroy: PropTypes.func,
        onClick: PropTypes.func,
        onCancel: PropTypes.func,
        onAdd: PropTypes.func,
        onEdit: PropTypes.func,
    };

    /**
     *
     * @param {Object} props
     */
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
        };
    }

    /**
     *
     */
    componentDidMount() {
        this._onReload();
    }

    /**
     * @param {Number} page
     * @param {Number} limit
     * @private
     */
    _onReload(page = 0, limit = app.config.pagination.limit) {
        const {index} = this.props;
        this.setState({loading: true},
            () => {
                index({page, limit}, (err) => this.setState({loading: false}));
            });
    }

    /**
     *
     * @param {String} value
     * @private
     */
    _onSearch(value) {
        const {index, meta} = this.props;

        this.setState({loading: true}, () => index({
            filterGroups: [
                {
                    or: true,
                    filters: [
                        {
                            key: 'title',
                            value,
                            operator: 'ct',
                        },
                    ],
                },
            ],
            limit: meta && meta.limit,
        }, (err) => this.setState({loading: false})));
    }

    /**
     *
     * @param {Object} item - item to delete
     * @private
     */
    _onDelete(item) {
        const {destroy, onCancel} = this.props;

        Modal.confirm({
            title: app.translate('routes.home.bulletin.Removing Category'),
            content: app.translate('routes.home.bulletin.Are you sure about removing', {title: item.title}),
            onOk: () => destroy(item.id, {}, () => onCancel()),
        });
    }

    /**
     *
     * @return {Object}
     * @private
     */
    _renderPagination() {
        const {meta} = this.props;

        return {
            total: meta && meta.total,
            pageSize: meta && meta.limit,
            showTotal: (total, range) => app.translate('main.showingFromToOf', {
                start: range[0],
                end: range[1],
                total,
            }),
            onChange: (page, limit) => this._onReload(page - 1, limit),
            onShowSizeChange: (page, limit) => this._onReload(page - 1, limit),
        };
    }

    /**
     *
     * @return {XML}
     */
    render() {
        const {loading} = this.state;
        const {categories, meta, ...rest} = this.props;

        let _props = app._.omit(rest, ['items', 'loading', 'pagination', 'icon', 'onSearch', 'onReload', 'onDelete']);

        return (
            <ListContainer
                items={categories}
                loading={loading}
                pagination={this._renderPagination()}
                onSearch={this._onSearch}
                onReload={() => this._onReload(meta.currentPage, meta.limit)}
                onDelete={this._onDelete}
                {..._props}
            />
        );
    }
}
