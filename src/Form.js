import React, { Component } from 'react'

class Form extends Component {
    initialState = {
        vlan_id: '',
        vni: '',
        vlan_name: '',
        svi_ip: '',
        svi_descr: '',
        vrf: '',
        mgroup: '',
    }    

    state = this.initialState

    handleChange = (event) => {
        const { name, value } = event.target

        this.setState({
            [name]: value,
        })
    }

    submitForm = () => {        
        this.props.handleSubmit(this.state);
        this.setState(this.initialState)
    }

    render() {
        const { vlan_id, vni, vlan_name, svi_ip, svi_descr, vrf, mgroup } = this.state;

        return (
            <form>
                <label htmlFor="vlan_id">vlan_id</label>
                <input
                    type="text"
                    name="vlan_id"
                    id="vlan_id"
                    value={vlan_id}
                    onChange={this.handleChange} />
                <label htmlFor="vni">vni</label>
                <input
                    type="text"
                    name="vni"
                    id="vni"
                    value={vni}
                    onChange={this.handleChange} />
                <label htmlFor="vlan_name">vlan_name</label>
                <input
                    type="text"
                    name="vlan_name"
                    id="vlan_name"
                    value={vlan_name}
                    onChange={this.handleChange} />
                <label htmlFor="svi_ip">svi_ip</label>
                <input
                    type="text"
                    name="svi_ip"
                    id="svi_ip"
                    value={svi_ip}
                    onChange={this.handleChange} />
                <label htmlFor="svi_descr">svi_descr</label>
                <input
                    type="text"
                    name="svi_descr"
                    id="svi_descr"
                    value={svi_descr}
                    onChange={this.handleChange} />
                <label htmlFor="vrf">vrf</label>
                <input
                    type="text"
                    name="vrf"
                    id="vrf"
                    value={vrf}
                    onChange={this.handleChange} />
                <label htmlFor="mgroup">mgroup</label>
                <input
                    type="text"
                    name="mgroup"
                    id="mgroup"
                    value={mgroup}
                    onChange={this.handleChange} />
                <input type="button" value="Submit" onClick={this.submitForm} />                
            </form>
        );
    }
}

export default Form;
