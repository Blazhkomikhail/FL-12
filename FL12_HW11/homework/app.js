const structure = [
    {
      'folder': true,
      'title': 'Films',
      'children': [
        {
          'title': 'Iron Man.avi'
        },
        {
          'folder': true,
          'title': 'Fantasy',
          'children': [
            {
              'title': 'The Lord of the Rings.avi'
            },
            {
              'folder': true,
              'title': 'New folder 1',
              'children': false
            }
          ]
        }
      ]
    },
    {
      'folder': true,
      'title': 'Documents',
      'children': [
        {
          'folder': true,
          'title': 'EPAM Homework answers',
          'children': null
        }
      ]
    }
];

const rootNode = document.getElementById('root');
const folderIcon = '<i class="material-icons folderIcon">folder</i>';
const folderOpenedIcon = '<i class= "material-icons folderIcon">folder_open</i>';
const fileIcon = '<i class="material-icons fileIcon">insert_drive_file</i>';

function buildTree(data, node, structElem) {
  
  function isNodeChild(elem) {
    return elem.parentNode.classList.contains('folder');
  }
  data.forEach((e) => {
  if (e.folder) {
    let newDiv = document.createElement(structElem);
    newDiv.innerHTML = folderIcon + e.title;
    newDiv.classList.add('folder');
    node.appendChild(newDiv);
    if (isNodeChild(newDiv)){
      newDiv.classList.add('hidden');
    }
    if(e.children) {
      buildTree(e.children, newDiv, 'li');
    } else {
      let newParagraph = document.createElement('li');
      newParagraph.innerText = 'Folder is empty';
      newParagraph.classList.add('hidden');
      newParagraph.classList.add('emptyMessage');
      newDiv.appendChild(newParagraph);
    }
  } else {
    let newDiv = document.createElement('li');
    newDiv.innerHTML = fileIcon + e.title;
    newDiv.classList.add('hidden');
    node.appendChild(newDiv);
  }
})
}
buildTree(structure, rootNode, 'ul');

function hideElements(e) {
  let elems = e.target.children;
  [].forEach.call(elems, (e) => {
    e.classList.toggle('hidden');
  })
}
function changeFolderIcon(e) {
  let iTagText = e.target.children[0];
  e.target.children[0].classList.remove('hidden');
  if (iTagText.innerText === 'folder') {
    iTagText.innerText = 'folder_open'
  } else if (iTagText.innerText === 'folder_open'){
    iTagText.innerText = 'folder';
  }  
}
rootNode.addEventListener('click', hideElements);
rootNode.addEventListener('click', changeFolderIcon);