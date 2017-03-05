import React, {Component} from 'react';
import {
    Container,
    Grid,
    Menu,
    Input,
    Segment,
    Dimmer,
    Loader
} from 'semantic-ui-react';
import MusicLinkTile from './MusicLinkTile';
import './App.css';

class App extends Component {

    state = {
        items: [],
        activeItem: 'All'
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
        const cards = items
            .filter((item) => {
                if(activeItem === 'Disco'){
                    return item.subreddit === 'r/NuDisco';
                }
                if(activeItem === 'Deep'){
                    return ['r/deephouse', 'r/shallowhouse'].includes(item.subreddit)
                }
                return true;
            })
            .map((item, i) => (

                <MusicLinkTile key={item.title + i} item={item}/>

        ) );
        return (
            <Container>
                <Menu pointing>
                    <Menu.Item name='All' active={activeItem === 'All'} onClick={this.handleItemClick}/>
                    <Menu.Item name='Deep' active={activeItem === 'Deep'} onClick={this.handleItemClick}/>
                    <Menu.Item name='Disco' active={activeItem === 'Disco'} onClick={this.handleItemClick}/>
                    <Menu.Menu position='right'>
                        <Menu.Item>
                            <Input icon='search' placeholder='Search...'/>
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>
                <Grid relaxed>
                    { cards }
                    {   items.length === 0 && (
                            <Container>
                                <Segment>
                                    <div style={{minHeight: '100vh'}}></div>
                                  <Dimmer active>
                                    <Loader size='massive'>Loading</Loader>
                                  </Dimmer>
                                </Segment>
                            </Container>
                        )
                    }
                </Grid>
            </Container>
        );
    }
}

export default App;
