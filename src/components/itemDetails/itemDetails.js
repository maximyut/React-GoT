import React, {Component} from 'react';
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Spinner, Alert } from 'reactstrap';
import ErrorMessage from '../error';

const Field = ({item, field, label}) => {
    return (
        <ListGroupItem>
            <ListGroupItemHeading>{label}</ListGroupItemHeading>
            <ListGroupItemText>{item[field]}</ListGroupItemText>
        </ListGroupItem>
    )
}

export {
    Field
};

export default class ItemDetails extends Component {

    state = {
        item: null,
        error: false
    }

    componentDidMount() {
        this.updateItem();
    }

    componentDidUpdate(prevProps) {
        if (this.props.itemId !== prevProps.itemId) {
            this.updateItem();
        }
    }

    updateItem() {
        const {itemId, getData} = this.props;
        if (!itemId) {
            return;
        }

        getData(itemId)
            .then((item) => {
                this.setState({
                    item,
                    error: false
                });
            })
            .catch(() => {this.onError()});
    }

    onError(status){
        this.setState({
            itemId: null,
            error: true
        })
    }



    render() {
        if(!this.state.item) {
            return <Alert color="dark">Please, select</Alert>
        }

        const {item, error} = this.state
        const {name} = item;

        if(error){
            return <ErrorMessage/>
        }

        if(!item) {
            return <Spinner/>
        }


        return (
            <ListGroup>
                <ListGroupItem>
                    <h4>{name}</h4>
                </ListGroupItem>
                {
                    React.Children.map(this.props.children, (child) => {
                        return React.cloneElement(child, {item})
                    })
                }
            </ListGroup>
        )
    }
}