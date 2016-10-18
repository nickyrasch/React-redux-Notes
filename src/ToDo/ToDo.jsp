Tags Working
CSS for filters
Add Clear Filters Button
Pagination for multiple notes working
timestamp
add required proptypes
add disabled to save button on addNote - client-side validation

//

middleWare
make sure new id is working

//


client-side validation
tinyMCE todo
tinyMCE help
tinyMCE mention
CSS maxheight for panels
editor must show all - including todoMCE fields
ToDo
Access
additional filters
Notes library
Send to sharebook
Active to/from
Save to notes library
copy to case
highlight searchterm
animate showfilter/editor
Loading



// Filters //

this.state.colorFilters.length > 0 ||
this.state.tagFilters.length > 0 ||
this.state.typeFilters.length > 0 ||
this.state.rangeFilters.length > 0 ||
this.state.sharingFilters.length > 0 ||
this.state.attachedToFilters.length > 0 ||
this.state.searchAllCasesFilter;


//  Edit options //

id: -1,
type: '',
caseId: -1,
attachedId: -1,
attachedEntity: '',
title: '',
content: '',
stripedContent: '',
color: '',
editable: false,
deletable: false,
tags: [],

docId: -1,
pageNumber: null,
annotationData: '',

showTodo: false,
assignedUser: null,
assignedDueDate: null,
completed: false,

showSharing: false,
accessLevel: '',
sharedWithUsers: [],
sharedWithAuthorities: [],
recentSharedWithUsers: [],
recentSharedWithAuthorities: [],
defaultSharedWithAuthorities: [],

activeFrom: null,
activeTo: null,

messages: [],
errors: [],

loading: false,
changed: false