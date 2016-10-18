// *******************************************************************************************************************
// ==================================================== API CALLS ====================================================
// *******************************************************************************************************************

caseId={ 744095 } // previously called on NotesLibrary

headers        : {'Content-Type': 'application/json', 'Authorization': `Basic ${btoa('joe:pass')}`},


onSearch = () => {
    const url = this.state.searchTerm ?
        `http://localhost:8080/sustain/ws/rest/ecourt/search/CaseNote/title/~%25${ this.state.searchTerm }%25?includeClobs=true&depth=1&maxResults=10`
        : `http://localhost:8080/sustain/ws/rest/ecourt/search/CaseNote/?includeClobs=true&depth=1&maxResults=10`
    // const url = this.state.searchTerm ?
    //   `https://jtidev-config.ecourt.com/sustain/ws/rest/ecourt/search/CaseNote/title/~%25${ this.state.searchTerm }%25?includeClobs=true&depth=1&maxResults=10`
    //   : `https://jtidev-config.ecourt.com/sustain/ws/rest/ecourt/search/CaseNote/?includeClobs=true&depth=1&maxResults=10`
    fetch(url, {
        method : 'GET',
        headers: this.state.headers
    })
        .then((res) => res.json())
        .then((caseComponentData) => {
            this.setState({ caseComponents: caseComponentData })
        })
        .catch((err) => {
            console.log(err)
        })
}

getCaseComponents = (id, index, callback) => {
    if (id) {
        let url = `http://localhost:8080/sustain/ws/rest/ecourt/search/CaseNote/id/${ id }?depth=1&includeClobs=true`
        // dispatch({type: NOTES_XXX_REUEST})
        fetch(url, {
            method: 'GET',
            headers : this.state.headers
        })
            .then((res) => res.json())
            .then((caseComponentData) => {
                // dispatch({type: NOTES_XXX_SUCCESS, result: res})
                let caseComponent = caseComponentData[0]
                let updatedCaseComponents = [...this.state.caseComponents]
                updatedCaseComponents.splice(index, 1, caseComponent)
                this.setState({caseComponents: updatedCaseComponents}, () => callback()) // callback sets note's loading state
            })
    }
    else {
        let url = `http://localhost:8080/sustain/ws/rest/ecourt/search/CaseNote/case.id/${ this.props.caseId }?depth=1&includeClobs=true`
        fetch(url, {
            method : 'GET',
            headers: this.state.headers
        })
            .then((res) => res.json())
            .then((caseComponentData) => {
                this.updateCaseComponentArray(caseComponentData, (caseComponentData) => {
                    this.setState({caseComponents: caseComponentData})
                })
            })
    }
}

updateCaseComponentArray = (array, callback) => {array.forEach((item, i) => {
    // Setting showEditor in the caseComponent object makes showing the editor for each note easy
    item.showEditor = false
    if (i === array.length - 1) {
        callback(array)
    }
})
}

onSaveNote = (id, index, callback) => {
    let componentToSave = {}
    this.state.caseComponents.forEach((component) => {
        if (component.id === id) {
            componentToSave = component
        }
    })
    let url = `http://localhost:8080/sustain/ws/rest/ecourt/entities/CaseNote/${ id }`
    fetch(url, {
        method : "PUT",
        headers: this.state.headers,
        body: JSON.stringify({
            content : componentToSave.content,
            color   : componentToSave.color,
            title   : componentToSave.title
        })
    })
        .then((res) => res.json()) // Convert response data to  json
        .then(() => {
            this.getCaseComponents(componentToSave.id, index, callback)
        })
}