import React, {Component} from 'react';
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Spinner } from 'reactstrap';
import gotService from '../../services/gotService';
import ErrorMessage from '../error';

export default class RandomChar extends Component {

    gotService = new gotService();
    state = {
        char: {},
        loading: true,
        error: false
    }

    componentDidMount() {
        this.updateChar();
        this.timerId = setInterval(this.updateChar, 1500);
    }

    componentWillMount() {
        clearInterval(this.timerId);
    }

    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false
        })
    }

    onError = (err) => {
        this.setState({
            error: true,
            loading: false
        })
    }

    updateChar = () => {
        const id = Math.floor(Math.random()*140 + 25);
        this.gotService.getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError);
    }
    
    render() {

        const {char, loading, error} = this.state;

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner style={{ width: '10rem', height: '10rem' }} color="dark" />: null;
        const content = !(loading || error) ? <View char ={char}/> : null;

        return (
            <div className="random-block rounded">
                {errorMessage}
                {spinner}
                {content}
            </div>
        );
    }
}

const View = ({char}) => {
    const {name, gender, born, died, culture} = char;
    return (
        <>
            <ListGroup>
                <ListGroupItem>
                    <h4>{name}</h4> 
                </ListGroupItem>
                <ListGroupItem>
                    <ListGroupItemHeading>Gender</ListGroupItemHeading>
                    <ListGroupItemText>{gender}</ListGroupItemText>
                </ListGroupItem>
                <ListGroupItem>
                    <ListGroupItemHeading>Born</ListGroupItemHeading>
                    <ListGroupItemText>{born}</ListGroupItemText>
                </ListGroupItem>
                <ListGroupItem>
                    <ListGroupItemHeading>Died</ListGroupItemHeading>
                    <ListGroupItemText>{died}</ListGroupItemText>
                </ListGroupItem>
                <ListGroupItem>
                    <ListGroupItemHeading>Culture</ListGroupItemHeading>
                    <ListGroupItemText>{culture}</ListGroupItemText>
                </ListGroupItem>
          </ListGroup>
        </>
    )
}