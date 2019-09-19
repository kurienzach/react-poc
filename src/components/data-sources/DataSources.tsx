import _ from 'lodash';
import React from 'react';
import styles from './DataSources.module.css';

import Card from '../../widgets/card/Card';
import Accordion from '../../widgets/accordion/Accordion';
import LoadingIndicator from '../../widgets/loading-indicator/LoadingIndicator';
import Input from '../../widgets/input/Input';

interface Item {
    id?: number;
    text: string;
    isOpen?: boolean;
    subItems: string[];
}

export interface Props {
    items: Item[];
    isLoading: boolean;
    getSources: () => void;
    onColumnDblClick: (column: string) => void;
}

interface State {
    filterVal: string;
    filteredItems: Item[];
}

class DataSources extends React.Component<Props, State> {
    private localItems: Item[];
    private isInitialize: boolean;

    constructor(props: Props) {
        super(props);
        this.localItems = [];
        this.isInitialize = false;
        this.state = {
            filterVal: '',
            filteredItems: [],
        };
    }

    componentDidMount() {
        this.props.getSources();
    }

    componentDidUpdate(prevProps: Props, prevState: State) {
        if (!this.isInitialize && this.props.items.length !== 0) {
            this.localItems = [...this.props.items].map(item => {
                return {
                    ...item,
                    isOpen: false,
                }
            });
            this.setState({
                filteredItems: this.localItems,
            });
            this.isInitialize = true;
        }
    }

    render() {
        return (
            <Card className={styles.dataSources}>
                <Input
                    className={styles.filter}
                    value={this.state.filterVal}
                    placeholder={'Search Columns'}
                    onChange={this.handleFilterChange}/>
                { this.props.isLoading ?
                    <LoadingIndicator/> : <Accordion
                        items={this.state.filteredItems}
                        onTitleClick={this.handleTitleClick}
                        onSubItemDblClick={this.props.onColumnDblClick}
                    /> }
            </Card>
        );
    }

    handleTitleClick = (selectedItem: any) => {
        const newItems: any = this.state.filteredItems.map(item => {
            let isOpen;
            if (item === selectedItem) {
                isOpen = !item.isOpen;
                return {
                    ...item,
                    isOpen,
                }
            } else {
                return item;
            }
        });
        this.localItems.forEach(item => {
            if (item === selectedItem) {
                item.isOpen = !item.isOpen;
            }
        });
        this.setState({
            filteredItems: newItems,
        })
    }

    handleFilterChange = (val: string) => {
        this.setState({
            filterVal: val,
        });
        this.filterItems(val);
    }

    filterItems = _.debounce((filterVal: string) => {
        if (filterVal === '') {
            this.setState({
                filteredItems: this.localItems,
            });
            return;
        }
        const newFilteredItems: any = this.localItems.map(item => {
                const columns = item.subItems.filter(subItem => subItem.toLowerCase().includes(filterVal));
                if (columns.length !== 0) {
                    const filteredItem: any = this.localItems.find(fItem => fItem.id === item.id);
                    return {
                        ...item,
                        isOpen: filteredItem.isOpen || false,
                        subItems: columns,
                    }
                }
                return null;
            }).filter(item => item !== null);
        this.setState({
            filteredItems: newFilteredItems,
        });
    }, 250);
}

export default DataSources;