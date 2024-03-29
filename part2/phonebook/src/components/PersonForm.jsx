import React from 'react'

const PersonForm = (props) => {
  return (
    <div>
        <form onSubmit={props.addPerson}>
            <div>
            name: <input value={props.newName} onChange={props.handleChangeName}/> 
            </div>
            <div>
            number: <input  value={props.newNum} onChange={props.handleChangeNum} placeholder="XX-XXXXXXX"/>          
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    </div>
  )
}

export default PersonForm
