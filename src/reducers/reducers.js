import { combineReducers } from 'redux'
import notesArray from '../middleware/notes.js'

const showModal = (state = false, action) => {
    switch (action.type) {
        case 'TOGGLE_MODAL':
            return !state
        default:
            return state
    }
}

const showFilter = (state = false, action) => {
    switch (action.type) {
        case 'TOGGLE_FILTER':
            return !state
        default:
            return state
    }
}

const showAddNote = (state = false, action) => {
    switch (action.type) {
        case 'TOGGLE_ADD_NOTE':
            if(action.off === false) {
            return false
            }
            return !state
        default:
            return state
    }
}

const note = (state = {}, action) => {
    switch (action.type) {
        case 'ADD_NOTE':
            return {
              id: action.lastid + 1,
              content: action.text,
              title: action.title,
              style: action.style
            }
        case 'SAVE_EDIT':
            if (state.id !== action.id) {
                return state
                }
                return Object.assign({}, state, {
                  content: action.currentContent,
                  title: action.title,
                  style: action.style,
                  showEditor: false
            })
        case 'TOGGLE_EDITOR':
            if (state.id !== action.id) {
              return Object.assign({}, state, {
                  showEditor: false
              })
        }
              return Object.assign({}, state, {
                showEditor: !state.showEditor
            })
        case 'GET_INITIAL_COLOR':
            switch (state.color || action.color) {
                case '#E7E7E7':
                    return Object.assign({}, state, {style: 'default'})
                case '#DB524B':
                    return Object.assign({}, state, {style: 'danger'})
                case '#F2AE43':
                    return Object.assign({}, state, {style: 'warning'})
                case '#58B957':
                    return Object.assign({}, state, {style: 'success'})
                case '#3E8ACC':
                    return Object.assign({}, state, {style: 'primary'})
            default:
                return state
            }
    default:
        return state
  }
}

const notes = (state = notesArray, action) => {
    switch (action.type) {
        case 'ADD_NOTE':
            return [
                ...state,
                note(undefined, action)
            ]
        case 'SAVE_EDIT':
        case 'TOGGLE_EDITOR':
        case 'GET_INITIAL_COLOR':
            return state.map(n =>
                note(n, action)
            )
        case 'DELETE_NOTE':
            return [
                ...state.slice(0, action.arrayPosition),
                ...state.slice(action.arrayPosition + 1)
            ]
        default:
            return state
    }
}

const caseName = (state = 'Case', action) => {
    switch (action.type) {
        case 'CASE_NAME':
            let array = notesArray
            let name = array[0].case.caseName
            return name
        default:
            return state
    }
}


const searchTerm = (state = "", action) => {
    switch (action.type) {
        case 'CHANGE_SEARCH_TERM':
            return action.text
        default:
            return state
    }
}

const updatedColor = (state = "default", action) => {
    switch (action.type) {
        case ('UPDATE_COLOR'):
            switch (action.updateColor) {
                case 'default':
                    if (action.currentColor) {
                    return action.currentColor
                    }
                    return 'default'
                case 'danger':
                    return 'danger'
                case 'warning':
                    return 'warning'
                case 'success':
                    return 'success'
                case 'primary':
                    return 'primary'

                default:
                    return state
            }
        default:
            return state
    }
}

const updatedContent = (state = '', action) => {
    switch (action.type) {
        case 'UPDATE_CONTENT':
            if (action.currentContent === action.updatedContent) {
            return action.currentContent
            }
            return action.updatedContent
        default:
            return state
    }
}

const updatedTitle = (state = '', action) => {
    switch (action.type) {
        case 'UPDATE_TITLE':
            if (action.currentTitle === action.updatedTitle) {
                return action.currentTitle
            }
            return action.updatedTitle
        default:
            return state
    }
}

const notesApp = combineReducers ({
    caseName,
    showModal,
    showFilter,
    showAddNote,
    notes,
    searchTerm,
    updatedColor,
    updatedContent,
    updatedTitle
})


  export default notesApp