const handleCategory = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await response.json();

    const tabContainer = document.getElementById('tabContainer');
    data.data.forEach((category) => {
        const div = document.createElement('div');
        div.innerHTML = `
        <a onclick='handleTube("${category.category_id}")' class="tab-btn px-1 py-2 md:px-5 md:py-2 lg:px-5 lg:py-2  bg-[#25252533] ml-2 md:ml-6 lg:ml-6 mb-10 text-xl font-semibold active:bg-[#FF1F3D] active:text-[#FFFFFF] rounded">${category.category}</a> `;

        tabContainer.appendChild(div);
    });
};


const handleTube = async (id) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    const data = await response.json();

    let count=0;
    const cardContainer = document.getElementById('cardContainer');
    cardContainer.innerHTML = '';
    data.data.forEach((video) => {
        const div = document.createElement('div');      
        const time = (video?.others?.posted_date);
        const hours = parseInt(video?.others?.posted_date/3600);
        const min = parseInt((video?.others?.posted_date%3600)/60);
        const check = video?.authors[0]?.verified;
        count++;
        div.innerHTML = `        
        <div class="card card-compact w-80 bg-base-100">
            <div class="relative">
                <figure class="w-80 h-40 rounded-lg"><img src="${video?.thumbnail}" alt="Shoes" /></figure>
                <div class="absolute ml-52 top-28 ">
                    <h3 class="text-sm bg-black mt-2 text-white" ${time? '' : 'hidden'}>${hours}hrs  ${min}min ago</h3>   
                </div>               
            </div>
            
                       
            <div class="card-body">
                <div class="flex gap-4 mt-2">
                    <figure class="w-14 h-14 rounded-full bg-black"><img src="${video.authors[0]?.profile_picture}" alt="Shoes" /></figure>                                  
                    <div>
                        <h3 class="text-xl font-bold flex mt-4">${video?.title}</h3>
                        <div class="flex gap-2">
                            <h3 class="text-sm text-[#171717B2] mt-2">${video?.authors[0]?.profile_name}</h3>
                            <div class="mt-2" ${check? '' : 'hidden'}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <g clip-path="url(#clip0_13_960)">
                                        <path d="M19.375 10.0001C19.375 10.8001 18.3922 11.4595 18.1953 12.197C17.9922 12.9595 18.5063 14.022 18.1203 14.6892C17.7281 15.3673 16.5484 15.4486 15.9984 15.9986C15.4484 16.5486 15.3672 17.7282 14.6891 18.1204C14.0219 18.5064 12.9594 17.9923 12.1969 18.1954C11.4594 18.3923 10.8 19.3751 10 19.3751C9.2 19.3751 8.54062 18.3923 7.80312 18.1954C7.04062 17.9923 5.97813 18.5064 5.31094 18.1204C4.63281 17.7282 4.55156 16.5486 4.00156 15.9986C3.45156 15.4486 2.27187 15.3673 1.87969 14.6892C1.49375 14.022 2.00781 12.9595 1.80469 12.197C1.60781 11.4595 0.625 10.8001 0.625 10.0001C0.625 9.20012 1.60781 8.54075 1.80469 7.80325C2.00781 7.04075 1.49375 5.97825 1.87969 5.31106C2.27187 4.63293 3.45156 4.55168 4.00156 4.00168C4.55156 3.45168 4.63281 2.272 5.31094 1.87981C5.97813 1.49387 7.04062 2.00793 7.80312 1.80481C8.54062 1.60793 9.2 0.625122 10 0.625122C10.8 0.625122 11.4594 1.60793 12.1969 1.80481C12.9594 2.00793 14.0219 1.49387 14.6891 1.87981C15.3672 2.272 15.4484 3.45168 15.9984 4.00168C16.5484 4.55168 17.7281 4.63293 18.1203 5.31106C18.5063 5.97825 17.9922 7.04075 18.1953 7.80325C18.3922 8.54075 19.375 9.20012 19.375 10.0001Z" fill="#2568EF"/>
                                        <path d="M12.7094 7.20637L9.14065 10.7751L7.29065 8.92669C6.88909 8.52512 6.23752 8.52512 5.83596 8.92669C5.4344 9.32825 5.4344 9.97981 5.83596 10.3814L8.43127 12.9767C8.8219 13.3673 9.45627 13.3673 9.8469 12.9767L14.1625 8.66106C14.5641 8.2595 14.5641 7.60794 14.1625 7.20637C13.761 6.80481 13.111 6.80481 12.7094 7.20637Z" fill="#FFFCEE"/>
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_13_960">
                                            <rect width="20" height="20" fill="white"/>
                                        </clipPath>
                                    </defs>
                                </svg>                           
                            </div>                                                 
                        </div>
                        <h3 class="text-sm text-[#171717B2] mt-2">${video?.others?.views} views</h3> 
                    </div>
                </div> 
            </div>
        </div>       
        `;
       cardContainer.appendChild(div);
    });

    if(!count){
        const emptyContainer = document.getElementById('emptyContainer');
        emptyContainer.classList.remove('hidden');
    }
    else{
        const emptyContainer = document.getElementById('emptyContainer');
        emptyContainer.classList.add('hidden');
    }
};

