import React from 'react'

const TableHeader = () => {
    return (
        <thead>
            <tr>
                <th>vlan id</th>
                <th>vni</th>
                <th>vlan name</th>
                <th>svi ip</th>
                <th>svi descr</th>
                <th>vrf</th>
                <th>mgroup</th>
            </tr>
        </thead>
    )
}

const TableBody = (props) => {
    const rows = props.evpnData.map((row, index) => {
        return (
            <tr key={index}>
                <td>{row.vlan_id}</td>
                <td>{row.vni}</td>
                <td>{row.vlan_name}</td>
                <td>{row.svi_ip}</td>
                <td>{row.svi_descr}</td>
                <td>{row.vrf}</td>
                <td>{row.mgroup}</td>
                <td>
                    <button onClick={() => props.evpnRemove(index)}>Delete</button>
                </td>
            </tr>

        )
    })

    return <tbody>{rows}</tbody>
}

const Table = (props) => {
    //const { evpnData, evpnRemove } = props

    return (
        <table>
            <TableHeader />
            <TableBody evpnData={props.evpnData} evpnRemove={props.evpnRemove} />
        </table>
    )
}

export default Table