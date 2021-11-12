const prevBtn = document.getElementById('previous-page')
const nextBtn = document.getElementById('next-page')
const numberOfPage = document.querySelector('.number-of-page')
let pageNumber = localStorage.getItem('page') || 1
numberOfPage.textContent = pageNumber
const infoPost = document.querySelector('.info-post')
const titlePost = document.querySelector('.title')
const userName = document.querySelector('.name')
const userMail = document.querySelector('.email')
const bodyPost = document.querySelector('.body')
const comTitle = document.querySelector('.comments-title')
const comments = document.querySelector('.comments')
let userId = 1
let postId = 1


// Получение пользователей и комментариев
const getUser = async (url) => {
    const response = await fetch(url)
    if (!response.ok){
        throw new Error(`Ошибка по адресу ${url}, статус ошибки ${response}`)
    }
    return await response.json()
}
const getComment = async (url) => {
    const response = await fetch(url)
    if (!response.ok){
        throw new Error(`Ошибка по адресу ${url}, статус ошибки ${response}`)
    }
    return await response.json()
}

// Получения постов
const getData = async (url) => {
    const response = await fetch(url)
    if (!response.ok){
        throw new Error(`Ошибка по адресу ${url}, статус ошибки ${response}`)
    }
    return await response.json()
}

const clearData = () => {
    comTitle.innerHTML = ''
    comments.innerHTML = ''  
}
getPage = () => getData(`https://jsonplaceholder.typicode.com/posts?_page=${pageNumber}&_limit=10`)
.then((data) => data.forEach(item => {
    const elem = document.createElement('li')
    elem.textContent = item.title
    elem.addEventListener('click', () => {
        titlePost.textContent = item.title
        getUser(`https://jsonplaceholder.typicode.com/users/${userId}`)
            .then(data => {
                userName.textContent = data.name
                userMail.textContent = data.email
            })
        bodyPost.textContent = item.body
        clearData()
        getComment(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
            .then(data => data.forEach(item => {
                comTitle.textContent = 'Comments:'
                const comUserName = document.createElement('div')
                comUserName.classList.add('comment-user-name')
                comUserName.textContent = item.name
                const comUserEmail = document.createElement('div')
                comUserEmail.classList.add('comment-user-email')
                comUserEmail.textContent = item.email
                const comBody = document.createElement('div')
                comBody.classList.add('comments-body')
                comBody.textContent = item.body
                comments.appendChild(comUserName)
                comments.appendChild(comUserEmail)
                comments.appendChild(comBody)
            }))
    })
    posts.appendChild(elem)
}))

// Вывод массива на экран
const posts = document.querySelector('.title-posts')
getPage()

// Доп функции
const disablePrevBtn = () => {
    if (pageNumber == 1){
        prevBtn.disabled = true
    } else {
        prevBtn.disabled = false
    }
}
disablePrevBtn()

const refreshIdAndNumber = () => {
    numberOfPage.textContent = pageNumber
    userId = pageNumber
    postId = pageNumber
}

// Пагинация
nextBtn.addEventListener('click', () => {
    pageNumber++
    localStorage.setItem('page', pageNumber);
    posts.innerHTML=''
    clearData()
    disablePrevBtn()
    refreshIdAndNumber()
    getPage()
})

prevBtn.addEventListener('click', () => {
    pageNumber--
    localStorage.setItem('page', pageNumber);
    posts.innerHTML=''
    clearData()
    disablePrevBtn()
    refreshIdAndNumber()
    getPage()
})