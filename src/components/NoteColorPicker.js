/* Created by alexdemars94 on 9/6/16. */
import React from 'react'
import { Button } from 'react-bootstrap'

export const NoteColorPicker = (props) => {
  return(
    <div style={{ marginTop: '5px' }}>
      <Button onClick={ () => props.getNoteColor('#E7E7E7') }
              style={{ backgroundColor: '#E7E7E7', width: '28px', height: '28px' }}
      />
      <Button onClick={ () => props.getNoteColor('#DB524B') }
              style={{ backgroundColor: '#DB524B', width: '28px', height: '28px', marginLeft: '4px' }}
      />
      <Button onClick={ () => props.getNoteColor('#F2AE43') }
              style={{ backgroundColor: '#F2AE43', width: '28px', height: '28px', marginLeft: '4px' }}
      />
      <Button onClick={ () => props.getNoteColor('#58B957') }
              style={{ backgroundColor: '#58B957', width: '28px', height: '28px', marginLeft: '4px' }}
      />
      <Button onClick={ () => props.getNoteColor('#3E8ACC') }
              style={{ backgroundColor: '#3E8ACC', width: '28px', height: '28px', marginLeft: '4px' }}
      />
    </div>
  )
}