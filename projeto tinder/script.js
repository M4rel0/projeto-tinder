console.log("Script.js está funcionando!");
document.addEventListener("DOMContentLoaded", function () {
  function addEventListeners() {
    document
      .querySelector(".scroll-left")
      .addEventListener("click", function () {
        document.querySelector(".teste").scrollBy({
          left: -200, // Ajuste conforme necessário
          behavior: "smooth",
        });
      });

    document
      .querySelector(".scroll-right")
      .addEventListener("click", function () {
        document.querySelector(".teste").scrollBy({
          left: 200, // Ajuste conforme necessário
          behavior: "smooth",
        });
      });

    document.querySelectorAll(".curtida").forEach((img) => {
      img.addEventListener("click", function () {
        if (img.src.includes("coracaoS.svg")) {
          img.src = "/img/coracaoC.svg"; // Caminho para a nova imagem
        } else {
          img.src = "/img/coracaoS.svg"; // Caminho para a imagem original
        }

        img.classList.add("animated");

        // Remove a classe 'animated' após a animação terminar
        img.addEventListener(
          "animationend",
          function () {
            img.classList.remove("animated");
          },
          { once: true }
        );
      });
    });
  }

  document
    .querySelector(".scroll-right")
    .addEventListener("click", function () {
      transitionPage("par.html", "right");
    });

  document.querySelector(".scroll-left").addEventListener("click", function () {
    transitionPage("index.html", "left");
  });

  function transitionPage(pagina, direction) {
    let conteudo = document.getElementById("conteudo");
    conteudo.classList.add(
      direction === "right" ? "fade-out-right" : "fade-out-left"
    ); // Adiciona a classe de transição

    setTimeout(() => {
      carregarPagina(pagina);
    }, 500); // Aguarda o tempo da transição antes de carregar a nova página
  }

  function carregarPagina(pagina) {
    fetch(pagina)
      .then((response) => response.text())
      .then((html) => {
        let conteudo = document.getElementById("conteudo");
        let tempDiv = document.createElement("div");
        tempDiv.innerHTML = html;

        // Remove tags indesejadas antes de atualizar o conteúdo
        let footers = tempDiv.querySelectorAll("footer, body, html");
        footers.forEach((el) => el.remove());

        conteudo.innerHTML = tempDiv.innerHTML; // Atualiza apenas o conteúdo da section
        conteudo.classList.remove("fade-out-left", "fade-out-right"); // Remove as classes de transição após a atualização
        conteudo.style.transform = "translateX(0)"; // Reseta a posição do conteúdo

        addEventListeners(); // Reatribui os event listeners após o carregamento da nova página
      })
      .catch((error) => console.error("Erro ao carregar a página:", error));
  }

  addEventListeners(); // Adiciona os event listeners iniciais
});

document.addEventListener("DOMContentLoaded", function () {
  const carossel = document.querySelector(".carossel");
  let isDown = false;
  let startX;
  let scrollLeft;

  carossel.addEventListener("mousedown", (e) => {
    isDown = true;
    carossel.classList.add("active");
    startX = e.pageX - carossel.offsetLeft;
    scrollLeft = carossel.scrollLeft;
  });

  carossel.addEventListener("mouseleave", () => {
    isDown = false;
    carossel.classList.remove("active");
  });

  carossel.addEventListener("mouseup", () => {
    isDown = false;
    carossel.classList.remove("active");
  });

  carossel.addEventListener("mousemove", (e) => {
    if (!isDown) return; // Só executa se o mouse estiver pressionado
    e.preventDefault();
    const x = e.pageX - carossel.offsetLeft;
    const walk = (x - startX) * 1; // Ajuste a velocidade de rolagem conforme necessário
    carossel.scrollLeft = scrollLeft - walk;
  });
});
