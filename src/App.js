import React, {Component} from 'react';
import {Container, Grid, Menu, Input} from 'semantic-ui-react';
import MusicLinkTile from './MusicLinkTile';
import './App.css';

class App extends Component {

    state = {
        items: [],
        activeItem: 'all'
    };

    handleItemClick = (e, { name }) => this.setState({ activeItem: name });

    componentDidMount() {
        fetch('http://api.sifter.dev/')
            .then(res => res.json())
            .then(({items}) => {
                this.setState({items});
            });
    }


    render() {
        const { items, activeItem } = this.state;
        const cards = items.map((item, i) => (

                <MusicLinkTile key={item.title + i} item={item}/>

        ) );
        return (
            <Container>
                <Menu pointing>
                    <Menu.Item name='All' active={activeItem === 'all'} onClick={this.handleItemClick}/>
                    <Menu.Item name='Deep' active={activeItem === 'deep'} onClick={this.handleItemClick}/>
                    <Menu.Item name='Disco' active={activeItem === 'disco'} onClick={this.handleItemClick}/>
                    <Menu.Menu position='right'>
                        <Menu.Item>
                            <Input icon='search' placeholder='Search...'/>
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>
                <Grid relaxed>
                    { cards }
                </Grid>
            </Container>
        );
    }
}

export default App;
