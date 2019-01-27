'use strict';

const urlApi = "https://api.github.com";

function getRepos(searchedUser) {
    const userRepos = `/users/${searchedUser}/repos`

    const url = urlApi + userRepos;

    const options = {
        headers: new Headers({
            "Accept": "application/vnd.github.v3+json"
        })
    };

    fetch(url, options)
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(error => {
        $('#results-list').empty();
        $('#js-error-message').text(`Something went wrong: ${error.message}`);
    })
}

function displayResults(responseJson) {
    console.log(responseJson)
    $('#results-list').empty();
    $('.error-message').empty();
    for (let i = 0; i < responseJson.length; i++) {
        $('#results-list').append(
            `
            <li>
                <p><a href="${responseJson[i].clone_url}" target="_blank">${responseJson[i].name}</a></p>
                <span><strong>Available Description:</strong> ${responseJson[i].description}</span>
            </li>
            `
    )}
    
}

$(function searchFetch() {
    $('form').submit( event => {
        event.preventDefault();

        const searchedUser = $('#search-user').val();

        getRepos(searchedUser);
    })
})
