let setList = [
    {
        'id': '1',
        'name': 'Class1',
        'studied': false,
        'terms': [
            { 'term': '+', 'definition': 'Addition' },
            { 'term': '-', 'definition': 'Subtraction' },
            { 'term': '/', 'definition': 'Division' },
            { 'term': '*', 'definition': 'Multiplication' }
        ]
    },
    {
        'id': '2',
        'name': 'Class2',
        'studied': true,
        'terms': [
            { 'term': 'Zebra', 'definition': 'Mammal' },
            { 'term': 'Shark', 'definition': 'Fish' }
        ]
    }
];
const SEC = 0;
const ROOT = document.querySelector('#root');
window.addEventListener('DOMContentLoaded', function () {
    render();
});
window.addEventListener('hashchange', function (){
    render();
});

function generateSetListItem() { //Save Changes event method
    let nameInputValue = ROOT.querySelector('.nameTextarea').value;
    let setItems = ROOT.querySelectorAll('.termDefItem');
    let lastItemIndex = setList.length - 1;
    let terms = [];
    let newId = Number(setList[lastItemIndex].id) + 1;
    let name = nameInputValue;
        setItems.forEach( (item) => {
            let termValue = item.querySelector('.termArea').value;
            let defValue = item.querySelector('.defArea').value;
            if (termValue && defValue) {
                terms.push({'term' : termValue, 'definition' : defValue});    
            }
        })
    let newSet = {
        'id': String(newId),
        'name': name,
        'studied': false,
        'terms': terms
    };
    if (nameInputValue) {
        setList.unshift(newSet);
        location.hash = '#main_page';
    } else {
       alert('Enter your module\'s mame');
    }
    console.log(newSet);
}
function render() {
    let pageName = location.hash || '#main_page';
    location.hash = pageName;
    let template = document.querySelector(pageName) || document.querySelector('#main_page');//It could be 404-page
    let content = template.innerHTML;
    ROOT.innerHTML = content;
    if (location.hash === '#main_page') {
        setsRender(setList);
    } else if (location.hash === '#add_new_set') {
        createAddNewPage();
        setAddNewPageEvents();
    }
}

function setsRender(list) {
    let setsWrap = ROOT.querySelector('.setsWrap');
    setsWrap.innerHTML = null;
    createSetsContent();
    addButtonListeners();
    addMainPageEvents();

    function createSetsContent() {
        let wrapper = document.createElement('div');
        wrapper.classList.add('setItem');
        list.forEach((e) => {
            let content = document.createElement('div');
            let title = document.createElement('h3');
            let quantity = document.createElement('span');
            let studied = document.createElement('span');
            let buttons = createSetsBtns(e.id);
            content.classList.add('setContent');
            studied.classList.add('studiedWrap');
            studied.innerHTML = 'Studied';
            content.setAttribute('itemId', e.id);
            title.innerHTML = e.name;
            quantity.innerHTML = `Terms quantity: ${e.terms.length}`;
            content.innerHTML = e.studied ? `${studied.outerHTML} ${title.outerHTML} ${quantity.outerHTML}` :
            `${title.outerHTML} ${quantity.outerHTML}`;
            wrapper.innerHTML = `${content.outerHTML} ${buttons}`;
            wrapper.setAttribute('itemId', e.id);
            e.studied ? setsWrap.insertAdjacentHTML('beforeend', wrapper.outerHTML) :
                        setsWrap.insertAdjacentHTML('afterbegin', wrapper.outerHTML);
        })
    }
    function createSetsBtns(parentId) {
        let buttonWrap = document.createElement('div');
        let removeButton = document.createElement('button');
        let editButton = document.createElement('button');
        buttonWrap.classList.add('setButtonsWrap');
        removeButton.classList.add('removeBtn');
        removeButton.setAttribute('parentId', parentId);
        editButton.classList.add('editBtn');
        removeButton.textContent = 'Remove';
        editButton.textContent = 'Edit';
        buttonWrap.innerHTML = `${removeButton.outerHTML} ${editButton.outerHTML}`;
        return buttonWrap.outerHTML;
    }
    function addButtonListeners() {
        let editButtons = document.querySelectorAll('.editBtn');
        let removeButtons = document.querySelectorAll('.removeBtn');
        
        editButtons.forEach( (elem) => {
            editBtnEvent(elem);
        })
        removeButtons.forEach( (elem) => {
            removeBtnEvent(elem);
        })

        function editBtnEvent(e) {
            e.addEventListener('click', (event) => {
                let parent = event.target.closest('[itemid]');
                let parentId = parent.getAttribute('itemid');
                let set = setList.find(item => item.id === parentId);
                // function(set)
                event.stopPropagation();
                location.hash = '#modify_set';
            })
        }
        function removeBtnEvent(e) {
            e.addEventListener('click', (event) => {
                event.stopPropagation();
                let conf = confirm('Are you sure?'); 
                if (conf) {
                    let targetId = event.target.getAttribute('parentid');
                    let removeIndex = setList.findIndex(item => item.id === targetId);
                    setList.splice(removeIndex, 1);
                    setsRender(setList);
                }
            })
        }
    }
}
function addMainPageEvents() {
        setTimeout(function () {
            let mainButton = ROOT.querySelector('.mainButton');
            let setItems = ROOT.querySelectorAll('.setItem');
            mainButton.addEventListener('click', () => {
                location.hash = '#add_new_set';
            });
            setItems.forEach( (item) => { //add sort studied items eventlistener
                item.addEventListener('click', (e) => {
                    let itemId = e.target.parentNode.getAttribute('itemid') || 
                        e.target.getAttribute('itemid');
                    let changeItemIndex = setList.findIndex(item => item.id === itemId);
                    setList[changeItemIndex].studied = setList[changeItemIndex].studied !== true;
                    setsRender(setList);
                })
            })
        },SEC)
}
function setAddNewPageEvents() {
        setTimeout(function () {
            let cancel = ROOT.querySelector('.cancelBtn');
            let saveChanges = ROOT.querySelector('.saveChangesBtn');
            let addTerms = ROOT.querySelector('.createBtn');
            let removeTermBtns = ROOT.querySelectorAll('.removeSpan');
            cancel.addEventListener('click', () => {
                location.hash = '#main_page';
            });
            saveChanges.addEventListener('click', generateSetListItem);
            addTerms.addEventListener('click', addBlockOfTerms);
            removeTermBtns.forEach( item => {
                item.addEventListener('click', removeTerm);
            })
        },SEC)
}
function removeTerm(e) {
    let termWrapper = ROOT.querySelector('.termDefWrapper');
    let removingDiv = e.target.parentNode;
    termWrapper.removeChild(removingDiv);
}

