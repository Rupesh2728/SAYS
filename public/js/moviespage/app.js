$(document).ready(() => {
    // left arrow and  right arrow
    let navText = ["<i class='bx bx-chevron-left'></i>", "<i class='bx bx-chevron-right'></i>"]

    $('#rh-carousel').owlCarousel({
        items: 1,
        dots: false,
        loop: true,
        nav:true,
        navText: navText,
        autoplay: true,
        autoplayHoverPause: true
    })

    $('.movies-slide').owlCarousel({
        items: 2,
        dots: false,
        nav:true,
        navText: navText,
        margin: 15,
        responsive: 
        {
            500: {
                items: 3
            },
            1280: {
                items: 5
            },
            1600: {
                items: 5
            }
        }
    })
})