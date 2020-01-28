let setList = [
    {
        'id': '1',
        'name': 'Class1',
        'studied': true,
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
        'studied': false,
        'terms': [
            { 'term': 'Zebra', 'definition': 'Mammal' },
            { 'term': 'Shark', 'definition': 'Fish' }
        ]
    }
];
const SEC = 0;

function render(pageName) {
    location.hash = pageName;
    let content = document.querySelector(pageName).innerHTML;
    document.querySelector('#root').innerHTML = content;
    addEvents();
    setsRender(setList);

}

function routing() {
    let pageName = location.hash;
    if (!pageName) {
        pageName = 'main_page';
    }
    render(pageName);
}

window.addEventListener('hashchange', function (){
    routing();
})

window.addEventListener('DOMContentLoaded', function () {
    routing();
})

function setsRender(list) {
    let root = document.querySelector('#root');
    let setsWrap = root.querySelector('.setsWrap');
    function createSetsContent() {
        let wrapper = document.createElement('div');
        wrapper.classList.add('setItem');

        list.forEach((e) => {
            let content = document.createElement('div');
            let title = document.createElement('h3');
            let quantity = document.createElement('span');
            let buttons = createSetsBtns();
            content.classList.add('setContent');
            title.innerHTML = e.name;
            quantity.innerHTML = `Terms quantity: ${e.terms.length}`;
            content.innerHTML = `${title.outerHTML} ${quantity.outerHTML}`;
            wrapper.innerHTML = `${content.outerHTML} ${buttons}`;
            setsWrap.innerHTML += wrapper.outerHTML;
        })
    }
    function createSetsBtns() {
        let buttonWrap = document.createElement('div');
        let removeButton = document.createElement('button');
        let editButton = document.createElement('button');
        buttonWrap.classList.add('setButtonsWrap');
        removeButton.classList.add('removeBtn');
        editButton.classList.add('editBtn');
        removeButton.textContent = 'Remove';
        editButton.textContent = 'Edit';
        buttonWrap.innerHTML = `${removeButton.outerHTML} ${editButton.outerHTML}`
        return buttonWrap.outerHTML;
    }
    createSetsContent();
}


function addEvents() {
    if (location.hash === '#main_page') {
        setTimeout(function getButton() {
            let root = document.querySelector('#root');
            let mainButton = root.querySelector('.mainButton');
            mainButton.addEventListener('click', () => {
                location.hash = '#add_new_set';
            })
        },SEC)
    } else if (location.hash === '#add_new_set') {
        setTimeout(function getButton() {
            let root = document.querySelector('#root');
            let logo = root.querySelector('.logo');
            logo.addEventListener('click', () => {
                location.hash = '#main_page';
            })
        },SEC)
    }
}



