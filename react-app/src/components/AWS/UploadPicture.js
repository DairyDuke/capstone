import React, {useState} from "react";


const UploadPicture = () => {
    // const history = useHistory(); // so that we can redirect after the image upload is successful
    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", image);

        // aws uploads can be a bit slow—displaying
        // some sort of loading message is a good idea
        setImageLoading(true);

        const response = await fetch('/api/images', {
            method: "POST",
            body: formData,
        });
        if (response.ok) {
            const imageUrl = await response.json();
            setImageLoading(false);
            // history.push("/images");
            // console.log("Image", imageUrl);
        }
        else {
            setImageLoading(false);
            // a real app would probably use more advanced
            // error handling
            const imageUrl = await response.json();
            // console.log("Image", imageUrl);
        }
    }

    const updateImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
              type="file"
              accept="image/*"
              onChange={updateImage}
            />
            <button type="submit">Submit</button>
            {(imageLoading)&& <p>Loading...</p>}
        </form>
    )
}

export default UploadPicture;
