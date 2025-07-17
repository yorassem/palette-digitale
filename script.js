document.addEventListener('DOMContentLoaded', () => {
    // Données de commerces factices
    const allBusinesses = [
        {
            id: 1, // Ajout d'un ID pour faciliter la gestion
            name: "Restaurant Le Saveur du Tchad",
            category: "Restaurant", // Catégories plus claires
            description: "Spécialités tchadiennes et africaines dans une ambiance conviviale.",
            address: "Av. Mobutu, près du Marché Central",
            phone: "+235 66 123 456",
            photos: "rrresso.jpg",
            facebook: "https://www.facebook.com/profile.php?id=61578211166573",
            instagram: "https://wa.me/2356612345https://www.instagram.com/palette_digitale/"
        },
        {
            id: 2,
            name: "Atelier Artisanal Koudou",
            category: "Artisanat",
            description: "Créations uniques en cuir, bois et tissus locaux.",
            address: "Rue de l'Artisanat, Quartier Ndra",
            phone: "+235 62 789 012",
            photos: "arrrt.jpg",
            facebook: "https://www.facebook.com/profile.php?id=61578211166573",
            instagram: "https://wa.me/2356612345https://www.instagram.com/palette_digitale/"
        },
        {
            id: 3,
            name: "Garage Auto Rapide",
            category: "Service Auto",
            description: "Réparation mécanique, entretien et diagnostic toutes marques.",
            address: "Route de Bongor, à côté de la Station",
            phone: "+235 69 456 789",
            photos: "auto.jpg",
           facebook: "https://www.facebook.com/profile.php?id=61578211166573",
            instagram: "https://wa.me/2356612345https://www.instagram.com/palette_digitale/"
        },
        {
            id: 4,
            name: "Boutique Fashion Style",
            category: "Boutique",
            description: "Vêtements tendances pour hommes et femmes, accessoires de mode.",
            address: "Centre Commercial, Place de l'Indépendance",
            phone: "+235 60 112 233",
            photos: "boutique.jpg",
           facebook: "https://www.facebook.com/profile.php?id=61578211166573",
            instagram: "https://wa.me/2356612345https://www.instagram.com/palette_digitale/"
        },
        {
            id: 5,
            name: "Pharmacie Centrale",
            category: "Pharmacie",
            description: "Médicaments, parapharmacie et conseils santé.",
            address: "Place du Marché, centre ville",
            phone: "+235 67 889 900",
            photos: "pharma.jpg",
            facebook: "https://www.facebook.com/profile.php?id=61578211166573",
            instagram: "https://wa.me/2356612345https://www.instagram.com/palette_digitale/"
        },
        {
            id: 6,
            name: "Coiffure Beauté Tchad",
            category: "Salon de Coiffure",
            description: "Coiffure hommes, femmes et enfants. Tresses et soins capillaires.",
            address: "Rue 5, Quartier Chagoua",
            phone: "+235 61 223 344",
            photos: "salon.jpg",
            facebook: "https://www.facebook.com/profile.php?id=61578211166573",
            instagram: "https://wa.me/2356612345https://www.instagram.com/palette_digitale/"
        }
        // Ajoutez d'autres commerces ici
    ];

    let filteredBusinesses = []; // Pour stocker les commerces filtrés
    let currentPage = 1;
    const itemsPerPage = 6; // Nombre de commerces par page

    // --- Fonctionnalités pour la page d'accueil (index.html) ---
    const searchInput = document.getElementById('searchInput'); // Barre de recherche sur index.html
    const searchButton = document.getElementById('searchButton'); // Bouton de recherche sur index.html

    if (searchInput && searchButton) {
        searchButton.addEventListener('click', () => {
            const searchTerm = searchInput.value.trim();
            if (searchTerm) {
                window.location.href = `business-listing.html?search=${encodeURIComponent(searchTerm)}`;
            } else {
                alert("Veuillez entrer un terme de recherche.");
            }
        });

        searchInput.addEventListener('keyup', (event) => {
            if (event.key === 'Enter') {
                searchButton.click();
            }
        });
    }

    // Fonctionnalité de carrousel pour la section Hero (index.html)
    const heroCarouselContainer = document.querySelector('.hero-carousel-container');
    if (heroCarouselContainer) {
        const carouselImages = [
            'carr1.jpg',
            'carr2.jpg',
            'carr3.jpg',
            'carrr3.jpg'
        ];

        let currentImageIndex = 0;

        const showImage = (index) => {
            heroCarouselContainer.innerHTML = '';
            const img = document.createElement('img');
            img.src = carouselImages[index];
            img.alt = `Vue de Moundou - Image ${index + 1}`;
            img.classList.add('active');
            heroCarouselContainer.appendChild(img);
        };

        const nextImage = () => {
            currentImageIndex = (currentImageIndex + 1) % carouselImages.length;
            showImage(currentImageIndex);
        };

        if (carouselImages.length > 0) {
            showImage(currentImageIndex);
            setInterval(nextImage, 5000);
        }
    }


    // --- Fonctionnalités pour la page de liste des commerces (business-listing.html) ---
    const businessGrid = document.getElementById('businessGrid');
    const listingSearchInput = document.getElementById('listingSearchInput'); // Barre de recherche sur business-listing.html
    const listingSearchButton = document.getElementById('listingSearchButton'); // Bouton de recherche sur business-listing.html
    const paginationContainer = document.getElementById('pagination');

    // Fonction pour créer une carte de commerce
    const createBusinessCard = (business) => {
        const card = document.createElement('a');
        card.href = `business-detail.html?id=${business.id}`; // Lien vers la page de détail
        card.classList.add('business-card');
        card.innerHTML = `
            <img src="${business.photos}" alt="Image de ${business.name}">
            <div class="business-card-content">
                <h4>${business.name}</h4>
                <p>${business.description}</p>
                <div class="location"><i class="fas fa-map-marker-alt"></i>${business.address}</div>
                <div class="category-tag">${business.category}</div>
            </div>
        `;
        return card;
    };

    // Fonction pour afficher les commerces sur la page
    const displayBusinesses = (businessesToDisplay) => {
        if (!businessGrid) return; // S'assurer que nous sommes sur la bonne page

        businessGrid.innerHTML = ''; // Vider la grille avant d'ajouter de nouveaux commerces

        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const paginatedItems = businessesToDisplay.slice(startIndex, endIndex);

        if (paginatedItems.length === 0) {
            businessGrid.innerHTML = '<p>Aucun commerce trouvé pour cette recherche.</p>';
        } else {
            paginatedItems.forEach(business => {
                businessGrid.appendChild(createBusinessCard(business));
            });
        }
        setupPagination(businessesToDisplay.length);
    };

    // Fonction pour configurer la pagination
    const setupPagination = (totalItems) => {
        if (!paginationContainer) return;

        paginationContainer.innerHTML = '';
        const pageCount = Math.ceil(totalItems / itemsPerPage);

        for (let i = 1; i <= pageCount; i++) {
            const btn = document.createElement('a');
            btn.href = '#';
            btn.textContent = i;
            if (i === currentPage) {
                btn.classList.add('active');
            }
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                currentPage = i;
                displayBusinesses(filteredBusinesses); // Afficher les commerces filtrés
            });
            paginationContainer.appendChild(btn);
        }
    };

    // Fonction de filtrage des commerces
    const filterAndDisplayBusinesses = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const searchTermFromURL = urlParams.get('search'); // Récupère le terme de recherche de l'URL

        let currentSearchTerm = '';
        if (listingSearchInput) {
            currentSearchTerm = listingSearchInput.value.trim(); // Terme de la barre de recherche interne
            if (!currentSearchTerm && searchTermFromURL) { // Si la barre est vide mais l'URL a un terme
                listingSearchInput.value = searchTermFromURL; // Pré-remplir la barre de recherche
                currentSearchTerm = searchTermFromURL;
            }
        } else if (searchTermFromURL) { // Si pas de barre de recherche interne mais terme dans l'URL
             currentSearchTerm = searchTermFromURL;
        }


        if (currentSearchTerm) {
            const lowerCaseSearchTerm = currentSearchTerm.toLowerCase();
            filteredBusinesses = allBusinesses.filter(business =>
                business.name.toLowerCase().includes(lowerCaseSearchTerm) ||
                business.category.toLowerCase().includes(lowerCaseSearchTerm) ||
                business.description.toLowerCase().includes(lowerCaseSearchTerm) ||
                business.address.toLowerCase().includes(lowerCaseSearchTerm)
            );
        } else {
            filteredBusinesses = [...allBusinesses]; // Si pas de terme de recherche, afficher tous les commerces
        }

        currentPage = 1; // Réinitialiser à la première page après un nouveau filtre
        displayBusinesses(filteredBusinesses);
    };


    // Écouteur d'événements pour la barre de recherche sur business-listing.html
    if (listingSearchButton && listingSearchInput) {
        listingSearchButton.addEventListener('click', filterAndDisplayBusinesses);
        listingSearchInput.addEventListener('keyup', (event) => {
            if (event.key === 'Enter') {
                filterAndDisplayBusinesses();
            }
        });
    }

    // Appeler la fonction de filtrage et d'affichage au chargement de la page
    // Ceci s'assurera que si un terme de recherche est dans l'URL, il est appliqué
    if (businessGrid) { // S'assurer que nous sommes sur la page business-listing.html
        filterAndDisplayBusinesses();
    }


    // --- Fonctionnalités pour le formulaire d'ajout de commerce (add-business.html) ---
    const addBusinessForm = document.getElementById('addBusinessForm');
    if (addBusinessForm) {
        addBusinessForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const formData = new FormData(addBusinessForm);
            const businessData = {};
            for (const [key, value] of formData.entries()) {
                businessData[key] = value;
            }

            alert('Formulaire de soumission de commerce soumis !' +
                  '\nNom: ' + businessData.businessName +
                  '\nCatégorie: ' + businessData.businessCategory +
                  '\nAdresse: ' + businessData.businessAddress +
                  '\nTéléphone: ' + businessData.businessPhone +
                  '\nDescription: ' + businessData.businessDescription +
                  '\n\n(En production, ces données seraient envoyées à un serveur)');

            addBusinessForm.reset();
        });
    }

    // --- Fonctionnalités pour le formulaire de contact (contact.html) ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const formData = new FormData(contactForm);
            const messageData = {};
            for (const [key, value] of formData.entries()) {
                messageData[key] = value;
            }

            alert('Message envoyé !' +
                  '\nNom: ' + messageData.name +
                  '\nEmail: ' + messageData.email +
                  '\nSujet: ' + messageData.subject +
                  '\nMessage: ' + messageData.message +
                  '\n\n(En production, ce message serait envoyé à une adresse email via un serveur)');

            contactForm.reset();
        });
    }
});