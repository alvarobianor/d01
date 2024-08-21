const panels = document.querySelectorAll(".panel");

const errorImage = `url(https://imageio.forbes.com/blogs-images/zarastone/files/2017/05/21Amazon-Barkley-404.jpg?height=711&width=711&fit=bounds)`;
function getQueryUrl(query) {
  return `https://api.unsplash.com/photos/random/?client_id=Dzb1Toq4uryyL5mo7tPUekl6584GEoHgOO5ltKUHw50&query=${query}&count=1`;
}

function removeActiveClasses() {
  panels.forEach((panel) => {
    panel.classList.remove("active");
  });
}

function failCase() {
  panels.forEach((panel) => {
    panel.style.backgroundImage = errorImage;
  });
}

async function toJSON(body) {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  const chunks = [];

  async function read() {
    const { done, value } = await reader.read();

    if (done) {
      if (chunks[0] == "Rate Limit Exceeded") {
        return;
      }
      return JSON.parse(chunks.join(""));
    }

    const chunk = decoder.decode(value, { stream: true });
    chunks.push(chunk);
    return read();
  }

  return read();
}

async function getImages() {
  const universePhotoPromise = fetch(getQueryUrl("universe"));
  const seaPhotoPromise = fetch(getQueryUrl("sea"));
  const cityPhotoPromise = fetch(getQueryUrl("city"));
  const mountainsPhotoPromise = fetch(getQueryUrl("mountains"));
  const wildPhotoPromise = fetch(getQueryUrl("wild"));
  const technologyPhotoPromise = fetch(getQueryUrl("technology"));
  const toysPhotoPromise = fetch(getQueryUrl("toys"));
  const icePhotoPromise = fetch(getQueryUrl("ice"));
  const fantasyPhotoPromise = fetch(getQueryUrl("fantasy"));
  const artPhotoPromise = fetch(getQueryUrl("art"));

  try {
    const data = await Promise.all([
      universePhotoPromise,
      seaPhotoPromise,
      cityPhotoPromise,
      mountainsPhotoPromise,
      wildPhotoPromise,
      technologyPhotoPromise,
      toysPhotoPromise,
      icePhotoPromise,
      fantasyPhotoPromise,
      artPhotoPromise,
    ]);

    panels.forEach(async (panel, index) => {
      const jsonData = await toJSON(data[index].body);
      if (jsonData === undefined) {
        failCase();

        throw new Error("Error fetching image");
      }

      const url = jsonData[0].urls.regular;
      panel.style.backgroundImage = `url(${url})`;
    });
  } catch (error) {
    failCase();
  }
}

getImages();

panels.forEach((panel) => {
  panel.addEventListener("click", () => {
    if (!String(panel.style.backgroundImage).includes("unsplash")) {
      const h3 = panel.getElementsByTagName("h3")[0];
      h3.style.backgroundColor = "rgba(8, 24, 12, 1)";
    }

    if (panel.classList.contains("active")) {
      panel.classList.remove("active");
    } else {
      removeActiveClasses();

      panel.classList.add("active");
    }
  });
});
