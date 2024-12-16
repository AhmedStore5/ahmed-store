document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const imageInput = document.getElementById('imageInput');
    const titleInput = document.getElementById('imageTitle');

    const imageFile = imageInput.files[0];
    const imageTitle = titleInput.value;

    if (imageFile && imageTitle) {
        // رفع الصورة إلى Imgur باستخدام API
        uploadImageToImgur(imageFile).then(imageUrl => {
            // إضافة الصورة والعنوان إلى الصفحة
            const imageCard = document.createElement('div');
            imageCard.classList.add('image-card');

            const img = document.createElement('img');
            img.src = imageUrl;
            img.alt = imageTitle;

            const title = document.createElement('h3');
            title.innerText = imageTitle;

            const deleteButton = document.createElement('button');
            deleteButton.innerText = 'حذف';
            deleteButton.onclick = () => imageCard.remove(); // حذف الصورة من الصفحة

            imageCard.appendChild(img);
            imageCard.appendChild(title);
            imageCard.appendChild(deleteButton);

            document.getElementById('imagesContainer').appendChild(imageCard);

            // تنظيف النموذج
            imageInput.value = '';
            titleInput.value = '';
        });
    } else {
        alert('يرجى اختيار صورة وإدخال عنوان');
    }
});

// رفع الصورة إلى Imgur
function uploadImageToImgur(imageFile) {
    const formData = new FormData();
    formData.append('image', imageFile);

    return fetch('https://api.imgur.com/3/image', {
        method: 'POST',
        headers: {
            'Authorization': 'Client-ID YOUR_IMGUR_CLIENT_ID', // ضع هنا Client ID الخاص بك من Imgur
        },
        body: formData,
    })
    .then(response => response.json())
    .then(data => data.data.link) // إرجاع الرابط المباشر للصورة
    .catch(error => console.error('Error:', error));
}
