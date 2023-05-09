const app = document.getElementById('app');

// Use the Fetch API to retrieve data from the Dog API
fetch('https://dog.ceo/api/breeds/list/all')
  .then(response => response.json())
  .then(data => {
    const breedList = Object.keys(data.message);

    // Create a new list item for each breed and append it to the app element
    const breedItems = breedList.map(breed => {
      const li = document.createElement('li');
      li.classList.add('breed');
      li.innerHTML = `
        <img src="" alt="${breed} dog breed">
        <div class="details">
          <h2>${breed}</h2>
        </div>
      `;

      // Use the Fetch API to retrieve more details about the breed and update the list item with the details
      fetch(`https://dog.ceo/api/breed/${breed}/list`)
        .then(response => response.json())
        .then(data => {
          const subBreeds = data.message;

          // Add the sub-breeds to the list item if they exist
          if (subBreeds.length > 0) {
            const subBreedList = subBreeds.map(subBreed => `<li>${subBreed}</li>`).join('');
            li.querySelector('.details').innerHTML += `
              <p>Sub-breeds:</p>
              <ul>${subBreedList}</ul>
            `;
          }

          // Use the Fetch API to retrieve the list of images for the breed and update the list item with the first image
          fetch(`https://dog.ceo/api/breed/${breed}/images`)
            .then(response => response.json())
            .then(data => {
              const image = data.message[0];
              li.querySelector('img').setAttribute('src', image);
            })
            .catch(error => console.log(error));

          // Add a click event listener to each list item that redirects to the breed-specific dog website
          li.addEventListener('click', () => {
            window.location.href = `https://www.akc.org/dog-breeds/${breed}/`;
          });
        })
        .catch(error => console.log(error));

      return li;
    });

    const breedListElement = document.createElement('ul');
    breedListElement.setAttribute('id', 'breed-list');
    breedListElement.append(...breedItems);

    app.appendChild(breedListElement);
  })
  .catch(error => console.log(error));
