import React, {Component} from 'react';
import {Col, Row, Container, Button} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import {CharacterPage, BookPage, HousePage, BooksItem} from '../pages';
import ErrorMessage from '../error';
import gotService from '../../services/gotService';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import './app.css';
export default class App extends Component  {

    gotService =new gotService();

    state = {
        showRandomChar: true,
        error: false
    }

    toggleRandomChar = () => {
        this.setState((state) => {
            return {
                showRandomChar: !state.showRandomChar
            }
        });
    }
    
    render () {
        if (this.state.error) {
            return <ErrorMessage/>
        }

        const char = this.state.showRandomChar ? <RandomChar/> : null;

        return (
            <Router>
                <div className="app"> 
                    <Container>
                        <Header />
                    </Container>
                    <Container>
                        <Row>
                            <Col lg={{size: 5, offset: 0}}>
                                {char}
                                <Col sm="12" md={{ size: 6, offset: 3 }}>
                                    <Button 
                                    style={{ marginTop: 10, marginBottom: 10}}
                                    onClick={this.toggleRandomChar}
                                    color="primary">Toggle RandomChar</Button>
                                </Col>
                            </Col>
                        </Row>
                        <Route path='/' exact component={() => <h1>Welcome to GOT DB</h1>}/>
                        <Route path='/characters' component={CharacterPage}/>
                        <Route path='/houses' component={HousePage}/>
                        <Route path='/books' exact component={BookPage}/>
                        <Route path='/books/:id' render={
                            ({match}) => {
                                    const {id} = match.params
                            return <BooksItem bookId={id}/>}
                        }/>
                    </Container>
                </div>
            </Router>
        );
    }
};

