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
        errors: [],            
    }    

    index = this.props.index;
    state = this.index ? this.props.evpn[this.index] : this.initialState;
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
        const IpAddrPattern = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\/(3[0-2]|[1-2][0-9]|[0-9])$)/;
        const mcastIpAddrPattern = /^(22[4-9]|23[0-9])\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

        switch(name) {
            case 'vlan_id':                
                if(!(!isNaN(value) && value >1 && value < 4096)) {
                    errors[name] = 'should be a number from 1 to 4096';                    
                }
                else if (this.index && this.props.evpn.find(x => value===x.vlan_id)){
                    errors[name] = 'vlan_id ' + value + ' already exist'; 
                }
                break;

            case 'vni':
                if(!(!isNaN(value) && value > 10000 && value < 10999)) {
                    errors[name] = 'should be a number from 10000 to 10999';                    
                }
                else if (this.index && this.props.evpn.find(x => value===x.vni)){
                    errors[name] = 'vni ' + value + ' already exist'; 
                }
                break;
            case 'vlan_name':
                break;
            case 'svi_ip':
                if (value && !IpAddrPattern.test(value)) {
                    errors[name] = 'must be a valid IP address with mask in CIDR notation e.g. 10.1.2.3/31'
                }
                break;
            case 'svi_descr':
                break;
            case 'vrf':
                break;
            case 'mgroup':
                if (value && !mcastIpAddrPattern.test(value)) {
                    errors[name] = 'must be a valid mcast IP address (range 224.0.0.0 - 239.255.255.255)'
                }
                break;
            default:
                break;
        }
        
        if (Object.keys(errors).length) {
            this.setState({ errors: [...this.state.errors, errors] });
        } else {
            this.setState({ errors: this.state.errors.filter((el)=> {
                return name !== Object.keys(el)[0];
            })})
        }

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
                    <span style={{color: "red"}}>{this.state.errors["svi_ip"]}</span>
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
                    <span style={{color: "red"}}>{this.state.errors["mgroup"]}</span>
                <input type="button" value="Submit" onClick={this.submitForm} disabled={this.state.errors} />                
            </form>            
        );
    }
}

export default Form;