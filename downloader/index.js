// Required modules
const axios = require("axios");
const fs = require("fs");
const path = require("path");

// The categories array as provided
const categories = [
    {
        id: 0,
        name: "All",
        imageLink:
            "https://img.icons8.com/?size=100&id=49nKj-sKLUGt&format=png&color=000000",
    },
    {
        id: 1,
        name: "Animal",
        imageLink:
            "https://img.icons8.com/?size=100&id=eyHplZFSpfZN&format=png&color=000000",
    },
    {
        id: 2,
        name: "Other / Misc",
        imageLink:
            "https://img.icons8.com/?size=100&id=112293&format=png&color=000000",
    },
    {
        id: 3,
        name: "Bar",
        imageLink:
            "https://img.icons8.com/?size=100&id=EhRzD-ou3ZmJ&format=png&color=000000",
    },
    {
        id: 4,
        name: "One Liners",
        imageLink:
            "https://img.icons8.com/?size=100&id=64058&format=png&color=000000",
    },
    {
        id: 5,
        name: "Puns",
        imageLink:
            "https://img.icons8.com/?size=100&id=118999&format=png&color=000000",
    },
    {
        id: 6,
        name: "Lawyer",
        imageLink:
            "https://img.icons8.com/?size=100&id=64632&format=png&color=000000",
    },
    {
        id: 7,
        name: "Sports",
        imageLink:
            "https://img.icons8.com/?size=100&id=64015&format=png&color=000000",
    },
    {
        id: 8,
        name: "Medical",
        imageLink:
            "https://img.icons8.com/?size=100&id=117343&format=png&color=000000",
    },
    {
        id: 9,
        name: "News / Politics",
        imageLink:
            "https://img.icons8.com/?size=100&id=111280&format=png&color=000000",
    },
    {
        id: 10,
        name: "Men / Women",
        imageLink:
            "https://img.icons8.com/?size=100&id=9IQX2BHEIEep&format=png&color=000000",
    },
    {
        id: 11,
        name: "Gross",
        imageLink:
            "https://img.icons8.com/?size=100&id=v3g0NXoR0z7i&format=png&color=000000",
    },
    {
        id: 12,
        name: "Blond",
        imageLink:
            "https://img.icons8.com/?size=100&id=82207&format=png&color=000000",
    },
    {
        id: 13,
        name: "Yo Momma",
        imageLink:
            "https://img.icons8.com/?size=100&id=rYweNlHRdXs2&format=png&color=000000",
    },
    {
        id: 14,
        name: "Redneck",
        imageLink:
            "https://img.icons8.com/?size=100&id=UMVp0lb7Oeem&format=png&color=000000",
    },
    {
        id: 15,
        name: "Religious",
        imageLink:
            "https://img.icons8.com/?size=100&id=105358&format=png&color=000000",
    },
    {
        id: 16,
        name: "At Work",
        imageLink:
            "https://img.icons8.com/?size=100&id=113860&format=png&color=000000",
    },
    {
        id: 17,
        name: "College",
        imageLink:
            "https://img.icons8.com/?size=100&id=J2t_uKtMD3D7&format=png&color=000000",
    },
    {
        id: 18,
        name: "Lightbulb",
        imageLink:
            "https://img.icons8.com/?size=100&id=112292&format=png&color=000000",
    },
    {
        id: 19,
        name: "Children",
        imageLink:
            "https://img.icons8.com/?size=100&id=3jpB51cDRJ4V&format=png&color=000000",
    },
    {
        id: 20,
        name: "Insults",
        imageLink:
            "https://img.icons8.com/?size=100&id=119255&format=png&color=000000",
    },
    {
        id: 21,
        name: "Knock-Knock",
        imageLink:
            "https://img.icons8.com/?size=100&id=7EcfJvfDsjMQ&format=png&color=000000",
    },
    {
        id: 22,
        name: "Tech",
        imageLink:
            "https://img.icons8.com/?size=100&id=111403&format=png&color=000000",
    },
    {
        id: 23,
        name: "Blonde",
        imageLink:
            "https://img.icons8.com/?size=100&id=82207&format=png&color=000000",
    },
    {
        id: 24,
        name: "Yo Mama",
        imageLink:
            "https://img.icons8.com/?size=100&id=rYweNlHRdXs2&format=png&color=000000",
    },
];

// Function to download an image
const downloadImage = async (url, filename) => {
    try {
        const response = await axios({
            url,
            responseType: "stream",
        });
        response.data.pipe(fs.createWriteStream(filename));
        console.log(`Downloaded: ${filename}`);
    } catch (error) {
        console.error(`Failed to download ${filename}: ${error}`);
    }
};

// Main function to iterate through categories and download images
const downloadImages = async () => {
    // Create 'images' directory if not exists
    const dir = path.join(__dirname, "images");
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);

    // Iterate over each category and download the image
    for (const category of categories) {
        const filename = path.join(
            dir,
            `${category.name.replace(/[^a-zA-Z0-9]/g, "_")}.png`
        );
        await downloadImage(category.imageLink, filename);
    }
};

// Run the download process
downloadImages();