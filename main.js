// const app = async () => {
//     try{
//         let posts = await fetch('https://jsonplaceholder.typicode.com/posts/')
//         if (posts.ok) {
//             let data = await posts.json()
//             console.log(data)
            
//             return data
//         } 
//     } catch {
//         alert(error)
//     }
//   }
//   app()
const getData = async (url) => {
    const response = await fetch(url)
    if (!response.ok){
        throw new Error(`Ошибка по адресу ${url}, статус ошибки ${response}`)
    }

    return await response.json()
}

getData('https://jsonplaceholder.typicode.com/posts/').then((data) => console.log(data))
