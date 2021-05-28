import React, { Component } from 'react'
import Table from './Table'
import Form from './Form'

class App extends Component {
    state = {
        evpnData: [],
    }

    evpnRemove = index => {
        const { evpnData } = this.state;

        this.setState({
            evpnData: evpnData.filter((char, i) => {
                return i !== index;
            })
        });
    }

    handleSubmit = evpn => {
        this.setState({evpnData: [...this.state.evpnData, evpn]});
    }

    render() {
        const { evpnData } = this.state

        return (
            <div className="container">
                <Table evpnData={evpnData} evpnRemove={this.evpnRemove} />
                <Form handleSubmit={this.handleSubmit}/>
            </div>
        )
    }
}

export default App