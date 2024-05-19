import { useRef, useState } from 'react';
import React from 'react'
import './ImageGenerator.css'
import default_image from '../Assets/default_image.svg';

const ImageGenerator = () => {

    const [image_url, setImage_url] = useState("/");
    let inputRef = useRef(null);
    const [loading,setLoading] = useState(false);

    const imageGenerator = async () => {
        if (inputRef.current.value === "") {
            return;
        }
        setLoading(true);

        try {
            const response = await fetch(
                "https://api.openai.com/v1/images/generations",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer sk-proj-bq8T8nGOBFeSyR67uhT3T3BlbkFJCWDnkwJAmnEMI9LWJ3e8",
                        "User-Agent": "Chrome",
                    },
                    body: JSON.stringify({
                        prompt: `${inputRef.current.value}`,
                        n: 1,
                        size: "512x512"
                    }),
                }
            );

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const data = await response.json();
            const data_array = data.data;
            setImage_url(data_array[0].url);
            setLoading(false);
        } catch (error) {
            console.error("Error generating image:", error);
        }
    };

  return (
    <div className='ai-image-generator'>
      <div className='header'>Ai iamge <span>generator</span></div>
      <div className='ima-loading'>
        <div className='image'><img src={image_url==="/"?default_image:image_url} alt=''></img></div>
      </div>
      <div className='loading'>
        <div className={loading?"loading-bar-full":"loading-bar"}></div>
        <div className={loading?"loading-text": "display-none"}>Loading...</div>
      </div>
      <div className='search-box'>
            <input type='text' ref={inputRef} className='search-input' placeholder='Describe What You Want To See'/>
            <div className='generate-btn' onClick={() =>{imageGenerator()}}>Generate</div>
      </div>
    </div>
  )
}

export default ImageGenerator
