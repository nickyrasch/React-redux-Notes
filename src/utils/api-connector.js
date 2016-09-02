/* Created by alexdemars94 on 9/1/16. */

import { connect } from 'react-refetch'

export const refetch = connect.defaults({
  headers: {
    'Authorization' : `Basic ${btoa('admin:@pass$')}`
  }
})