function addBlockOfTerms() {
    let newItem = joinTermDefInputs(createInput);
    let oldItems = ROOT.querySelectorAll('.termDefItem');
    // [].forEach.call(oldItems, el => {
    //     let children = el.children;
    //     [].forEach.call(children, el => {
    //         console.dir(el); 
    //     })
    // });
    let blockWrapper = ROOT.querySelector('.termDefWrapper');
    blockWrapper.innerHTML += `${newItem} ${newItem}`;
    setAddNewPageEvents(); // ADD SAVING TERMS
}

function createModifyPage(set) {
    let wrapper = ROOT.querySelector('.mainWrap');
    let title = ROOT.querySelector('.modifySetTitle');
    title.innerHTML = set.title;
    joinModifyPage();
    function joinModifyPage() {
        let cancelButton = createButton('cancelBtn', 'Cancel');
        let saveButton = createButton('saveBtn', 'Save changes');
        //FINISH CREATING MODIFY PAGE !!!
    }
}
function createAddNewPage(){
    let wrapper = ROOT.querySelector('.newSetsWrap');
    joinAddNewPage();

    function joinAddNewPage() {
        let moduleName = joinNameModule();
        let termDefItem = joinTermDefInputs(createInput);
        let addTermsButton = createButton('createBtn', 'Add terms');
        let saveButton = createButton('saveChangesBtn', 'Save changes');
        let cancelButton = createButton('cancelBtn', 'Cancel');
        let termDefWrapper = document.createElement('div');
        let buttonsWrap = document.createElement('div');
        buttonsWrap.classList.add('btnsWrap');
        termDefWrapper.classList.add('termDefWrapper');
        termDefWrapper.innerHTML = `${termDefItem} ${termDefItem}`;
        buttonsWrap.innerHTML = `${cancelButton} ${saveButton} ${addTermsButton}`;
        wrapper.innerHTML = `${moduleName} ${termDefWrapper.outerHTML} ${buttonsWrap.outerHTML}`;
    }
}
    function joinNameModule() {
        let nameInput = createNameInp();
        let inputNameWrap = document.createElement('div');
        inputNameWrap.classList.add('newInputNameWrap');
        inputNameWrap.innerHTML = nameInput;
        return inputNameWrap.outerHTML;
    }
    function createButton(classValue, textContent) {
        let newButton = document.createElement('button');
        newButton.classList.add(classValue);
        newButton.textContent = textContent;
        return newButton.outerHTML;
    }
    function createNameInp() {
        let inputName = document.createElement('textarea');
        inputName.classList.add('nameTextarea');
        inputName.setAttribute('name', 'name');
        inputName.setAttribute('maxlength', '200');
        inputName.setAttribute('placeholder', 'Name new module...');
        return inputName.outerHTML;
    }
    function joinTermDefInputs(makeInput) {
        let termInput = makeInput('TERM', 'term');
        let defInput = makeInput('DEFINITION', 'def');
        let termDefItem = document.createElement('div');
        let removeBtn = document.createElement('span');
        removeBtn.classList.add('removeSpan');
        removeBtn.innerHTML = 'X';
        termDefItem.classList.add('termDefItem');
        termDefItem.innerHTML = `${termInput} ${defInput} ${removeBtn.outerHTML}`;
        return termDefItem.outerHTML;
    }
    function createInput(inpDescription, partOfClassName) {
        let inpWrap = document.createElement('div');
        let inpSpan = document.createElement('span');
        let inpArea = document.createElement('textarea');
        inpWrap.classList.add(`${partOfClassName}Wrap`);
        inpArea.classList.add(`${partOfClassName}Area`);
        inpSpan.classList.add(`${partOfClassName}Span`);
        inpSpan.innerHTML = inpDescription;
        inpWrap.innerHTML = `${inpArea.outerHTML} ${inpSpan.outerHTML}`;
        return inpWrap.outerHTML;
    }    