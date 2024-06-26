$(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })

  function insertDiv() {
    const formContainer = document.createElement('div');
    formContainer.id = 'form-container';
    formContainer.style.display = 'none';
    formContainer.innerHTML = `
        <small>⬇ ADVERTISE HERE ⬇</small>
        <form id="urlForm">
            <h5 class="font-weight-bold margin-bottom-3">Share & Shine: Promote Your Banner or Media Here!</h5>
            <label for="imgurl">Image/Text/Video URL
              <button type="button" class="button-small rounded-corner background-dark text-light-color padding-y-0" data-toggle="tooltip" data-placement="top" title="For optimal viewing across devices, consider using image sizes like 250x250, 300x300, or 400x400 pixels. These dimensions ensure your images look great on both mobile and desktop screens.">
                ?
              </button>
               :
            </label>
            <input type="text" id="imgurl" name="imgurl">
            <br><br>
            <label for="affurl">Affiliate/Destination URL
              <button type="button" class="button-small rounded-corner background-dark text-light-color padding-y-0" data-toggle="tooltip" data-placement="top" title="Your affiliate link, a blog post, or your website URL">
                ?
              </button>
               :
            </label>
            <input type="text" id="affurl" name="affurl"><br><br>
            <input class="primary-button margin-bottom-3" type="submit" value="Generate URL"><br>
            <small><em><b>Note</b>: Please ensure your content complies with our terms of service. Examples of prohibited content include Ponzi schemes, adult content, misleading advertisements, cryptocurrencies and any illegal activities.</em></small>
            <br><br>
            <div id="urlDisplayWrapper" style="display: none; margin:0 auto;">
                <label for="urlDisplay" style="display: inline-block; margin-right: 10px;">Your special link
                <button type="button" class="button-small rounded-corner background-dark text-light-color padding-y-0" data-toggle="tooltip" data-placement="top" title="Tip: You can use your favorite URL Shortener(e.g. bitly) to enhance the presentation and trackability of your links.">
                  i
                </button>
                :
                </label>
                <input type="text" id="urlDisplay" readonly style="flex: 1; margin-right: 10px;">
                <button id="copyButton">Copy</button>
            </div>
            <span class="margin-bottom-1" style="font-size:12px;">by DigitalDren</span>
        </form>
        
    `;

    const contentContainer = document.createElement('div');
    contentContainer.id = 'content-container';
    contentContainer.style.display = 'none';
    contentContainer.innerHTML = `
        <small>⬇ ADVERTISEMENT ⬇</small><br>
        <a id="link" href="#" target="_blank">
            <img id="embedded-img" src="" alt="Embedded content" style="display: none; margin: 0 auto;">
            <video id="embedded-video" controls style="display: none; margin: 0 auto;">
                <source id="video-source" src="">
                Your browser does not support the video tag.
            </video>
            <iframe id="embedded-yt-video" frameborder="0" allowfullscreen style="display: none; margin: 0 auto;"></iframe>
            <div id="embedded-text" style="display: none; margin: 0 auto;"></div>
        </a>
        <div class="margin-top-1"><a href="#" id="reportAdLink" target="_blank">Report this ad</a></div>
    `;

    const parentContainer = document.getElementById('parent-container');
    parentContainer.appendChild(formContainer);
    parentContainer.appendChild(contentContainer);
    const urlParams = new URLSearchParams(window.location.search);
    const imgurl = urlParams.get('mdurl');
    const affurl = urlParams.get('affurl');

    if (!imgurl || !affurl) {
        document.getElementById('form-container').style.display = 'block'; 
    } else {
        //start check domain here
        let blacklistedDomains = [];
        async function fetchBlacklistedDomains() {
            try {
                const response = await fetch('https://cdn.jsdelivr.net/gh/drenvaldez/digitaldren2024_bup/json/blcklst.json');
                const data = await response.json();
                blacklistedDomains = data.blacklistedDomains;
            } catch (error) {
                console.error('Error fetching blacklisted domains:', error);
            }
        }
        function isDomainBlacklisted(domain) {
            return blacklistedDomains.includes(domain);
        }

        function isDomainBlacklistedCaseInsensitive(domain) {
            return blacklistedDomains.some(blacklistedDomain => blacklistedDomain.toLowerCase() === domain.toLowerCase());
        }
        function isHttpNotSecure(url) {
            return url.startsWith("http://");
        }

        async function checkDomain(url) {
            if (blacklistedDomains.length === 0) {
                await fetchBlacklistedDomains();
            }

            let domain = url.replace(/^https?:\/\//, '').split('/')[0]; // Extract domain from URL

            return isDomainBlacklistedCaseInsensitive(domain);
        }

        async function checkUrl(imgurl, affurl) {
            let isBlacklisted = await checkDomain(affurl);

            if (!isBlacklisted) {
                const link = document.getElementById('link');
                link.href = affurl;
        
                if (imgurl.match(/\.(jpeg|jpg|gif|png)$/) != null || imgurl.includes('https://drive.google.com/thumbnail')) {
                    const img = document.getElementById('embedded-img');
                    img.src = imgurl;
                    img.style.display = 'block'; 
                } else if (imgurl.match(/\.(mp4|webm|ogg)$/) != null) {
                    const video = document.getElementById('embedded-video');
                    document.getElementById('video-source').src = imgurl;
                    video.style.display = 'block'; 
                } else if (imgurl.match(/youtube\.com\/watch\?v=([^&]+)/) || imgurl.match(/youtu\.be\/([^&]+)/)) {
                    const video_ = document.getElementById('embedded-yt-video');
                    const videoId = imgurl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/)[1];
                    video_.src = `https://www.youtube.com/embed/${videoId}`;
                    video_.style.display = 'block';            
                } else {
                    const textDiv = document.getElementById('embedded-text');
                    textDiv.textContent = imgurl;
                    textDiv.style.display = 'block';
                }
        
                contentContainer.style.display = 'block';
            } 
        }

        checkUrl(imgurl, affurl);        
        //end check domain here

    }

    document.getElementById('urlForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const imgurlInput = document.getElementById('imgurl').value;
        const affurlInput = document.getElementById('affurl').value;
        const newUrl = `?mdurl=${encodeURIComponent(imgurlInput)}&affurl=${encodeURIComponent(affurlInput)}`;
        const urlDisplayInput = document.getElementById('urlDisplay');
        const fullUrl = window.location.origin + window.location.pathname + newUrl;
        urlDisplayInput.value = fullUrl; 
        const urlDisplayWrapper = document.getElementById('urlDisplayWrapper');
        urlDisplayWrapper.style.display = 'block'; 
    
        const copyButton = document.getElementById('copyButton');
        copyButton.style.display = 'inline-block'; 
    
        copyButton.addEventListener('click', function() {
            urlDisplayInput.select();
            urlDisplayInput.setSelectionRange(0, 99999); 
            document.execCommand('copy');
            alert('Copied URL to clipboard!');
        });        
    });

    document.getElementById('reportAdLink').addEventListener('click', function() {
        var currentPageUrl = encodeURIComponent(window.location.href);
        var googleFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLSedhTI-Nv9D92Xo9KHV79gWY9G7XDxCMMH0p1SBwkl5s4kXAw/viewform?usp=pp_url&entry.453278220=" + currentPageUrl;
        document.getElementById('reportAdLink').href = googleFormUrl;
    });
};
