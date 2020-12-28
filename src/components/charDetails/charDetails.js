import React, {Component} from 'react';
import './charDetails.css';
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Spinner } from 'reactstrap';
import gotService from '../../services/gotService';
import ErrorMessage from '../error';

export default class CharDetails extends Component {

    gotService =new gotService();

    state = {
        char: null,
        loading: true,
        error: false
    }

    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate(prevProps) {
        if (this.props.charId !== prevProps.charId) {
            this.updateChar();
        }
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

    updateChar() {
        const {charId} = this.props;
        if (!charId) {
            return;
        }

        this.gotService.getCharacter(charId)
            .then((char) => {
                this.setState({char})
            })
            .catch(this.onError);
    }

    render() {

        if(!this.state.char) {
            return <span>Select character</span>
        }

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