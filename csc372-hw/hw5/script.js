/*
  Name: Kennedy Page
  Date: 10.23.2024
  CSC 372-01

  This is the script.js file for the GitHub repository gallery page. It contains the logic to 
  fetch repository data from the GitHub API based on the username entered, and dynamically 
  displays the repositories and their details such as commits, stars, and forks in the gallery section.
*/

document.getElementById("search-btn").addEventListener("click", function () {
  const username = document.getElementById("username").value;
  if (username) {
    fetchRepos(username);
  } else {
    alert("Please enter a GitHub username");
  }
});

async function fetchRepos(username) {
  const gallery = document.getElementById("gallery");
  gallery.innerHTML = "";
  const url = `https://api.github.com/users/${username}/repos`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`GitHub user ${username} not found`);
    }

    const repos = await response.json();
    if (repos.length === 0) {
      gallery.innerHTML = "<p>No repositories found for this user.</p>";
      return;
    }

    repos.forEach(async (repo) => {
      const commitCount = await fetchCommitCount(username, repo.name);

      const repoCard = document.createElement("div");
      repoCard.classList.add("repo-card");

      repoCard.innerHTML = `
                <h3><i class="fab fa-github"></i> <a href="${
                  repo.html_url
                }" target="_blank">${repo.name}</a></h3>
                <p>${repo.description || "No description available"}</p>
                <div class="stats">
                    <i class="fas fa-star"></i> ${repo.stargazers_count}
                    <i class="fas fa-code-branch"></i> ${repo.forks_count}
                </div>
                <div class="repo-meta">
                    <p>Commits: <strong>${commitCount}</strong></p>
                    <p>Updated: <strong>${new Date(
                      repo.updated_at
                    ).toLocaleDateString()}</strong></p>
                    <p>Created: <strong>${new Date(
                      repo.created_at
                    ).toLocaleDateString()}</strong></p>
                </div>
            `;
      gallery.appendChild(repoCard);
    });
  } catch (error) {
    gallery.innerHTML = `<p>${error.message}</p>`;
  }
}

// Function to fetch the number of commits for each repository
async function fetchCommitCount(username, repoName) {
  const commitUrl = `https://api.github.com/repos/${username}/${repoName}/commits`;
  try {
    const commitResponse = await fetch(commitUrl);
    const commitData = await commitResponse.json();
    return commitData.length;
  } catch (error) {
    console.error(`Error fetching commit count for ${repoName}:`, error);
    return "N/A"; // Return 'N/A' in case of an error
  }
}
