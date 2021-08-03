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
        errors: { 
            vlan_id: '',
            vni: ''},
    }    

    state = this.props.evpn ? this.props.evpn : this.initialState;
    index = this.props.index;
    formValid = true;

    handleChange = (event) => {
        const { name, value } = event.target

        this.setState({
            [name]: value,
        })
    }

    handleBlur = (event) => {
        const { name, value } = event.target

        this.setState({[name]: value,}, 
            () => this.validateField(name, value))
    }

    submitForm = () => {        
        this.props.handleSubmit(this.state, this.index);
        this.setState(this.initialState)        
    }

    validateField(name, value){        
        const errors = {};                

        switch(name) {
            case 'vlan_id':                
                if(!(!isNaN(value) && value >1 && value < 4096)) {
                    errors[name] = 'should be a number from 1 to 4096';                    
                }
                break;

            case 'vni':
                if(!(!isNaN(value) && value > 10000 && value < 10999)) {
                    errors[name] = 'should be a number from 10000 to 10999';                    
                }
                break;
            default:
                break;
        }
        
        this.setState({errors: errors});        
    }

    render() {
        const { vlan_id, vni, vlan_name, svi_ip, svi_descr, vrf, mgroup } = this.state;

        return (            
            <form>                
                <label htmlFor="vlan_id">vlan_id</label>
                <input
                    type="number"
                    name="vlan_id"
                    id="vlan_id"
                    value={vlan_id}
                    placeholder="10"
                    onChange={this.handleChange}
                    onBlur = {this.handleBlur} />
                    <span style={{color: "red"}}>{this.state.errors["vlan_id"]}</span>
                <label htmlFor="vni">vni</label>
                <input
                    type="number"
                    name="vni"
                    id="vni"
                    value={vni}
                    placeholder="10010"
                    onChange={this.handleChange}
                    onBlur = {this.handleBlur} />
                    <span style={{color: "red"}}>{this.state.errors["vni"]}</span>
                <label htmlFor="vlan_name">vlan_name</label>
                <input
                    type="text"
                    name="vlan_name"
                    id="vlan_name"
                    value={vlan_name}
                    placeholder="vlan10"
                    onChange={this.handleChange}
                    onBlur = {this.handleBlur} />
                <label htmlFor="svi_ip">svi_ip</label>
                <input
                    type="text"
                    name="svi_ip"
                    id="svi_ip"
                    value={svi_ip}
                    placeholder="10.1.10.254/24"
                    onChange={this.handleChange}
                    onBlur = {this.handleBlur} />
                <label htmlFor="svi_descr">svi_descr</label>
                <input
                    type="text"
                    name="svi_descr"
                    id="svi_descr"
                    value={svi_descr}
                    placeholder="test10 subnet"
                    onChange={this.handleChange}
                    onBlur = {this.handleBlur} />
                <label htmlFor="vrf">vrf</label>
                <input
                    type="text"
                    name="vrf"
                    id="vrf"
                    value={vrf}
                    placeholder="Tenant-1"
                    onChange={this.handleChange}
                    onBlur = {this.handleBlur} />
                <label htmlFor="mgroup">mgroup</label>
                <input
                    type="text"
                    name="mgroup"
                    id="mgroup"
                    value={mgroup}
                    placeholder="231.0.0.10"
                    onChange={this.handleChange}
                    onBlur = {this.handleBlur} />
                <input type="button" value="Submit" onClick={this.submitForm} disabled={!this.formValid} />                
            </form>            
        );
    }
}

export default Form;