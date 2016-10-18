export const getCaseName = () => {
    return {type: 'CASE_NAME'}
}
export const toggleModal = () => {
    return {type: 'TOGGLE_MODAL'}
}

export const toggleFilter = () => {
    return {type: 'TOGGLE_FILTER'}
}

export const toggleEditor = (id) => {
    return {type: 'TOGGLE_EDITOR',
            id
        }
}

export const onChangeSearchTerm = (text) => {
    return {type: 'CHANGE_SEARCH_TERM',
             text
    }
}

export const toggleAddNote = (off) => {
    return {type: 'TOGGLE_ADD_NOTE',
            off
    }
}

export const addNote = (text, lastid, title, style) => {
    return {
        type: 'ADD_NOTE',
        text,
        lastid,
        title,
        style
    }
}

export const saveEdit = (id, currentContent, title, style) => {
    return {
        type: 'SAVE_EDIT',
        id,
        currentContent,
        title,
        style
    }
}

export const getInitialColor = (color) => {
    return {type: 'GET_INITIAL_COLOR',
            color
    }
}

export const updateColor = (updateColor, currentColor) => {
    return {type: 'UPDATE_COLOR',
            updateColor,
            currentColor
    }
}

export const updateContent = (updatedContent, currentColor) => {
    return {type: 'UPDATE_CONTENT',
            updatedContent,
            currentColor
    }
}

export const updateTitle = (updatedTitle, currentTitle) => {
    return {type: 'UPDATE_TITLE',
            updatedTitle,
            currentTitle
    }
}

export const deleteNote = (id, arrayPosition) => {
    return {type: 'DELETE_NOTE',
            id,
            arrayPosition
    }
}
