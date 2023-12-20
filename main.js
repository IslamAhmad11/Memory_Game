let input = document.querySelector(".container input");
let button = document.querySelector(".container button");
let showData = document.querySelector(".container .show-data");

button.onclick = () => {

    if(input.value == ""){

        showData.innerHTML = "Please Write a Github Username";

    }else{

        fetch(`https://api.github.com/users/${input.value}/repos`)
        
        .then( (response) => {

            return response.json();

        }).then((repos) => {

            showData.innerHTML="";

            repos.forEach(repo => {

                let mainDiv = document.createElement("div");
                let repoName = document.createTextNode(repo.name);
                let theUrl = document.createElement("a");
                let urlText = document.createTextNode("Visit");
                let stars = document.createElement("span");
                
                theUrl.href = `https://github.com/${input.value}/${repo.name}`;
                theUrl.setAttribute("target", "_blank")
                theUrl.appendChild(urlText);

                stars.innerHTML = `${repo.stargazers_count} stars`

                mainDiv.appendChild(repoName);
                mainDiv.appendChild(theUrl);
                mainDiv.appendChild(stars);
                mainDiv.className = "repo-box";

                showData.appendChild(mainDiv);
            });
        })
    }
}