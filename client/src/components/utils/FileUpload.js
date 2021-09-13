import { Icon, message } from 'antd';
import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import Axios from 'axios';

function FileUpload(props) {
    const [images, setImages] = useState([]);

    const onDrop = (files) => {
        let formData = new FormData();
        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }
        formData.append('file', files[0]);

        Axios.post('/api/product/uploadImage', formData, config)
            .then(response => {
                if (response.data.success) {
                    setImages([...images, response.data.image]);
                    props.refreshFunction([...images, response.data.image]);
                } else {
                    message.error('이미지를 업로드하는데 실패했습니다.');
                }
            })
    }

    const onDelete = (image) => {
        const currentIndex = images.indexOf(image);

        let newImages = [...images];
        newImages.splice(currentIndex, 1);

        setImages(newImages);
        props.refreshFunction(newImages);
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Dropzone
                onDrop={onDrop}
                multiple={false}
                maxSize={800000000}
            >
                {({ getRootProps, getInputProps }) => (
                    <div style={{ width: '300px', height: '240px', border: '1px solid lightgray', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }} {...getRootProps()}>
                        <input {...getInputProps()}/>
                        <Icon type='plus' style={{ fontSize: '3rem' }}/>
                    </div>
                )}
            </Dropzone>
            <div style={{ display: 'flex', width: '350px', height: '240px', overflowX: 'scroll'}}>
                {images.map((image, index) => (
                    <div key={index} onClick={() => onDelete(image)}>
                        <img style={{ minWidth: '300px', width: '300px', height: '100%' }} src={`http://localhost:5000/${image}`} alt={`productImg-${index}`} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default FileUpload
