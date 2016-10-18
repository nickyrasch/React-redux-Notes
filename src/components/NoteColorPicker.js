import React from 'react'
import { Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { updateColor } from '../actions/actions'

const NoteColorPicker = ({ updateColor }) => {
  return(
    <div style={{ marginTop: '5px', display: 'inline'}}>
      <Button onClick={ () => updateColor('default') }
              style={{ backgroundColor: '#E7E7E7', width: '28px', height: '28px' }}
      />
      <Button onClick={ () => updateColor('danger') }
              style={{ backgroundColor: '#DB524B', width: '28px', height: '28px', marginLeft: '4px' }}
      />
      <Button onClick={ () => updateColor('warning') }
              style={{ backgroundColor: '#F2AE43', width: '28px', height: '28px', marginLeft: '4px' }}
      />
      <Button onClick={ () => updateColor('success') }
              style={{ backgroundColor: '#58B957', width: '28px', height: '28px', marginLeft: '4px' }}
      />
      <Button onClick={ () => updateColor('primary') }
              style={{ backgroundColor: '#3E8ACC', width: '28px', height: '28px', marginLeft: '4px' }}
      />
    </div>
  )
}

const mapStateToProps = (state) => {
    return state
}
const mapDispatchToProps = (dispatch) => {
    return {
        updateColor: (updatedColor) => {
            dispatch(updateColor(updatedColor))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(NoteColorPicker)