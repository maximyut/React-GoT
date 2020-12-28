import React, {Component} from 'react';
import { ListGroup, ListGroupItem, Spinner } from 'reactstrap'; 
import './itemList.css';
import gotService from '../../services/gotService';
import ErrorMessage from '../error';


export default class ItemList extends Component {

    gotService = new gotService();

    state = {
        charList: null,
        error: false
    }
    componentDidMount() {
        this.gotService.getAllCharacters()
            .then((charList) => {
                this.setState({
                    charList,
                    error: false
                });
            })
            .catch(() => {this.onError()});
    }
    componentDidCatch(){
        this.setState({
            charList: null,
            error: true
        })
    }
    onError(status){
        this.setState({
            charList: null,
            error: true
        })
    }
    renderItems(arr) {
        return arr.map((item) => {
            const {id, name} = item;
            return (
                <ListGroupItem
                    key={id}
                    style={{ cursor: 'pointer' }}
                    onClick={() => this.props.onCharSelected(id)} 
                    action>
                    {name}
                </ListGroupItem>
            )
        })
    }


    render() {
        const {charList, error} = this.state;

        if(error){
            return <ErrorMessage/>
        }

        if(!charList) {
            return <Spinner/>
        }

        const items = this.renderItems(charList);

        return (
            <ListGroup>
                {items}
            </ListGroup>
        );
    }
}