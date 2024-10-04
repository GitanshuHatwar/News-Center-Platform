const API_KEY = "99bc96bce3d745d19e38780fd89f0024";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load', () => fetchNews("India"));

function reload()
{
    window.location.reload();
}
async function fetchNews(query) {
    try {
        const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
        const data = await res.json();
        // Pass the articles array directly
        bindData(data.articles);
    } catch (error) {
        console.error("Error fetching the news: ", error);
    }
}

function bindData(articles) {
    const cardsContainer = document.getElementById('cards-container');
    const newsCardTemplate = document.getElementById('template-news-card');
    
    // Clear the container before appending new articles
    cardsContainer.innerHTML = '';
    
    articles.forEach(article => {
        if (!article.urlToImage) return;

        // Clone the template and populate the article data
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);  // Fixed typo: 'acticle' -> 'article'

        // Append the cloned card to the container
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article) {
    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta"
    });

    cardClone.querySelector('#news-img').src = article.urlToImage;
    cardClone.querySelector('#news-title').innerHTML = article.title;
    cardClone.querySelector('#news-source').innerHTML = `${article.source.name} : ${date}`;
    cardClone.querySelector('#news-desc').innerHTML = article.description;

    cardClone.firstElementChild.addEventListener('click',() => {
        window.open(article.url, "_blank");
    });
}
let curSelectedNav = null;
function onNavItemClick(id){
    fetchNews(id);
    const navIteam = document.getElementById(id);
    curSelectedNav?.classlist.remove('active');
    curSelectedNav = navIteam;
    curSelectedNav.classlist.add('active');
    

}
const searchbutton = document.getElementById('search-button');
const searchtext = document.getElementById('search-text');

searchbutton.addEventListener('click', () => {
    const query = searchtext.value;
    if (!query) return;
    fetchNews(query);


});
