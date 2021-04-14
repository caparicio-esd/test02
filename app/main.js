

console.log(data);

window.addEventListener("load", () => {
    initMicroModal();
    renderGallery();
    renderGalleryMenu();
    initIsotope();
    galleryMenuEvents();
    galleryFilterEvents();
    initMoreEvent();


    //
    renderSliderData();
    initSlider();
});




const renderSliderData = () => {
    const sliderContainer = document.querySelector(".slider");
    let htmlString = "";

    data.sliderItems.forEach(sliderItem => {
        htmlString += `
            <div class="slider_item">
                <div class="slider_item_content">
                    <h6 class="tagline">
                        Stories
                    </h6>
                    <h2>
                        Non in felis blandit est. Sed adipiscing dui quis vitae lobortis morbi aliquet mollis proin. Nisi pharetra, phasellus volutpat, quis pellentesque.
                    </h2>
                    <p class="lead">
                        Quis eget malesuada lectus semper tincidunt nulla ornare pretium nibh. Dictum at praesent nisl quis donec cras metus.
                    </p>
                    <p class="lead">
                        Elementum mattis vulputate tempor, consectetur id fames at libero ornare. Semper et facilisi sagittis hendrerit. Ultricies pulvinar tempus sodales nunc in. Malesuada nam suscipit nulla vel, in platea lectus accumsan purus. Sed ac dictumst amet, molestie.
                    </p>
                    <div class="ctas">
                        <button class="button primary" data-micromodal-trigger="modal-1">Button</button>
                        <a href="#" class="button void">Button</a>
                    </div>
                </div>
                <div class="slider_item_picture">
                    <div class="figure">
                        <div class="img_placeholder"></div>
                    </div>
                </div>
            </div>
        `;
    });

    sliderContainer.innerHTML = htmlString;
};




const initSlider = () => {
    const slider = new Swiper(".slider", {

    });
};




let iso = null;


const initMicroModal = () => {
    MicroModal.init();
}

const shortenTitle = (title) => {
    const titleArr = title.split(" ").slice(0, 5).join(" ") + "...";
    return titleArr;
};

const createCategories = (categories) => {
    return categories.join(" ");
};

const renderGallery = () => {
    const workList = document.querySelector(".work_list");
    let htmlString = "";
   
    if (workList) {
        data.forEach(item => {
            htmlString += `
                <div class="work_item work_item_${item.index} ${createCategories(item.categories)}" data-index="${item.index}" data-categories="${createCategories(item.categories)}">
                    <div class="work_item_pic">
                        <div class="figure" style="height: ${Math.floor((Math.random() * 500) - 200) }px">
                            <img src="${item.picture}" />
                        </div>
                        <div class="like_button">
                            <span class="fa fa-heart"></span>
                        </div>
                    </div>
                    <div class="work_meta">
                        <div class="work_meta_title">
                            <div class="author">
                                <img src="${item.author}" />
                            </div>
                            <div class="title">
                                ${shortenTitle(item.title)}
                            </div>
                        </div>
                        <div class="work_meta_stats">
                            <div class="views">
                                <span class="fa fa-eye"></span>
                                <span class="label">${item.views}</span>
                            </div>
                            <div class="likes">
                                <span class="fa fa-thumbs-up"></span>
                                <span class="label">${item.likes}</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });

        workList.innerHTML = htmlString;
    }
};


const initIsotope = () => {
    const elem = document.querySelector('.work_list');
    iso = new Isotope(elem, {
            percentPosition: true,
            layoutMode: 'masonry'
    });
};



const getSingleCategories = () => {
    const categories = data.map(dataItem => dataItem.categories);
    const uniqueCategories = [];

    categories.forEach(categoryArr => {
        categoryArr.forEach(category => {
            if (!uniqueCategories.includes(category)) {
                uniqueCategories.push(category);
            }
        });
    });

    uniqueCategories.sort();
    return uniqueCategories;
};




const renderGalleryMenu = () => {
    const filters = document.querySelector('.filters');
    let htmlString = "";
    const categories = getSingleCategories();
    categories.unshift("all")
    
    categories.forEach(category => {
        htmlString += `
            <div class="filter_item ${category == "all" ? "active" : ""}" data-category="${category}">${category}</div>
        `;
    });

    filters.innerHTML = htmlString;
};


const galleryMenuEvents = () => {
    const filters = document.querySelectorAll(".filters .filter_item");
    const workItems = document.querySelectorAll(".work_item");

    filters.forEach(filter => {
        filter.addEventListener("click", () => {
            //
            const category = filter.dataset.category;

            // //
            // workItems.forEach(workItem => {
            //     //
            //     if (workItem.classList.contains(category)) {
            //         workItem.classList.remove("hidden");
            //     } else {
            //         workItem.classList.add("hidden");
            //     }
            // });
            


            // if (category == "all") {
            //     workItems.forEach(workItem => {
            //         workItem.classList.remove("hidden");
            //     });
            // }

            if (category == "all") {
                iso.arrange({ filter: "*" })
            } else {
                iso.arrange({ filter: "." + category })
            }


            filters.forEach(filter_ => {
                filter_.classList.remove("active");
            });
            filter.classList.add("active")

        });
    });
};


const galleryFilterEvents = () => {
    const input = document.querySelector(".filter_group input");
    const workItems = document.querySelectorAll(".work_item");

    input.addEventListener("keyup", () => {
        const value = input.value;

        workItems.forEach(workItem => {
            const title = workItem.querySelector(".title");
            //
            if (title.innerHTML.includes(value)) {
                workItem.classList.remove("hidden");
            } else {
                workItem.classList.add("hidden");
            }
        });
    });
};


const initMoreEvent = () => {
    const moreToggle = document.querySelector(".more_toggle");
    const moreNavi = document.querySelector(".more_navi");
    const header = document.querySelector('.header');

    //
    moreToggle.addEventListener("click", () => {
        moreNavi.classList.toggle("opened");
    });

    //
    header.addEventListener("mouseleave", () => {
        console.log("out");
        moreNavi.classList.remove("opened");
    });

    window.addEventListener("scroll", () => {
        moreNavi.classList.remove("opened");
    });

    document.addEventListener("keyup", (ev) => {
        if (ev.key == "Escape") {
            moreNavi.classList.remove("opened");
        }
    });

    window.addEventListener("click", (ev) => {
        if (!ev.path.includes(moreToggle) && !ev.path.includes(moreNavi)) {
            moreNavi.classList.remove("opened");
        }
    });

    header.addEventListener("click", () => {
        header.querySelector(".img_placeholder").style.backgroundColor = "tomato";
    });
};






