let text = 'Openness, accountability, and honesty define government transparency. In a free society, transparency is governments obligation to share information with citizens. It is at the heart of how citizens hold their public officials accountable. Here at TGIF we believe that government should be transparent. Governments exist to serve the people. Information on how officials conduct the public business and spend taxpayer money must be readily available and easily understood. This transparency allows good and just governance. Transparency promotes accountability and provides information for citizens about what their Government is doing. We also believe that government should be participatory. Public engagement enhances the Governments effectiveness and improves the quality of its decisions. Knowledge is widely dispersed in society, and public officials benefit from having access to that dispersed knowledge. We invite you to use our site to become actively engaged in American government. TGIF works to disclose information in forms that the public can readily find and use. We solicit public feedback to identify information of greatest use to the public.';



$(document).ready(function () {
    $('.nav-toggle').click(function () {
        let collapse_content_selector = $(this).attr('href');
        let toggle_switch = $(this);
        $(collapse_content_selector).toggle(function () {
            if ($(this).css('display') == 'none') {
                toggle_switch.html('Read More');
            } else {
                toggle_switch.html('Read Less');
            }
        });
    });

});



// Read More
let char_limit = 100;

if(text.length < char_limit)
	console.log( '<div> ' + text + '</div>' );
else
    console.log( '<div><span class="short-text">' + text.substr(0, char_limit) + '</span><span class="long-text">' + text.substr(char_limit) + '</span><span class="text-dots">...</span><span class="show-more-button" data-more="0">See More</span></div>' );
    


document.querySelector('.show-more-button').addEventListener('click',function() {
      
        if(this.getAttribute('data-more') == 0) {
            this.setAttribute('data-more', 1);
            this.style.display = 'block';
            this.innerHTML = 'Read Less';
    
            this.previousSibling.style.display = 'none';
            this.previousSibling.previousSibling.style.display = 'inline';
        }
   
        else if(this.getAttribute('data-more') == 1) {
            this.setAttribute('data-more', 0);
            this.style.display = 'inline';
            this.innerHTML = 'Read More';
    
            this.previousSibling.style.display = 'inline';
            this.previousSibling.previousSibling.style.display = 'none';
        }	
    });