document.getElementById('sortByView').addEventListener('click',function(){
    sortByView("1000");
})

const sortByView = async (id) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/1000`);
    const data = await response.json();
    
    data.data.sort((first, second) => {
        const firstViews = parseFloat(first.others.views.replace('K', '000')) || 0;
        const secondViews = parseFloat(second.others.views.replace('K', '000')) || 0;
        return secondViews - firstViews;
    });

    let count=0;
    const cardContainer = document.getElementById('cardContainer');
    cardContainer.innerHTML = '';
    data.data.forEach((video) => {
        const div = document.createElement('div');      
        const time = (video?.others?.posted_date);
        const hours = parseInt(video?.others?.posted_date/3600);
        const min = parseInt((video?.others?.posted_date%3600)/60);
        const check = video?.authors[0]?.verified;
        count++;
        div.innerHTML = `        
        <div class="card card-compact w-80 bg-base-100">
            <div class="relative">
                <figure class="w-80 h-40 rounded-lg"><img src="${video?.thumbnail}" alt="Shoes" /></figure>
                <div class="absolute ml-52 top-28 ">
                    <h3 class="text-sm bg-black mt-2 text-white" ${time? '' : 'hidden'}>${hours}hrs  ${min}min ago</h3>   
                </div>               
            </div>
            
                       
            <div class="card-body">
                <div class="flex gap-4 mt-2">
                    <figure class="w-14 h-14 rounded-full bg-black"><img src="${video.authors[0]?.profile_picture}" alt="Shoes" /></figure>                                  
                    <div>
                        <h3 class="text-xl font-bold flex mt-4">${video?.title}</h3>
                        <div class="flex gap-2">
                            <h3 class="text-sm text-[#171717B2] mt-2">${video?.authors[0]?.profile_name}</h3>
                            <div class="mt-2" ${check? '' : 'hidden'}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <g clip-path="url(#clip0_13_960)">
                                        <path d="M19.375 10.0001C19.375 10.8001 18.3922 11.4595 18.1953 12.197C17.9922 12.9595 18.5063 14.022 18.1203 14.6892C17.7281 15.3673 16.5484 15.4486 15.9984 15.9986C15.4484 16.5486 15.3672 17.7282 14.6891 18.1204C14.0219 18.5064 12.9594 17.9923 12.1969 18.1954C11.4594 18.3923 10.8 19.3751 10 19.3751C9.2 19.3751 8.54062 18.3923 7.80312 18.1954C7.04062 17.9923 5.97813 18.5064 5.31094 18.1204C4.63281 17.7282 4.55156 16.5486 4.00156 15.9986C3.45156 15.4486 2.27187 15.3673 1.87969 14.6892C1.49375 14.022 2.00781 12.9595 1.80469 12.197C1.60781 11.4595 0.625 10.8001 0.625 10.0001C0.625 9.20012 1.60781 8.54075 1.80469 7.80325C2.00781 7.04075 1.49375 5.97825 1.87969 5.31106C2.27187 4.63293 3.45156 4.55168 4.00156 4.00168C4.55156 3.45168 4.63281 2.272 5.31094 1.87981C5.97813 1.49387 7.04062 2.00793 7.80312 1.80481C8.54062 1.60793 9.2 0.625122 10 0.625122C10.8 0.625122 11.4594 1.60793 12.1969 1.80481C12.9594 2.00793 14.0219 1.49387 14.6891 1.87981C15.3672 2.272 15.4484 3.45168 15.9984 4.00168C16.5484 4.55168 17.7281 4.63293 18.1203 5.31106C18.5063 5.97825 17.9922 7.04075 18.1953 7.80325C18.3922 8.54075 19.375 9.20012 19.375 10.0001Z" fill="#2568EF"/>
                                        <path d="M12.7094 7.20637L9.14065 10.7751L7.29065 8.92669C6.88909 8.52512 6.23752 8.52512 5.83596 8.92669C5.4344 9.32825 5.4344 9.97981 5.83596 10.3814L8.43127 12.9767C8.8219 13.3673 9.45627 13.3673 9.8469 12.9767L14.1625 8.66106C14.5641 8.2595 14.5641 7.60794 14.1625 7.20637C13.761 6.80481 13.111 6.80481 12.7094 7.20637Z" fill="#FFFCEE"/>
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_13_960">
                                            <rect width="20" height="20" fill="white"/>
                                        </clipPath>
                                    </defs>
                                </svg>                           
                            </div>                                                 
                        </div>
                        <h3 class="text-sm text-[#171717B2] mt-2">${video?.others?.views} views</h3> 
                    </div>
                </div> 
            </div>
        </div>       
        `;
       cardContainer.appendChild(div);
    });
}     

handleCategory();
handleTube(1000);